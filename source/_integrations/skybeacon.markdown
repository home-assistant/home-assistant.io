---
title: Skybeacon
description: Instructions on how to integrate MiFlora BLE plant sensor with Home Assistant.
ha_category:
  - DIY
ha_release: 0.37
ha_iot_class: Local Polling
ha_domain: skybeacon
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `skybeacon` sensor {% term integration %} supports [CR2477](https://cnsky9.en.alibaba.com/)-powered [iBeacon](https://en.wikipedia.org/wiki/IBeacon)/eddystone sensors that come with temperature/sensor module.

## Configuration

To use your Skybeacon {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: skybeacon
    mac: "xx:xx:xx:xx:xx:xx"
    monitored_conditions:
      - temperature
      - humidity
```

{% configuration %}
mac:
  description: "The MAC address of your sensor. You can find this be running `hcitool lescan` from command line."
  required: true
  type: string
name:
  description: The name of the Skybeacon sensor.
  required: false
  type: string
  default: Skybeacon
monitored_conditions:
  description: The parameters that should be monitored.
  required: false
  type: list
  keys:
    temperature:
      description: Temperature at the sensor's location.
    humidity:
      description: Humidity at the sensor's location.
{% endconfiguration %}
