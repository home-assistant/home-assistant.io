---
title: PG LAB Electronics
description: Instructions on how to integrate PG LAB Electronics with Home Assistant.
ha_category:
  - Binary sensor
  - Cover
  - Sensor
  - Switch
ha_release: "2024.2"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@pierluigi"
ha_domain: pglab
ha_platforms:
  - binary_sensor
  - cover
  - sensor
  - switch
ha_integration_type: integration
---

This integration allows you to control [PG LAB Electronics](https://www.pglab.dev/) devices in Home Assistant.

## Supported devices

- [E-Board](https://www.pglab.dev/e-board): Controller board to interface I2C devices by a local LAN connection.
- [E-Relay](https://www.pglab.dev/e-relay): 8 Channels relay board controlled by I2C connection.
- [E-Switch]: Coming soon

Each E-Board device can be connected to maximum of 8 E-Relay boards. E-Board can control
up to 64 relays or 32 shutters or a mix configuration.

## Requirements

- MQTT broker and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- PG LAB Electronics devices MQTT setting configured to communicate with the MQTT broker.

Once the device is connected to your MQTT broker, it should be discovered by Home Assistant.
Add PG LAB Electronics integration.

## Device configuration

Configure each PG LAB Electronics devices following these steps:

- Power the device and connect it to your local network.
- Get from your router the IP address of your device (example: 192.168.1.7).
- Connect to the internal device web server with a web browser (**don't** use 'https://...', instead connect to 'http://192.168.1.7').
- Change the default device name. Use a unique meaningful name such as: E_Board_Office, E_Board_Garden etc.
- Setup MQTT broker address, port number, username and password.
- Save the configuration and restart the device.

**Note:** Every device **MUST** have a unique name.

## Supported features

PG LAB Electronics Relays, Shutters and Switches are supported.

- PG LAB Relays will be added as Home Assistant `switch` entities.
- PG LAB Shutters will be added as Home Assistant `cover` entities.
- The integration will also create diagnostic Status Sensors, with device different information.

{% include integrations/config_flow.md %}
