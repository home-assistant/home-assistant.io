---
layout: page
title: "Zehnder ComfoAir Q Ventilation"
description: "Instructions on how to integrate Zehnder ComfoAir Q350/450/600 ventilation systems into Home Assistant."
date: 2017-06-28 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: zehnder.png
ha_category: Hub
ha_release: "0.48"
---

The `comfoconnect` component lets you control Zehnder ComfoAir [Q350](http://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-q350-st)/[450](http://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-q450-st)/[600](http://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-q600-st)
ventilation units from Home Assistant. You need a [ComfoConnect LAN C](http://www.zehnder.co.uk/products-and-systems/comfortable-indoor-ventilation/ms-comfoair-q/ideal-control#node-21233)
bridge to connect the unit to your local network.

There is an official iPhone and Android app to configure and control your unit. This platform connects with the help of
the unofficial [pycomfoconnect](https://github.com/michaelarnauts/comfoconnect) library.

The component has a fan platform to view and control the ventilation speed, and a sensors platform to read out the outdoor temperature and humidity, the indoor temperature and humidity, and the extract and supply air flow (in m³ per hour).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
comfoconnect:
  host: 192.168.1.213
```

Configuration variables:

- **host** (*Required*): The ip or hostname of the ComfoConnect LAN C bridge.
- **name** (*Optional*): The name of this device as you want to see it in Home Assistant.
- **token** (*Optional*): The token you want to use when registering with the device. This is a random 32 char hexadecimal string. The default value is `00000000000000000000000000000001`.
- **user_agent** (*Optional*): The name you want to supply when registering with the device. The default value is `Home Assistant`.
- **pin** (*Optional*): The pin code to use when registering. This is `0000` by default. You only need to change this if you have changed the factory default pin.

To register the sensors, add the following to your `configuration.yaml` file:

```yaml
sensor:
  - platform: comfoconnect
    resources:
      - current_temperature
      - current_humidity
      - outside_temperature
      - outside_humidity
      - air_flow_supply
      - air_flow_exhaust
```

<p class='note'>
Note that it's not possible to have multiple connection to the bridge at the same time. This component will keep the connection open, and if you open the app, it will ask you to disconnect Home Assistant. If you close the app again, Home Assistant will reconnect automatically.
</p>
