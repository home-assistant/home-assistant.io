---
layout: page
title: "ADS Binary Sensor"
description: "Instructions on how to set up ADS binary sensors within Home Assistant."
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beckhoff.png
ha_category: Binary Sensor
ha_release: "0.60"
ha_iot_class: "Local Push"
---

The `ads` binary sensor platform can be used to monitor a boolean value on your ADS device.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ads
    adsvar: .boolean1
```

{% configuration %}
  adsvar:
    required: true
    description: The name of the variable which you want to access on the ADS device.
    type: string
  name: 
    required: false
    description: An identifier for the light in the frontend.
    type: string
  device_class:
    required: false
    description: The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
    type: string
{% endconfiguration %}
