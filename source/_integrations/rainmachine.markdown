---
title: RainMachine
description: Instructions on how to integrate RainMachine units within Home Assistant.
ha_category:
  - Irrigation
  - Binary Sensor
  - Sensor
  - Switch
ha_release: 0.69
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: rainmachine
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_zeroconf: true
ha_homekit: true
---

The RainMachine integration is the main integration to integrate all platforms related to [RainMachine smart Wi-Fi sprinkler controllers](https://www.rainmachine.com/).

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Sensor
- [Switch](#switch)

{% include integrations/config_flow.md %}

## Services

Services accept either device IDs or entity IDs, depending on the nature of the service:

* Services that require a device ID as a target:
    * `rainmachine.pause_watering`
    * `rainmachine.stop_all`
    * `rainmachine.unpause_watering`
* Services that require an entity ID as a target (note that the correct entity ID type must be provided, such as a program for a program-related service)
    * `rainmachine.disable_program`
    * `rainmachine.disable_zone`
    * `rainmachine.enable_program`
    * `rainmachine.enable_zone`
    * `rainmachine.start_program`
    * `rainmachine.start_zone`
    * `rainmachine.stop_program`
    * `rainmachine.stop_zone`

### `rainmachine.disable_program`

Disable a RainMachine program. This will mark the program switch as
`Unavailable` in the UI.

### `rainmachine.disable_zone`

Disable a RainMachine zone. This will mark the zone switch as
`Unavailable` in the UI.

### `rainmachine.enable_program`

Enable a RainMachine program.

### `rainmachine.enable_zone`

Enable a RainMachine zone.

### `rainmachine.pause_watering`

Pause all watering activities for a number of seconds.

| Service Data Attribute    | Optional | Description                                                 |
|---------------------------|----------|-------------------------------------------------------------|
| `seconds`                   |      no  | The number of seconds to pause                              |

### `rainmachine.start_program`

### `rainmachine.start_zone`

Start a RainMachine zone for a set number of seconds.

| Service Data Attribute    | Optional | Description                                                 |
|---------------------------|----------|-------------------------------------------------------------|
| `zone_run_time`             |      yes | The number of seconds to run; defaults to 60 seconds        |

### `rainmachine.stop_all`

Stop all watering activities.

### `rainmachine.stop_program`

Stop a RainMachine program.

### `rainmachine.stop_zone`

Stop a RainMachine zone.

### `rainmachine.unpause_watering`

Unpause all watering activities.

## Switch

The `rainmachine` switch platform allows you to control programs and zones within a [RainMachine smart Wi-Fi sprinkler controller](https://www.rainmachine.com/).

### Controlling Your Device

After Home Assistant loads, new switches will be added for every enabled program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the `zone_run_time` parameter to determine how long to run for)

Programs and zones are linked. While a program is running, you will see both the program and zone switches turned on; turning either one off will turn the other one off (just like in the web app).
