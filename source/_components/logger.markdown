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
ha_category: "Other"
---

The logger component lets you define the level of logging activities in Home Assistant.

To enable the logger in your installation, add the following to your `configuration.yaml` file:

By default log all messages and ignore events lower than critical for specified components.

```yaml
# Example configuration.yaml entry
logger:
  default: info
  logs:
    homeassistant.components.device_tracker: critical
    homeassistant.components.camera: critical
```

By default ignore all messages lower than critical and log event for specified components.

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
 
