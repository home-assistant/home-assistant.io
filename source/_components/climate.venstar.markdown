---
layout: page
title: "Venstar Thermostat"
description: "Instructions for how to integrate Venstar WiFi thermostats within Home Assistant."
date: 2018-01-14 00:04
sidebar: true
comments: false
sharing: true
footer: true
logo: venstar.png
ha_category: Climate
ha_release: 0.61
ha_iot_class: "Local Polling"
---


The `venstar` climate platform allows you to control [Venstar](http://www.venstar.com) thermostats from Home Assistant.
Venstar thermostats feature a local API that allows for automation without the need for a cloud service.

Currently supported and tested thermostats:

- Color Touch T7900

Currently supported functionality:
- Setting heat/cool temperature when the thermostat is in the appropriate mode.
- Changing the operation mode of the thermostat (heat/cool/off/auto)
- Turning the fan on/off
- Setting the humidity level

Note - Please ensure you update your thermostat to the latest firmware. Currently tested on firmware 5.10.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: venstar
    host: IP_OR_HOSTNAME_OF_THERMOSTAT
    ssl: True/False
    username: OPTIONAL_AUTH_USER_HERE
    password: OPTIONAL_AUTH_PASS_HERE
    timeout: 5
```

Configuration variables:

- **host** (*Required*): Address of your thermostat, eg. 192.168.1.32.
- **username** (*Optional*): Username for the thermostat.
- **password** (*Optional*): Password for the thermostat.
- **ssl** (*Optional*): Whether to use SSL or not when communicating. Default is False.
- **timeout** (*Optional*): Number of seconds for API timeout. Default is 5 seconds.
