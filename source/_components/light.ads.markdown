---
layout: page
title: "ADS Light"
description: "Instruction on how to set up ADS lights within Home Assistant."
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Light
ha_release: 0.56
ha_iot_class: "Local Push"
---

To use your ADS device, you first have to set up your [ADS
hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
light:
  - platform: ads
    adsvar: GVL.enable_light
    adsvar_brightness: GVL.brightness
```

Configuration variables:

- **adsvar** (*Required*): The name of the boolean variable that switches the
light on.
- **adsvar_brightness** (*Optional*): The name of the variable that controls the
brightness. This variable needs to be of type *UINT*.
- **name** (*Optional*): An identifier for the Light in the frontend.