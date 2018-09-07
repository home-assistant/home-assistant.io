---
layout: page
title: "ADS Light"
description: Instructions on how to set up ADS lights within Home Assistant
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beckhoff.png
ha_category: Light
ha_release: "0.60"
ha_iot_class: "Local Push"
---

The `ads` light platform allows you to control your connecte ADS lights.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
light:
  - platform: ads
    adsvar: GVL.enable_light
    adsvar_brightness: GVL.brightness
```

{% configuration %}
  adsvar:
    required: true
    description: The name of the boolean variable that switches the light on
    type: string
  adsvar_brightness:
    required: false
    description: The name of the variable that controls the brightness, use an unsigned integer on the PLC side
    type: integer
  name:
    required: false
    description: An identifier for the Light in the frontend
    type: string
{% endconfiguration %}
