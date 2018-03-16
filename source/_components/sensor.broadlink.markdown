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
ha_iot_class: "Local Polling"
---


The `broadlink` sensor platform let you monitor data from an RM2 and A1 E-air. There is currently no support for the cloud API.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - 'temperature'
```

Configuration options:

- **host** (*Required*): The hostname/IP address to connect to.
- **mac** (*Required*):  Device mac address.
- **name** (*Optional*): Default BL. Sensor name
- **update_interval** (*Optional*): Time in seconds to fetch data from sensors. Default 300. 
- **timeout** (*Optional*): Timeout in seconds for the connection to the device.
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
  - platform: broadlink
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
  - platform: broadlink
    update_interval: 60
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - temperature
```

### {% linkable_title Microsoft Windows installation %}

<p class='note'>
The pycrypto library needs to be available on your platform. On a typical windows sysytem `pip install pycrypto` will fail, as a compiler needs to be installed first.
</p>

The quickest way around this is to use a pre-built binary, e.g., from [https://github.com/sfbahr/PyCrypto-Wheels](https://github.com/sfbahr/PyCrypto-Wheels)

Be sure to get the correct 64 or 32-bit binary for your system, the full command line will look something like the sample below for a 64-bit system:

```bash
pip install --use-wheel --no-index --find-links=https://github.com/sfbahr/PyCrypto-Wheels/raw/master/pycrypto-2.6.1-cp35-none-win_amd64.whl pycrypto
```
