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
---

In addition to the [APCUPSd Sensor](/components/sensor.apcupsd/) devices, you may also create a device which is simply "on" when the UPS status is online and "off" at all other times.

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: apcupsd
    name: UPS Online
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **method** (*Optional*): The method of the request. Default is GET.
