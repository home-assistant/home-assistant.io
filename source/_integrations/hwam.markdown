---
title: HWAM® SmartControl™
description: Sensors, switches and buttons of HWAM® SmartControl™ wood burning stoves.
ha_category:
  - Climate
  - Sensor
  - Button
  - Switch
ha_iot_class: Cloud Polling
ha_release: 2024.?
ha_config_flow: true
ha_codeowners:
  - '@lordyavin'
ha_domain: hwam
ha_platforms:
  - button
  - select
  - sensor
  - switch
ha_integration_type: integration
---

HWAM® SmartControl™ is an electronic air control system developed in collaboration
with DTU (Denmarks Technical University) to achieve the cleanest possible combustion.
HWAM® SmartControl™ controls the whole process, whereby you automatically achieve the
best possible combustion every time.

HWAM® SmartControl™ stoves feature the following additional components compared to conventional stoves:

- Airbox with 3 air dampers and software
- Lambda probe that measures the oxygen level in the stove
- Temperature sensor that measures the temperature in the stove
- Room sensor tells the stove what temperature is in the room.
- The app is the system’s control panel.

All these components work together when the HWAM® SmartControl™ stove is in use 
and automatically ensure eco-friendly and efficient combustion. The only thing 
the user must do is to arrange some firewood and light the fire. HWAM® SmartControl™
will take care of the rest.

{% include integrations/config_flow.md %}

### Entities

The following controllable entities are available:

### Button

- **Start** - The button to start the combustion.

### Select

- **Burn Level** - The burn level presets: 0-5

### Sensor

- **Oxygen Level** - The level of oxygen in the combustion gases.
- **Burning Phase** - The state/phase of the burning algorithm.
- **Room Temperature** - The room temperature as reported by the remote sensor.
- **Stove Temperature** - The temperature within the combustion chamber. Aka the temperature of the fire.
- **Valve 1-3 Position** - The positions of the air valves.
