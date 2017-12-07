---
layout: page
title: "ADS Sensor"
description: "Instructions how to integrate ADS numeric values into Home Assistant."
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beckhoff.png
ha_category: Sensor
ha_release: "0.60"
ha_iot_class: "Local Push"
---

The `ads` sensor platform allows reading the value of a numeric variable on your ADS device. The variable can be of type *INT*, *UINT* or *BYTE*.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ads
    adsvar: GVL.temperature
    unit_of_measurement: '°C'
    adstype: int
```

{% configuration %}
  adsvar:
    required: true
    description: The name of the variable which you want to access.
    type: string
  adstype:
    required: false
    description: The datatype of the ADS variable, possible values are int, uint, byte.
    default: int
    type: string
  name:
    required: false
    description: An identifier for the sensor.
    type: string
  factor:
    required: false
    description: A factor that divides the stored value before displaying in Home Assistant.
    default: 1
    type: integer
{% endconfiguration %}

The *factor* can be used to implement fixed decimals. E.g., set *factor* to 100 if you want to display a fixed decimal value with two decimals. A variable value of `123` will be displayed as `1.23`.
