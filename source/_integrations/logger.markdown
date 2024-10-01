---
title: Logger
description: Instructions on how to enable the logger integration for Home Assistant.
ha_category:
  - Utility
ha_release: 0.8
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: logger
ha_integration_type: system
---

The `logger` integration lets you define the level of logging activities in Home
Assistant.

To enable the `logger` integration in your installation,
add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
logger:
```

The log severity level is `warning` if the logger integration is not enabled in {% term "`configuration.yaml`" %}.

To log all messages and ignore events lower than critical for specified
integrations:

```yaml
# Example configuration.yaml entry
logger:
  default: info
  logs:
    homeassistant.components.yamaha: critical
    custom_components.my_integration: critical
```

To ignore all messages lower than critical and log event for specified
integrations:

```yaml
# Example configuration.yaml entry
logger:
  default: critical
  logs:
    # log level for HA core
    homeassistant.core: fatal

    # log level for MQTT integration
    homeassistant.components.mqtt: warning

    # log level for all python scripts
    homeassistant.components.python_script: warning

    # individual log level for this python script
    homeassistant.components.python_script.my_new_script.py: debug

    # log level for SmartThings lights
    homeassistant.components.smartthings.light: info

    # log level for a custom integration
    custom_components.my_integration: debug

    # log level for the `aiohttp` Python package
    aiohttp: error

    # log level for both 'glances_api' and 'glances' integration
    homeassistant.components.glances: fatal
    glances_api: fatal
```

The log entries are in the form  
*timestamp* *log-level* *thread* [**namespace**] *message*  
where **namespace** is the *<component_namespace>* currently logging.

{% configuration %}
  default:
    description: Default log level. See [log_level](#log-levels).
    required: false
    type: string
  logs:
    description: List of integrations and their log level.
    required: false
    type: map
    keys:
      '&lt;component_namespace&gt;':
        description: Logger namespace of the integration. See [log_level](#log-levels).
        type: string
  filters:
    description: Regular Expression logging filters.
    required: false
    type: map
    keys:
      '&lt;component_namespace&gt;':
        description: Logger namespace of the integration and a list of Regular Expressions. See [Log Filters](#log-filters).
        type: list
{% endconfiguration %}

In the example, do note the difference between 'glances_api' and 'homeassistant.components.glances' namespaces,
both of which are at root. They are logged by different APIs.

If you want to know the namespaces in your own environment then check your log files on startup.
You will see INFO log messages from homeassistant.loader stating `loaded <component> from <namespace>`.
Those are the namespaces available for you to set a `log level` against.

### Log levels

Possible log severity levels, listed in order from most severe to least severe, are:

- critical
- fatal
- error
- warning
- warn
- info
- debug
- notset

### Log filters

Service-specific Regular Expression filters for logs. A message is omitted if it matches the Regular Expression.

An example configuration might look like this:

```yaml
# Example configuration.yaml entry
logger:
  default: info
  logs:
    custom_components.my_integration: critical
  filters:
    custom_components.my_integration:
      - "HTTP 429" # Filter all HTTP 429 errors
      - "Request to .*unreliable.com.* Timed Out"
    homeassistant.components.nws:
      - "^Error handling request$"
```

## Actions

### Action `set_default_level`

You can alter the default log level (for integrations without a specified log
level) using the `logger.set_default_level` action.

An example call might look like this:

```yaml
action: logger.set_default_level
data:
  level: info
```

### Action `set_level`

You can alter log level for one or several integrations using the `logger.set_level` action.
It accepts the same format as `logs` in the configuration.

An example call might look like this:

```yaml
action: logger.set_level
data:
  homeassistant.core: fatal
  homeassistant.components.mqtt: warning
  homeassistant.components.smartthings.light: info
  custom_components.my_integration: debug
  aiohttp: error
```

## Viewing logs

The log information are stored in the
[configuration directory](/docs/configuration/) as `home-assistant.log`
and you can read it with the command-line tool `cat` or follow it dynamically
with `tail -f`.

You can use the example below, when logged in through the [SSH add-on](/addons/ssh/):

```bash
tail -f /config/home-assistant.log
```

On Docker you can use your host command line directly - follow the logs dynamically with:

```bash
# follow the log dynamically
docker logs --follow  MY_CONTAINER_ID
```

To see other options use `--help` instead, or simply leave with no options to display the entire log.
