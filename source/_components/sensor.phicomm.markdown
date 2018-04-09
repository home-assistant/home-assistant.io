---
layout: page
title: "Phicomm M1 air sensor"
description: "Instructions on how to integrate Phicomm M1 air sensor within Home Assistant."
date: 2018-04-19 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: https://cdn-mall.phicomm.com/themes/pc/feixun/images/logo.png
ha_category: Sensor
ha_release: 0.67
ha_iot_class: "Local Polling"
---


The `phicomm` sensor platform let you monitor data from an Phicomm M1 air sensor.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensors:
  - platform: phicomm
    name: Phicomm
    username: ********
    password: ********
    devices: 1
    sensors: [pm25, hcho, temperature, humidity]
```

Configuration options:

- **username** (*Required*): Phicomm account username.
- **password** (*Required*):  Phicomm account password.
- **name** (*Optional*): Default BL. Sensor name
- **devices** (*Optional*): Default 1. Number of M1 devices in this account.
- **sensors** (*Optional*): Default `[pm25, hcho, temperature, humidity]`. Monitored sensor type.
