---
title: Haus-Bus
description: Instructions on setting up Haus-Bus.de components within Home Assistant.
ha_category:
  - Hub
  - Light
  - Switch
  - Cover
  - Sensor
ha_iot_class: Local Push
ha_release: '2023.8'
ha_config_flow: true
ha_codeowners:
  - '@hausbus'
ha_domain: hausbus
ha_platforms:
  - binary_sensor
  - button
  - cover
  - event
  - light
  - sensor
  - switch
  
ha_zeroconf: true
ha_integration_type: hub
---

The hausbus integration allows you to control and monitor all actors and sensors developed by haus-bus.de

These include:

- Relay modules
- Dimmer modules
- Shutter modules
- RGB Dimmer modules
- Multi pushbuttons with sensors for temperature, brightness and humidity
- IO modules with additional 1-Wire support
- 0-10V or 1-10V modules
- Smart plugs with power meassurement
- Motion and presence sensors
- RFID readers
- High power regulators

{% include integrations/config_flow.md %}

## Support for special events of push buttons and binary inputs

In addition to pressed and released, the Haus-Bus multi-buttons support various special events such as click, double-click, held-start and held-end.

To achieve maximum compatibility and user convenience, these are implemented both as event entities and as device triggers.

This also applies to digital inputs to which external push buttons could be connected. 
However, these are also implemented as binary sensors so that they can also be used with a switch or window contact.


## Support for special commands

The hausbus integration supports all standard functions of the respective entity platforms. 

In addition, special functions are offered via services whose name begins with the prefix "hausbus." as well as via automation actions.


## Support for special configurations

The hausbus integration provides all available configuration options for any haus-bus.de module type via service whose name always follow the pattern "hausbus.TYPE_set_configuration"

All available configuration parameters and values are documented on the [haus-bus.de webpage](https://www.haus-bus.de/ha).


## Installation of haus-bus.de modules for Home Assistant

For more information on connecting Haus-Bus.de components to operate them in a Home Assistant system, 
visit our dedicated documentation page at [www.haus-bus.de/ha](https://www.haus-bus.de/ha)