---
layout: page
title: "Open Energymonitor WiFi Thermostat"
description: "Instructions how to integrate the Open Energy Monitor thermostat with Home Assistant."
date: 2017-01-27 11:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Climate
---

This platform supports the ESP82666 based "WiFi MQTT Relay / Thermostat" sold
by
[OpenEnergyMonitor](https://shop.openenergymonitor.com/wifi-mqtt-relay-thermostat/).
The underlying [library](http://oemthermostat.readthedocs.io/) only supports
this single relay variant of the [original
device](https://harizanov.com/2014/12/wifi-iot-3-channel-relay-board-with-mqtt-and-http-api-using-esp8266/).

This platform controls the setpoint of the thermostat in it's "manual" mode,
therefore there are configuration options for the initial setpoint and the away
setpoint.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate oem:
  - platform: oem
    name: Home
    host: 192.168.0.100
    port: 80
    target_temp: 19
    away_temp: 14
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of the thermostat.
- **port** (*Optional*): The port for the web interface (defaults to 80).
- **username** (*Optional*): Username for the web interface if set.
- **password** (*Optional*): Password for the web interface if set.
- **target_temp** (*Optional*): Initial setpoint for the thermostat on HomeAssistant startup.
- **away_temp** (*Optional*): Setpoint for the thermostat in away mode (defaults to 14 C).

