---
layout: page
title: "Logger"
description: "Instructions how to enable the logger component for Home Assistant."
date: 2015-11-12 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Utility"
---

The logger component lets you define the level of logging activities in Home Assistant.

To enable the logger in your installation, add the following to your `configuration.yaml` file:

To have a full log and log everything only this entry is needed (without any qualifier):
```yaml
logger:
```
To log all messages and ignore events lower than critical for specified components.

```yaml
# Example configuration.yaml entry
logger:
  default: info
  logs:
    homeassistant.components.device_tracker: critical
    homeassistant.components.camera: critical
```

To ignore all messages lower than critical and log event for specified components.

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

Possible log severities are:

- critical
- fatal
- error
- warning
- warn
- info
- debug
- notset

### {% linkable_title Log file location %}

The log information are stored in the [configuration directory](/docs/configuration/) as `home-assistant.log` and you can read it with the command-line tool `cat` or follow it dynamically with `tail -f`. 

If you are a Hassbian user you can use the example below:

```bash
$ tail -f /home/homeassistant/.homeassistant/home-assistant.log
```

If you are a Hass.io user you can use the example below, whenlogged in through the ssh addon:

```bash
$ tail -f /config/home-assistant.log
```
 
### {% linkable_title Service `set_level` %}

You can alter log level for one or several components using the service
``logger.set_level``. It accepts the same format as ``logs`` in the configuration.

An example call might look like this:

```yaml
service: logger.set_level
data:
  homeassistant.components: warning
  homeassistant.components.media_player.yamaha: debug
```

### {% linkable_title Service `dump_config` %}

This service can be used to access the current configuration,
which can be helpful for 3rd party developers to provide an interface for controlling logging.

