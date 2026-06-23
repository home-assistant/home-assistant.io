---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary sensor
  - Climate
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
  - climate
  - cover
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Bosch SHC** {% term integration %} allows you to connect your [Bosch Smart Home Controller](https://www.bosch-smarthome.com) to Home Assistant to control and monitor your Bosch Smart Home devices.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Sensor](#sensor)
- [Switch](#switch)

{% include integrations/config_flow.md %}

### Binary sensor

The binary sensor platform allows you to monitor the states of your shutter contact and battery sensors. Binary sensor devices are added for each of the following devices:

- Shutter Contact
- Shutter Contact II
- Battery powered devices

### Climate

The climate platform lets you control room climate controls and heating circuits. Climate entities are created for the following devices:

- Room climate controls (Thermostat, Wall Thermostat, and Room Thermostat II)
- Heating circuits

For a room climate control, the operating mode maps to the HVAC mode (heat, plus cool when the room supports cooling). The regulation mode maps to the preset (auto, manual, eco, or boost). For a heating circuit, the target temperature and the auto and heat HVAC modes are available.

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
