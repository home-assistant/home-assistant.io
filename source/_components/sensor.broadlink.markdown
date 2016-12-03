---
layout: page
title: "Broadlink RM2 and A1 sensor"
description: "Instructions how to integrate Broadlink RM2 and/or A1 E-air sensors within Home Assistant."
date: 2020-11-08 21:59
sidebar: true
comments: false
sharing: true
footer: true
logo: broadlink.png
ha_category: Sensor
ha_release: 0.34
---


The `broadlink` sensor platform let you monitor data from an RM2 and A1 E-air. 
There is currently no support for the cloud API.

To set it up, add the following information to your `configuration.yaml` file:

Obtain sensor data from an A1:
```yaml
sensor:
    platform: broadlink
    update_interval: 60
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - temperature
      - humidity
      - air_quality
      - light
      - noise
```

Obtain temperature data from an RM2:
```yaml
sensor:
    platform: broadlink
    update_interval: 60
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - temperature
```

Configuration options:
- **name** (*Optional*): Default BL. Sensor name
- **update_interval** (*Optional*): Default 300. Time in seconds to fetch data from sensors
- **host** (*Required*): The hostname/IP address to connect to.
- **mac** (*Required*):  Device mac address.
- **monitored_conditions** array (*Required*): States to monitor.
    - 'temperature'
    - 'humidity'
    - 'air_quality'
    - 'light'
    - 'noise'

