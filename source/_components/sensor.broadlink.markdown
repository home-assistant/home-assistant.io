---
layout: page
title: "Broadlink RM2 and A1 sensor"
description: "Instructions how to integrate Broadlink RM2 and/or A1 E-air sensors within Home Assistant."
date: 2016-12-03 21:59
sidebar: true
comments: false
sharing: true
footer: true
logo: broadlink.png
ha_category: Sensor
ha_release: 0.35
---


The `broadlink` sensor platform let you monitor data from an RM2 and A1 E-air.
There is currently no support for the cloud API.


Configuration options:
- **name** (*Optional*): Default BL. Sensor name
- **update_interval** (*Optional*): Default 300. Time in seconds to fetch data from sensors
- **host** (*Required*): The hostname/IP address to connect to.
- **mac** (*Required*):  Device mac address.
- **timeout** (*Optional*): Timeout in seconds for the connection to the device
- **monitored_conditions** array (*Required*): States to monitor.
    - 'temperature'
    - 'humidity'
    - 'air_quality'
    - 'light'
    - 'noise'

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

**note**: The pycrypto library needs to be available on your platform.
on a typical windows sysytem `pip install pycrypto` will fail, as a compiler needs to be installed.

The quickest way around this is to use a pre-built binary, e.g. from here:
https://github.com/sfbahr/PyCrypto-Wheels

be sure to get the correct 64 or 32-bit binary for your system, the full commandline will look someting like this (64bit):
`pip install --use-wheel --no-index --find-links=https://github.com/sfbahr/PyCrypto-Wheels/raw/master/pycrypto-2.6.1-cp35-none-win_amd64.whl pycrypto`
