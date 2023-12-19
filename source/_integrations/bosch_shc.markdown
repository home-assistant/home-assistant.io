---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Sensor
  - Switch
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tschamm'
ha_domain: bosch_shc
ha_platforms:
  - binary_sensor
  - cover
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: integration
---

The **Bosch SHC** {% term integration %} allows you to connect your [Bosch Smart Home Controller](https://www.bosch-smarthome.com) to Home Assistant in order to control and monitor your Bosch Smart Home devices.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Cover](#cover)
- [Sensor](#sensor)
- [Switch](#switch)

{% include integrations/config_flow.md %}

### Binary sensor

The binary sensor platform allows you to monitor the states of your shutter contact and battery sensors. Binary sensor devices are added for each of the following devices:

- Shutter Contact
- Shutter Contact II
- Battery powered devices

### Cover

The cover platform allows you to control your covers. Cover devices are added for each Shutter Control device.

### Sensor

The sensor platform allows you to monitor the states of your temperature, humidity, purity, air quality, power, energy, and valve tappet sensors. Sensor devices are added for each of the following devices:

- Thermostat
- Wall Thermostat
- Twinguard
- Smart Plug
- Smart Plug Compact

### Switch

The switch platform allows you to control your outlets and light switches. Switches are added for each of the following devices:

- Light Switch
- Smart Plug
- Smart Plug Compact

## Client registration

To start the client registration, press and hold the button on the controller until the LED starts flashing. During configuration, a client SSL cert/key pair is generated and registered on the controller. For this step, the system password of your controller is needed, which was created upon initial setup of the controller.
