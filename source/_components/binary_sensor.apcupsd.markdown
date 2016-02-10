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

In addition to the [APCUPSd Sensor](/components/sensor.apcupsd/) devices, you may also create a device which is simply `on` when the UPS status is `ONLINE` and `off` at all other times.

#### Example

```yaml
binary_sensor:
  - name: UPS Online
    platform: apcupsd
```
