---
layout: page
title: "Heatmiser Thermostat"
description: "Instructions on how to integrate Heatmiser thermostats within Home Assistant."
date: 2015-12-11 12:35
sidebar: true
comments: false
sharing: true
footer: true
logo: heatmiser.png
ha_category: Climate
ha_release: "0.10"
ha_iot_class: "Local Polling"
---


The `heatmiser` climate platform let you control [Heatmiser DT/DT-E/PRT/PRT-E](http://www.heatmisershop.co.uk/heatmiser-slimline-programmable-room-thermostat/) thermostats from Heatmiser. The module itself is currently setup to work over a RS232 -> RS485 converter, therefore it connects over IP.

Further work would be required to get this setup to connect over Wifi, but the HeatmiserV3 python module being used is a full implementation of the V3 protocol.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: heatmiser
    ipaddress: YOUR_IPADDRESS
    port: YOUR_PORT
    tstats:
      - 1:
        id: THERMOSTAT_ID
        name: THERMOSTAT_NAME
```

A single interface can handle up to 32 connected devices.

Configuration variables:

- **ipaddress** (*Required*): The ip address of your interface.
- **port** (*Required*): The port that the interface is listening on.
- **tstats** (*Required*): A list of thermostats activated on the gateway.
- **id** (*Required*): The id of the thermostat as configured on the device itself
- **name** (*Required*): A friendly name for the thermostat
