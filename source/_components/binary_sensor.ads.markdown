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
ha_release: 0.56
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

If you want to disable device notifications and use regular polling instead use
the following configuration:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platforms: ads
    adsvar: GVL.polled_boolean
    use_notify: no
    poll_interval: 5000
```

Configuration variables:
- **adsvar** (*Required*): The name of the variable which you want to access on
the ADS device.
- **name** (*Optional*): An identifier for the switch in the frontend.
- **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **use_notify** (*Optional*): Enable device notifications. Default: yes.
- **poll_interval** (*Optional*): If device notifications are disabled polling
is used. This parameter defines the pollint interval in milliseconds. Defaults
to 1000.

If *device notifications* are enabled the *ADS* device will push a change
directly to Home Assistant. Otherwise the value will be polled regularly.