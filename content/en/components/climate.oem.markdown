---
layout: page
title: "OpenEnergyMonitor WiFi Thermostat"
description: "Instructions on how to integrate an OpenEnergyMonitor thermostat with Home Assistant."
date: 2017-01-27 11:15
sidebar: true
comments: false
sharing: true
footer: true
logo: oem.png
ha_category: Climate
ha_release: 0.39
ha_iot_class: "Local Polling"
---

This platform supports the ESP82666 based "WiFi MQTT Relay / Thermostat" sold by [OpenEnergyMonitor](https://shop.openenergymonitor.com/wifi-mqtt-relay-thermostat/). The underlying [library](http://oemthermostat.readthedocs.io/) only supports this single relay variant of the [original device](https://harizanov.com/2014/12/wifi-iot-3-channel-relay-board-with-mqtt-and-http-api-using-esp8266/).

This platform controls the setpoint of the thermostat in its "manual" mode, therefore there is a configuration option the away setpoint.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate oem:
  - platform: oem
    host: 192.168.0.100
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of the thermostat.
- **port** (*Optional*): The port for the web interface. Defaults to 80.
- **name** (*Optional*): The name to use for the frontend.
- **username** (*Optional*): Username for the web interface if set.
- **password** (*Optional*): Password for the web interface if set.
- **away_temp** (*Optional*): Setpoint for the thermostat in away mode. Defaults to 14 C.

