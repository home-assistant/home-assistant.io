---
title: Seko Pooldose
description: Connect your Seko Pooldose water treatment system to Home Assistant.
ha_category:
  - Water
  - Pool
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: "2025.6.1"
ha_codeowners:
  - '@lmaertin'
ha_domain: pooldose
ha_platforms:
  - sensor
  - binary_sensor
  - switch
  - number
  - select
ha_integration_type: integration
---

The `Pooldose` integration connects a [Seko](https://www.seko.com/) Pooldosing system with Home Assistant using its undocumented local HTTP API.  
It provides live readings for pool sensors such as temperature, pH, ORP/Redox, as well as status information and control over the dosing logic.

{% include integrations/config_flow.md %}

## Configuration options

During setup, you will be asked for:

- **Host**: The IP address of your Seko Pooldose controller
- **Scan Interval**: Optional; defaults to 600 seconds
- **Timeout**: Optional; defaults to 30 seconds

The serial number and API version are automatically retrieved and validated.

## Sensors

| Entity ID                      | Unit | Description                            |
|--------------------------------|------|----------------------------------------|
| `sensor.pool_temp_actual`      | °C   | Pool water temperature                 |
| `sensor.pool_ph_actual`        | pH   | Current pH level                       |
| `sensor.pool_orp_actual`       | mV   | Current ORP (Redox) value              |
| `sensor.pool_ph_type_dosing`   |      | pH dosing type                         |
| `sensor.pool_orp_type_dosing`  |      | ORP dosing type                        |
| `sensor.pool_ownerid`          |      | Owner ID                               |
| `sensor.pool_ssid`             |      | Current Wi-Fi SSID                     |
| `sensor.pool_ap_ssid`          |      | Access point SSID                      |
| `sensor.pool_ap_key`           |      | Access point password/key              |
| `sensor.pool_api_version`      |      | Gateway API version                    |

## Binary Sensors

| Entity ID                         | Description                          |
|----------------------------------|--------------------------------------|
| `binary_sensor.pool_circulation_state` | Circulation pump running status     |
| `binary_sensor.pool_ph_level_ok`      | pH level within safe range          |
| `binary_sensor.pool_orp_level_ok`     | ORP level within safe range         |
| `binary_sensor.pool_flow_rate_ok`     | Flow rate okay                      |
| `binary_sensor.pool_alarm_relay`      | General alarm relay active          |
| `binary_sensor.pool_relay_aux1_ph`    | Auxiliary relay 1 (pH control)      |
| `binary_sensor.pool_relay_aux2_orpcl` | Auxiliary relay 2 (ORP/chlorine)    |

## Switches

| Entity ID                     | Description                            |
|------------------------------|----------------------------------------|
| `switch.stop_pool_dosing`    | Stop all dosing (manual override)      |
| `switch.circulation_detection` | Enable/disable circulation pump detection  |
| `switch.frequency_input`     | Enable/disable frequency input for flow measurement       |

## Number (Slider)

| Entity ID              | Unit | Description                      |
|------------------------|------|----------------------------------|
| `number.pool_ph_target`  | pH   | Set target pH value             |
| `number.pool_orp_target` | mV   | Set target ORP (Redox) value    |

## Select

| Entity ID                   | Description                       | Options           |
|----------------------------|-----------------------------------|-------------------|
| `select.pool_water_meter_unit` | Water meter display unit          | `m³`, `liters`     |

## Notes

- This integration is fully local and requires no cloud account.
- Cached values are used when the API is temporarily unavailable.
- The dosing configuration is exposed via sensors and selects.
- The password for the Web Interface must be set to default (deactivated), i.e., 0000.
