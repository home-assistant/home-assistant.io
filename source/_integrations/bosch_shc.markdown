---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary sensor
  - Button
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
  - button
  - cover
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Bosch SHC** {% term integration %} allows you to connect your [Bosch Smart Home Controller](https://www.bosch-smarthome.com) to Home Assistant to control and monitor your Bosch Smart Home devices.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Cover](#cover)
- [Sensor](#sensor)
- [Switch](#switch)

{% include integrations/config_flow.md %}

### Binary sensor

The binary sensor platform allows you to monitor the states of your shutter contact and battery sensors. Binary sensor devices are added for each of the following devices:

- Shutter Contact
- Shutter Contact II
- Battery powered devices

### Button

The button platform exposes one-shot actions as pressable buttons. The following button entities are available:

- **Scenario buttons** — one button per scenario configured in the Bosch Smart Home App; pressing it triggers the scenario immediately.
- **Smoke test** — requests a self-test on Smoke Detector and Twinguard devices.
- **Trigger** — fires a momentary impulse on Micromodule Impulse Relay devices.
- **Walk test / Stop walk test** — starts and stops a walk test on Motion Detector II devices (when supported by the device).
- **Detection test / Stop detection test** — starts and stops a detection test on Motion Detector II devices (when supported by the device).
- **Reset tamper** — clears an active tamper condition on Motion Detector II devices.

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
