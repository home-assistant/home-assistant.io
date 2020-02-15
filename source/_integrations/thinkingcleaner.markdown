---
title: Thinking Cleaner
description: Instructions on how to integrate a ThinkingCleaner within Home Assistant.
logo: thinkingcleaner.png
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.18
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Sensor

The `thinkingcleaner` sensor platform simple displays information about your [Thinking Cleaner](https://www.thinkingcleaner.com/) add-on.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thinkingcleaner
```

This will automatically add sensors for each Thinking Cleaner in your network.

## switch

The `thinkingcleaner` switch platform allows you to control your [Thinking Cleaner](https://www.thinkingcleaner.com/) add-on.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: thinkingcleaner
```

This will automatically add switches for each Thinking Cleaner in your network.
