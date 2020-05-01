---
title: myIO Server
description: Instructions on how to integrate myIO Server into Home Assistant.
ha_category:
  - Climate
  - Cover
  - Light
  - Sensor
ha_release: 0.108
ha_iot_class: Local Poll
ha_config_flow: true
ha_codeowners:
  - '@smarthomeninja'
ha_domain: myio
---

The myIO integration adds support for [myIO-server](https://myio.com) controlled peripherals into Home Assistant. Features currently include:

- Import all sensors (temperature, humidity, consumption) as individual entity.
- Import all used digital outputs (with a description) as a light entity (except the sensor-controlled outputs).
- Import all PWM output as a brightness controlled light entity (except the sensor controlled outputs).
- Import all sensor controlled output (digital and PWM) to a climate enitiy.
- Import all the groups, what's description begins with 'RGB' to a RGB light entity.
- Import all the relay protection pairs to a cover entity. 

## Configuration

Home Assistant offers myIO integration through **Configuration** -> **Integrations** -> **myIO**. Follow the instructions to get it set up.

Parameter settings:

- 'Name' - this is a name of the server (example: "my Home", "Weekend House", "Office"). You can integrate more servers.
- 'Host' - this is the IP address of the myIO server.
- 'HTTP Port' - in case of port forwarding, you can change this.
- 'App Port' - in case of port forwarding, you can change this.
- 'Username' - Set the username to log in to myIO server.
- 'Password' - Set the password to log in to myIO Server.

Click 'Submit'

The integration will find all of your discoverable devices and import them to a Home Assistant.

## Notes

The following settings you have to set in the myIO Server UI.

  - The RGBW lights description needs to start with the 'R','G','B','W' characters to describe them colors.
  - The RGB groups description needs to start with 'RGB' characters.
  - Your covers up, and down relays needs to set to the relay protection pair. The first needs to be the 'up' direction.

Advise:
  - Add a new user to myIO server for Home Assistant, and set the permissions for it.
