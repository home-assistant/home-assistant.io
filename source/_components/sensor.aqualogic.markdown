---
layout: page
title: "AquaLogic Sensor"
description: "Instructions on how to integrate your AquaLogic devices within Home Assistant."
date: 2018-09-17 9:16
sidebar: true
comments: false
sharing: true
footer: true
logo: hayward.png
ha_category: Sensor
ha_release: "0.80"
ha_iot_class: "Local Push"
---

To get your AquaLogic sensors working within Home Assistant, please follow the instructions for the general [AquaLogic component](/components/aqualogic).

## {% linkable_title Configuration %}

Once you have enabled the [AquaLogic component](/components/aqualogic), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: aqualogic
    monitored_conditions:
      - pool_temp
```

{% configuration %}
monitored_conditions:
  description: List of items you want to monitor.
  required: false
  default: all
  type: list
  keys:
    air_temp:
      description: The air temperature.
    pool_temp:
      description: The pool temperature.
    spa_temp:
      description: The spa temperature.
    pool_chlorinator: 
      description: The pool chlorinator setting.
    spa_chlorinator: 
      description: The spa chlorinator setting.
    salt_level:
      description: The current salt level.
    pump_speed:
      description: The current pump speed (Hayward VS pumps only).
    pump_power:
      description: The current pump power usage (Hayward VS pumps only).
    status:
      description: The current system status.
{% endconfiguration %}
