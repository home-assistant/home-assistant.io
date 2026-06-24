---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Select
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
  - select
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Bosch SHC** {% term integration %} allows you to connect your [Bosch Smart Home Controller](https://www.bosch-smarthome.com) to Home Assistant to control and monitor your Bosch Smart Home devices.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Cover](#cover)
- [Select](#select)
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

### Select

The select platform exposes configuration options as drop-down selectors. The following select entities are available:

- **Motion sensitivity** — sensitivity level for Motion Detector II devices (low / middle / high).
- **Vibration sensitivity** — vibration detection threshold for Shutter Contact II Plus devices.
- **State after power outage** — behavior of Smart Plug / Smart Plug Compact when power is restored (on / off / last state).
- **Actuator type** — configures the load type for Thermostat and Light Control devices.
- **Heater type** — selects the heater type for Thermostat devices.
- **Output mode** — selects the output mode for Thermostat devices.
- **Valve type** — selects the valve type for Thermostat devices.
- **Terminal type** — selects the terminal wiring type for Room Thermostat II devices.
- **Displayed temperature** — chooses which temperature is shown on Room Thermostat II and Wall Thermostat displays (actual / setpoint).
- **Orientation light response time** — configures how long the orientation light stays on for Room Thermostat II devices.
- **Smoke sensitivity** — smoke detection sensitivity for Twinguard devices.
- **Comfort sensitivity level** / **Security sensitivity level** — manual smart sensitivity tuning for Twinguard devices.
- **Switch type** — selects the connected switch type for Micromodule Relay devices.
- **Display direction** — selects the display orientation for Light Control devices.

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
