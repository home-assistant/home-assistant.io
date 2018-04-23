---
layout: page
title: "Hunter Hydrawise Sensor"
description: "Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant."
date: 2018-04-11 08:02
sidebar: true
comments: false
sharing: true
footer: true
logo: hydrawise_logo.png
ha_category: Sensor
ha_release: 0.68
ha_iot_class: Cloud Polling
---

Before setting up the [Hunter Hydrawise](https://hydrawise.com) sensors please follow the instructions for setting up the [Hydrawise hub](/components/hydrawise) component.

Once you have enabled the `hydrawise` component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hydrawise
```

{% configuration %}

monitored_conditions:
  description: The sensors that should be displayed on the frontend.
  required: false
  type: list
  default: All sensors are enabled.
  keys:
    watering_time:
      description: The amount of time left if the zone is actively watering. Otherwise the time is 0.
    next_cycle:
      description: The day and time when the next scheduled automatic watering cycle will start. If the zone is suspended then the value will be `NS` to indicate Not Scheduled.
  {% endconfiguration %}

Finish the configuration by visiting the [Hydrawise binary sensor](/components/binary_sensor.hydrawise/) and [Hydrawise switch](/components/switch.hydrawise/) documentation.
