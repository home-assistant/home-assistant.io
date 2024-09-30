---
title: OSO Energy
description: Instructions on how to integrate OSO Energy devices with Home Assistant.
ha_release: '2024.1'
ha_category:
  - Binary sensor
  - Sensor
  - Water Heater
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@osohotwateriot'
ha_domain: osoenergy
ha_platforms:
  - binary_sensor
  - sensor
  - water_heater
ha_config_flow: true
ha_integration_type: integration
---

The OSO Energy integration for Home Assistant allows you to interact with supported devices and services offered by [OSO Energy](https://www.osoenergy.no)

This OSO Energy integration uses a subscription key, which a user can create for his account on the [OSO Energy website](https://portal.osoenergy.no/), to configure it within Home Assistant. Once configured Home Assistant will detect and add all OSO Energy devices.

{% include integrations/config_flow.md %}

## Services

### Service `osoenergy.get_profile`

You can use the service `osoenergy.get_profile` to get the temperature profile for a water heater. Each temperature corresponds to a given local hour during the current day. For example, a temperature at index 1 corresponds to 01:00 local time.

| Service data attribute | Optional | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | no       | String, name of entity. For example: `water_heater.heater` |

Example:

```yaml
# Example script to get the temperature profile of a water heater.
script:
  get_profile:
    sequence:
      - service: osoenergy.get_profile
        target:
          entity_id: water_heater.heater
```

```yaml
# Example response for the temperature profile of the heater.
water_heater.heater:
  profile:
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
    - 70
```

### Service `osoenergy.set_profile`

You can use the service `osoenergy.set_profile` to set the temperature profile for a water heater.

| Service data attribute | Optional | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `water_heater.heater` |
| `hour_00`              | yes      | The temperature at hour 00:00 (Local) for a heater   |
| `hour_01`              | yes      | The temperature at hour 01:00 (Local) for a heater   |
| `hour_02`              | yes      | The temperature at hour 02:00 (Local) for a heater   |
| `hour_03`              | yes      | The temperature at hour 03:00 (Local) for a heater   |
| `hour_04`              | yes      | The temperature at hour 04:00 (Local) for a heater   |
| `hour_05`              | yes      | The temperature at hour 05:00 (Local) for a heater   |
| `hour_06`              | yes      | The temperature at hour 06:00 (Local) for a heater   |
| `hour_07`              | yes      | The temperature at hour 07:00 (Local) for a heater   |
| `hour_08`              | yes      | The temperature at hour 08:00 (Local) for a heater   |
| `hour_09`              | yes      | The temperature at hour 09:00 (Local) for a heater   |
| `hour_10`              | yes      | The temperature at hour 10:00 (Local) for a heater   |
| `hour_11`              | yes      | The temperature at hour 11:00 (Local) for a heater   |
| `hour_12`              | yes      | The temperature at hour 12:00 (Local) for a heater   |
| `hour_13`              | yes      | The temperature at hour 13:00 (Local) for a heater   |
| `hour_14`              | yes      | The temperature at hour 14:00 (Local) for a heater   |
| `hour_15`              | yes      | The temperature at hour 15:00 (Local) for a heater   |
| `hour_16`              | yes      | The temperature at hour 16:00 (Local) for a heater   |
| `hour_17`              | yes      | The temperature at hour 17:00 (Local) for a heater   |
| `hour_18`              | yes      | The temperature at hour 18:00 (Local) for a heater   |
| `hour_19`              | yes      | The temperature at hour 19:00 (Local) for a heater   |
| `hour_20`              | yes      | The temperature at hour 20:00 (Local) for a heater   |
| `hour_21`              | yes      | The temperature at hour 21:00 (Local) for a heater   |
| `hour_22`              | yes      | The temperature at hour 22:00 (Local) for a heater   |
| `hour_23`              | yes      | The temperature at hour 23:00 (Local) for a heater   |

Example:

```yaml
# Example script to set temperature profile for a water heater.
script:
  set_profile:
    sequence:
      - service: osoenergy.set_profile
        target:
          entity_id: water_heater.heater
        data:
          hour_00: 70
          hour_01: 70
          hour_02: 70
          hour_03: 70
          hour_04: 70
          hour_05: 70
          hour_06: 70
          hour_07: 70
          hour_08: 70
          hour_09: 70
          hour_10: 70
          hour_11: 70
          hour_12: 70
          hour_13: 70
          hour_14: 70
          hour_15: 70
          hour_16: 70
          hour_17: 70
          hour_18: 70
          hour_19: 70
          hour_20: 70
          hour_21: 70
          hour_22: 70
          hour_23: 70
```

### Service `osoenergy.set_v40_min`

You can use the service `osoenergy.set_v40_min` to set the minimum quantity of water at 40°C for a water heater.

| Service data attribute | Optional | Description                                                                   |
| ---------------------- | -------- | ----------------------------------------------------------------------------- |
| `entity_id`            | no       | String, name of entity. For example:  `water_heater.heater`        f entity e.g., `water_heater.heater`                            |
| `v40_min`              | no       | Specify the minimum quantity of water at 40°C for a water heater.  For example, `240` |

Examples:

```yaml
# Example script to set minimum water level on a water heater, v40 min specified.
script:
  set_v40:
    sequence:
      - service: osoenergy.set_v40_min
        target:
          entity_id: water_heater.heater
        data:
          v40_min: 240
```

### Service `osoenergy.turn_off`

You can use the service `osoenergy.turn_off` to turn off the heating on your device for one hour or until the minimum temperature is reached.

| Service data attribute | Optional | Description                                                                                                       |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String, name of entity. For example:  `water_heater.heater`                                                                |
| `until_temp_limit`     | no       | Choose, if the heating should be off until the minimum temperature (`True`) is reached, or for one hour (`False`). For example, `True` |

Examples:

```yaml
# Example script to turn off heating, until temp limit specified.
script:
  turn_off:
    sequence:
      - service: osoenergy.turn_off
        target:
          entity_id: water_heater.heater
        data:
          until_temp_limit: true
```

### Service `osoenergy.turn_on`

You can use the service `osoenergy.turn_on` to turn on the heating on your device for one hour or until the maximum temperature is reached.

| Service data attribute | Optional | Description                                                                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String, name of entity. For example: `water_heater.heater`                                                               |
| `until_temp_limit`     | no       | Choose, if the heating should be on until the maximum temperature (`True`) is reached, or for one hour (`False`). For example, `True` |

Examples:

```yaml
# Example script to turn on the heating until the specified temperature limit has been reached.
script:
  turn_on:
    sequence:
      - service: osoenergy.turn_on
        target:
          entity_id: water_heater.heater
        data:
          until_temp_limit: true
```

## Binary sensors

The **OSO Energy** integration exposes OSO Energy data as a binary sensor. It provides the following binary sensors:

- Extra energy
  - Indication if the water heater is currently in an extra energy/high demand state.
- Power save
  - Indication if the water heater is currently in a power save/sleep mode state.
- Heating
  - Indication if the water heater is currently heating the water.

## Sensors

The **OSO Energy** integration exposes OSO Energy data as a sensor. It provides the following sensors:

- Heater Mode for water heaters.
  - Indication of the current heater mode on the device.
- Optimization Mode for water heaters.
  - Indication of the way heating is managed by the device according to external factors. For example, electricity prices.
- Power load (kW) for water heaters.
  - Indication of the current power load of the water heater - how much energy is currently drawn out of the electricity grid.
- Tapping capacity (kWh) for water heaters.
  - Indication for quantity of energy that is stored and available for use at the moment - the current kWh equivalent capacity of the water heater.
- Capacity mixed water at 40°C (L) for water heaters.
  - Indication of the current quantity of water that can be drained out after mixing the water in the heater with the inlet tap water to produce water at 40°C.
- V40 Min (L) for water heaters.
  - The current minimum allowed quantity of mixed water at 40°C. When the current capacity drops below this threshold, the heater will turn on as a feature to guard against cold water.
- Minimum Level of V40 Min (L) for water heaters.
  - The lower boundary of the V40 Min sensor that can be achieved during normal operation of the water heater. Can vary depending on the type of the heater.
- Maximum Level of V40 Min (L) for water heaters.
  - The upper boundary of the V40 Min sensor that can be achieved during normal operation of the water heater. Can vary depending on the type of the heater.
- Temperature top
  - The current measured temperature of the water from the top sensor of the water heater.
- Temperature middle
  - The current measured temperature of the water from the middle sensor of the water heater.
- Temperature bottom
  - The current measured temperature of the water from the bottom segment of the water heater.
- Temperature one
  - The current measured temperature of the water from the one wire sensor of the water heater.

## Water heater

The OSO Energy water heater integration integrates your OSO Energy devices into Home Assistant.

It supports the following OSO Energy devices:

- Water Heaters
- Sensors
