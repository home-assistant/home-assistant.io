---
layout: page
title: APCUPSd Binary Sensor
description: "Instructions on how to set up an APCUPSd binary sensor within Home Assistant."
date: 2016-02-10 18:47
sidebar: true
comments: false
sharing: true
footer: true
logo: apcupsd.png
ha_category: Binary Sensor
ha_release: 0.13
ha_iot_class: "Local Polling"
---

In addition to the [APCUPSd Sensor](/components/sensor.apcupsd/) devices, you may also create a device which is simply "on" when the UPS status is online and "off" at all other times.

To enable this sensor, you first have to set up [apcupsd](/components/apcupsd/), and add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: apcupsd
```

Configuration variables:

- **name** (*Optional*): Name to use in the front end.
