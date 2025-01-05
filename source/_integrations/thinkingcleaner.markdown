---
title: Thinking Cleaner
description: Instructions on how to integrate a ThinkingCleaner within Home Assistant.
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.18
ha_domain: thinkingcleaner
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Sensor

The `thinkingcleaner` sensor platform simple displays information about your [Thinking Cleaner (archived website)](https://web.archive.org/web/20220802042114/https://www.thinkingcleaner.com/) add-on.

To enable this sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
sensor:
  - platform: thinkingcleaner
```

{% configuration %}
host:
  description: IP address of Thinking Cleaner device
  required: false
  type: string
{% endconfiguration %}


This will automatically add sensors for each Thinking Cleaner in your network.

## Switch

The `thinkingcleaner` switch platform allows you to control your [Thinking Cleaner (archived website)](https://web.archive.org/web/20220802042114/https://www.thinkingcleaner.com/) add-on.

To enable this switch in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
switch:
  - platform: thinkingcleaner
```

{% configuration %}
host:
  description: IP address of Thinking Cleaner device
  required: false
  type: string
{% endconfiguration %}


This will automatically add switches for each Thinking Cleaner in your network.

## Example configuration using a Roomba with a static IP

If your `thinkingcleaner` device has a static IP address, you can also supply this to the sensor and switch using the host parameter. This is optional and will disable the automatic lookup.

```yaml
sensor:
  - platform: thinkingcleaner
    host: 10.0.0.55
switch:
  - platform: thinkingcleaner
    host: 10.0.0.55
```
