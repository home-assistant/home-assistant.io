---
title: OSO Energy
description: Instructions on how to integrate OSO Energy devices with Home Assistant.
ha_release: "2022.4"
ha_category:
  - Sensor
  - Water Heater
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@osohotwateriot'
ha_domain: osoenergy
ha_platforms:
  - sensor
  - water_heater
ha_config_flow: true
ha_integration_type: integration
---

The OSO Energy integration for Home Assistant allows you to interact with supported devices and services offered by [OSO Energy](https://www.osoenergy.no)

This OSO Energy integration uses a subscription key, which a user can create for his account on the [OSO Energy website](https://portal.osoenergy.no/), to configure it within Home Assistant. Once configured Home Assistant will detect and add all OSO Energy devices.

{% include integrations/config_flow.md %}

## Options

Menu: *Configuration* > *Integrations* > *Select your new integration* > *Press the options button*

- **Scan Interval**: Update the scan interval allowing the integration to poll for data more frequently (Cannot be set lower than 15 seconds).

## Services

### Service `osoenergy.turn_on`

You can use the service `osoenergy.turn_on` to turn on the heating on your device for one hour or until the maximum temperature is reached.

| Service data attribute | Optional | Description                                                                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `water_heater.heater`                                                               |
| `full_utilization`     | no       | Choose if heating should be on until maximum temperature (`True`) is reached or for one hour (`False`), e.g., `True` |

Examples:

```yaml
# Example script to turn on heating, full utilization specified.
script:
  turn_on:
    sequence:
      - service: osoenergy.turn_on
        target:
          entity_id: water_heater.heater
        data:
          full_utilization: true
```

### Service `osoenergy.turn_off`

You can use the service `osoenergy.turn_off` to turn off the heating on your device for one hour or until the minimum temperature is reached.

| Service data attribute | Optional | Description                                                                                                       |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `water_heater.heater`                                                                |
| `full_utilization`     | no       | Choose if heating should be off until minimum temperature (`True`) is reached or for one hour (`False`), e.g., `True` |

Examples:

```yaml
# Example script to turn off heating, full utilization specified.
script:
  turn_off:
    sequence:
      - service: osoenergy.turn_off
        target:
          entity_id: water_heater.heater
        data:
          full_utilization: true
```

### Service `osoenergy.set_v40_min`

You can use the service `osoenergy.set_v40_min` to set the minimum quantity of water at 40°C for a water heater.

| Service data attribute | Optional | Description                                                                   |
| ---------------------- | -------- | ----------------------------------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `water_heater.heater`                            |
| `v40_min`              | no       | Specify the minimum quantity of water at 40°C for a water heater, e.g., `240` |

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

### Service `osoenergy.set_profile`

You can use the service `osoenergy.set_profile` to set the temperature profile for a water heater.

| Service data attribute | Optional | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | no       | String, Name of entity e.g., `water_heater.heater` |
| `hour_00`              | no       | The temperature at hour 00:00 (Local) for a heater   |
| `hour_01`              | no       | The temperature at hour 01:00 (Local) for a heater   |
| `hour_02`              | no       | The temperature at hour 02:00 (Local) for a heater   |
| `hour_03`              | no       | The temperature at hour 03:00 (Local) for a heater   |
| `hour_04`              | no       | The temperature at hour 04:00 (Local) for a heater   |
| `hour_05`              | no       | The temperature at hour 05:00 (Local) for a heater   |
| `hour_06`              | no       | The temperature at hour 06:00 (Local) for a heater   |
| `hour_07`              | no       | The temperature at hour 07:00 (Local) for a heater   |
| `hour_08`              | no       | The temperature at hour 08:00 (Local) for a heater   |
| `hour_09`              | no       | The temperature at hour 09:00 (Local) for a heater   |
| `hour_10`              | no       | The temperature at hour 10:00 (Local) for a heater   |
| `hour_11`              | no       | The temperature at hour 11:00 (Local) for a heater   |
| `hour_12`              | no       | The temperature at hour 12:00 (Local) for a heater   |
| `hour_13`              | no       | The temperature at hour 13:00 (Local) for a heater   |
| `hour_14`              | no       | The temperature at hour 14:00 (Local) for a heater   |
| `hour_15`              | no       | The temperature at hour 15:00 (Local) for a heater   |
| `hour_16`              | no       | The temperature at hour 16:00 (Local) for a heater   |
| `hour_17`              | no       | The temperature at hour 17:00 (Local) for a heater   |
| `hour_18`              | no       | The temperature at hour 18:00 (Local) for a heater   |
| `hour_19`              | no       | The temperature at hour 19:00 (Local) for a heater   |
| `hour_20`              | no       | The temperature at hour 20:00 (Local) for a heater   |
| `hour_21`              | no       | The temperature at hour 21:00 (Local) for a heater   |
| `hour_22`              | no       | The temperature at hour 22:00 (Local) for a heater   |
| `hour_23`              | no       | The temperature at hour 23:00 (Local) for a heater   |

Examples:

```yaml
# Example script to set minimum water level on a water heater, v40 min specified.
script:
  set_profile:
    sequence:
      - service: osoenergy.set_optimization_mode
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

## Platforms

### Sensor

The `osoenergy` sensor integration exposes OSO Energy data as a sensor.

The platform exposes the following sensors:

- Power Save status for water heaters.
- Extra Energy status for water heaters.
- Power load (kW) for water heaters.
- Tapping capacity (kWh) for water heaters.
- Capacity mixed water at 40°C (L) for water heaters.
- V40 Min (L) for water heaters.

### Water Heater

The `osoenergy` water heater platform integrates your OSO Energy devices into Home Assistant.

The platform supports the following OSO Energy devices:

- Water Heaters
