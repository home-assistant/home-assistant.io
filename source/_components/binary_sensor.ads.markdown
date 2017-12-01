---
layout: page
title: "ADS Binary Sensor"
description: "Instructions on how to set up ADS binary sensors within Home Assistant."
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Binary Sensor
ha_release: 0.59
ha_iot_class: "Local Push"
---

The binary sensor can be used to monitor a boolean value on your ADS device.

To use your ADS device, you first have to set up your [ADS
hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ads
    adsvar: .boolean1
```

Configuration variables:

{% configuration %}

- **adsvar** (*Required*): The name of the variable which you want to access on
the ADS device.
- **name** (*Optional*): An identifier for the switch in the frontend.
- **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
to 1000.

{% endconfiguration %}
