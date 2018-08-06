---
layout: page
title: "Logger"
description: "Instructions on how to enable the logger component for Home Assistant."
date: 2015-11-12 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Utility"
---

The `logger` component lets you define the level of logging activities in Home Assistant.

To enable the `logger` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logger:
```

To log all messages and ignore events lower than critical for specified components:

```yaml
# Example configuration.yaml entry
logger:
  default: info
  logs:
    homeassistant.components.device_tracker: critical
    homeassistant.components.camera: critical
```

To ignore all messages lower than critical and log event for specified components:

```yaml
# Example configuration.yaml entry
logger:
  default: critical
  logs:
    homeassistant.components: info
    homeassistant.components.rfxtrx: debug
    homeassistant.components.device_tracker: critical
    homeassistant.components.camera: critical
```

{% configuration %}
  default:
    description: Default log level.
    required: false
    type: '[log_level](#log-levels)'
    default: debug
  logs:
    description: List of components and their log level.
    required: false
    type: map
    keys:
      '&lt;component_namespace&gt;':
        description: Logger namespace of the component.
        type: '[log_level](#log-levels)'
{% endconfiguration %}

### {% linkable_title Log Levels %}

Possible log severity levels are:

- critical
- fatal
- error
- warning
- warn
- info
- debug
- notset

## {% linkable_title Services %}

### {% linkable_title Service `set_default_level` %}

You can alter the default log level (for components without a specified log
level) using the service `logger.set_default_level`.

An example call might look like this:

```yaml
service: logger.set_default_level
data:
  level: info
```

### {% linkable_title Service `set_level` %}

You can alter log level for one or several components using the service
`logger.set_level`. It accepts the same format as `logs` in the configuration.

An example call might look like this:

```yaml
service: logger.set_level
data:
  homeassistant.components: warning
  homeassistant.components.media_player.yamaha: debug
```

The log information are stored in the [configuration directory](/docs/configuration/)
as `home-assistant.log` and you can read it with the command-line tool `cat` or
follow it dynamically with `tail -f`.

If you are a Hassbian user you can use the example below:

```bash
$ tail -f /home/homeassistant/.homeassistant/home-assistant.log
```

If you are a Hass.io user, you can use the example below, when logged in through
the [SSH add-on](/addons/ssh/):

```bash
$ tail -f /config/home-assistant.log
```
