---
layout: page
title: "ADS Sensor"
description: "Instructions how to integrate ADS numeric values into Home Assistant."
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.56
ha_iot_class: "Local Push"
---

The `ADS` sensor platform allows reading the value of a numeric variable on
your ADS device. The variable can be of type *INT*, *UINT* or *BYTE*.

To use your ADS device, you first have to set up your [ADS
hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ads
    adsvar: GVL.temperature
    unit_of_measurement: '°C'
    adstype: int
```

Configuration variables:

- **adsvar** (*Required*): The name of the variable which you want to access on
- **adstype** (*Optional*): The datatype of the ADS variable. Default: *int*.
Possible values are: *int, uint, byte*.
- **name** (*Optional*): An identifier for the sensor
- **use_notify** (*Optional*): Enable device notifications. Default: yes.
- **poll_interval** (*Optional*): Sets the polling interval in milliseconds.
Only used if *use_notify* is *False*. Default: 1000
- **factor** (*Optional*): Use a factor that divides the stored value before
displaying in Home Assistant. Default: 1.

If *device notifications* are enabled the *ADS* device will push a change
directly to Home Assistant. Otherwise the value will be polled regularly.

The  *factor* can be used to implement fixed decimals. E.g. set *factor* to 100
if you want to display a fixed decimal value with two decimals. A variable
value of `123` will be displayed as `1.23`.