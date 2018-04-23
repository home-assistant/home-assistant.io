---
layout: page
title: "Hunter Hydrawise Binary Sensor"
description: "Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant."
date: 2018-04-11 08:02
sidebar: true
comments: false
sharing: true
footer: true
logo: hydrawise_logo.png
ha_category: Binary Sensor
ha_release: 0.68
ha_iot_class: Cloud Polling
---

Before setting up the [Hunter Hydrawise](https://hydrawise.com) binary sensors please follow the instructions for setting up the [Hydrawise hub](/components/hydrawise) component.

Once you have enabled the `hydrawise` component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: hydrawise
```

{% configuration %}

monitored_conditions:
  description: The binary sensors that should be displayed on the frontend.
  required: false
  type: list
  default: All binary sensors are enabled.
  keys:
    is_watering:
      description: The binary sensor is `on` when the zone is actively watering.
    rain_sensor:
      description: Is `on` when the rain_sensor (if installed on the controller) is active (wet).
    status:
      description: This will indicate `on` when there is a connection to the Hydrawise cloud. It is not an indication of whether the irrigation controller hardware is online.
{% endconfiguration %}

Finish the configuration by visiting the [Hydrawise sensor](/components/sensor.hydrawise/) and [Hydrawise switch](/components/switch.hydrawise/) documentation.
