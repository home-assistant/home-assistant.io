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

The **Logger** {% term integration %} lets you define logging levels and filters in Home Assistant.

Each logging entry is in this form:

```yaml
[timestamp] [level] [thread] [namespace] [message]
```

## YAML configuration

To enable the `logger` integration in your installation,
add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
logger:
```

### Configuration reference

{% configuration %}
  default:
    description: Default log level. See [log_level](#log-levels).
    required: false
    type: string
  logs:
    description: List of integrations and their log level. See [logs](#logs).
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

The standard log severity level is `warning` if the logger integration is not enabled in {% term "`configuration.yaml`" %}.
All messages lower than the specified level will be ignored in the logs.

### Logs

It is possible to change logging severity for a specific component or integration:

```yaml
# Example configuration.yaml entry
logger:
  default: critical
  logs:
    # log level for Home Assistant Core
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

In the example, do note the difference between 'glances_api' and 'homeassistant.components.glances' namespaces,
both of which are at root. They are logged by different APIs.

If you want to know the namespaces in your own environment then check your log files on startup.
You will see INFO log messages from homeassistant.loader stating `loaded <component> from <namespace>`.
Those are the namespaces available for you to set a `log level` against.


### Log filters

Service-specific Regular Expression filters for logs. A message is omitted if it matches the Regular Expression.

An example configuration might look like this:

```yaml
# Example configuration.yaml entry
logger:
  default: info
  filters:
    # filters out all entries containing "unable to connect" system wide
    "":
      - "unable to connect"

    # filters out all "HTTP 429" errors for my_integration
    custom_components.my_integration:
      - "HTTP 429"
```

{% note %}
To know more about Regular Expression see the [Python docs](https://docs.python.org/3/library/re.html)
{% endnote %}

## Actions

### Action: Set default level

The `logger.set_default_level` action alters the default log level (for integrations without a specified log
level).

An example call might look like this:

```yaml
action: logger.set_default_level
data:
  level: info
```

### Action: Set level

The `logger.set_level` action alters the log level for one or several integrations.
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

The primary way to view logs is through the Home Assistant UI. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and select **Home Assistant Core**. To see the full unformatted log output, enable **Show raw logs** at the top of the page. You can also download the log file from this page.

### Viewing logs on Home Assistant OS

On {% term "Home Assistant Operating System" %} installations, logs are not written to a file in the configuration directory. Use the UI as described above, or run the following command from the [SSH app for Home Assistant](/common-tasks/os/#installing-and-using-the-ssh-app):

```bash
ha core logs --follow
```

### Viewing logs on Container installations

For {% term "Home Assistant Container" %} installations, the log information is also written to a file called `home-assistant.log` in the [configuration directory](/docs/configuration/). You can follow it dynamically with the following command:

```bash
# Follow the log dynamically
docker logs --follow MY_CONTAINER_ID
```

Or read the file directly:

```bash
tail -f /config/home-assistant.log
```
