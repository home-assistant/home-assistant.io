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
ha_release: 0.79
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

Configuration variables:

- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **air_temp**: Returns the current air temperature.
  - **pool_temp**: Returns the current pool temperature.
  - **spa_temp**: Returns the spa temperature.
  - **pool_chlorinator**: Returns the pool chlorinator setting..
  - **spa_chlorinator**: Returns the spa chlorinator setting..
  - **salt_level**: Returns the current salt level.
  - **pump_speed**: Returns the current pump speed (Hayward VS pumps only).
  - **pump_power**: Returns the current pump power usage (Hayward VS pumps only).
  - **status**: Returns the current system status.
