---
title: HWAM® SmartControl™
description: Sensors, switches and buttons of HWAM® SmartControl™ wood burning stoves.
ha_category:
  - Climate
  - Sensor
  - Button
  - Switch
ha_iot_class: Local Polling
ha_release: 2024.11
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
## Introduction

The HWAM® SmartControl™ integration allows you to control and monitor your HWAM®
wood-burning stove through Home Assistant, providing advanced climate control and
efficient combustion management.

HWAM® SmartControl™ is an electronic air control system developed in collaboration
with DTU (Denmark's Technical University) to achieve the cleanest possible combustion.
HWAM® SmartControl™ controls the whole process, whereby you automatically achieve the
best possible combustion every time.

HWAM® SmartControl™ stoves feature the following additional components compared to
conventional stoves:

- Airbox with 3 air valves and software.
- Lambda probe that measures the oxygen level in the stove.
- Temperature sensor that measures the temperature in the stove.
- Room sensor tells the stove what temperature is in the room.

All these components work together when the HWAM® SmartControl™ stove is in use
and automatically ensure eco-friendly and efficient combustion. The only thing
the user must do is to arrange some firewood and light the fire. HWAM® SmartControl™
will take care of the rest.

{% include integrations/config_flow.md %}

## Entities

The following controllable entities are available:

### Button

- **Start** (`start`) - The button to start the combustion.

### Select

- **Burn Level** (`burn_level`) - The burn level presets: 0-5

#### Burn Levels

- **Level 0** HWAM Smart Control runs at lowest
possible combustion temperature to maintain correct combustion
over the longest possible time, taking into account the room
temperature.
- **Level 1-4** At these levels, the system aims
to achieve a constant room temperature. Therefore, once you
have found the heat level that suits you best, do not turn the
level up and down. At level 1-4, the system starts up gently
until it finds the right level of flue gas temperature compared
to the desired room temperature. For normal operation, levels
2-3 are recommended.
- **Level 5** Level 5 is a booster level intended only for situations
where the stove needs to produce a lot of heat within a short
period of time. The stove should NOT run at level 5 for a long
period of time. NB! If level 5 is chosen, a lot of wood is needed
to maintain correct combustion. Therefore, re-stoking alarms may
sound even if there are still flames and unburned wood in the
combustion chamber.

### Sensor

- **Oxygen Level** (%) (`oxygen_level`) - The level of oxygen in the combustion gases.
- **Burning Phase** (`phase`) - The state/phase of the burning algorithm.
- **Room Temperature** (°C) (`room_temperature`) - The room temperature as reported by the remote sensor.
- **Stove Temperature** (°C) (`stove_temperature`) - The temperature within the combustion chamber. Aka the temperature of the fire.
- **Valve 1-3 Position** (%) (`valve[1-3]_position`) - The positions of the air valves.

### Switch

- **Night Lowering** (`night_lowering`) - Enable or disable night lowering.
  Adjustment of the start and end time for night lowering is yet not supported.
  
## Prerequisites

You need a stove that is equipped with an Airbox that runs a compatible firmware
which is connected to your local network. You should find the IP address via your
routers list of network devices. Auto discovery is yet not supported.

Tested firmware:

- **fw version**  - 3.23.0
- **wifi version** - 12.6.0

## Automation Examples

The most simple automation is to shut down all thermostats when the stove is started
and to set them back to automatic when the stove goes into standby mode.
