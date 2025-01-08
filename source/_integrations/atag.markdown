---
title: Atag
description: Instructions on how to setup Atag integration.
ha_category:
  - Climate
  - Sensor
  - Water heater
ha_release: 0.109
ha_iot_class: Local Polling
ha_domain: atag
ha_codeowners:
  - '@MatsNL'
ha_config_flow: true
ha_platforms:
  - climate
  - sensor
  - water_heater
ha_integration_type: integration
---

The `Atag` integration allows Home Assistant to connect to [Atag One](https://www.atagverwarming.nl) thermostats, reporting and setting its status.
The integration implements the following platforms:

- Climate
- Water heater
- Sensor

{% include integrations/config_flow.md %}

{% configuration %}
host:
  description: Atag hostname or IP address.
  required: true
  type: string
port:
  description: API Port. Only change if you are connecting indirectly (e.g. through reverse proxy)
  required: false
  type: integer
{% endconfiguration %}

## Climate

The `Atag` climate platform provides current and target temperature information for the heating system, boiler status and HVAC mode.

### Integration actions

This integration supports the following actions (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#action-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
  - `heat` for thermostat mode
  - `auto` for weather-based mode
- [`set_preset_mode`](/integrations/climate/#action-climateset_preset_mode)
  - `Manual` enable manual operation
  - `Auto` enable schedule based operation
  - `Extend` delay the next scheduled temperature update by the default extend period
  - `away` enable the vacation mode for 1 day or until another preset is activated
  - `boost` enable fireplace mode

{% note %}
`HVAC mode Auto` (Weather based) should not be confused with `Preset mode Auto` (Scheduled, thermostat mode).
Currently selection of custom timeframes in Extend, Away and boost modes is not supported. The default settings can be changed on the device.
{% endnote %}

## Water heater

The water heater reports current and target temperature for Domestic Hot Water demand, as well as boiler status (heating or idle). This can be used to detect hot water demand, such as a running shower or tap water.
Setting target values is currently not supported.

## Sensor

Not all metrics reported by the One are part of either the Water-Heater or Climate platform. Additional sensors are added to Home Assistant to monitor these metrics, which can be disabled in the UI if preferred. Navigate to `Configuration`, `Entities` and select the entity you wish to disable.
The following sensors will be added to Home Assistant:

### Sensors enabled by default

- `average_outside_temperature`
- `burning_hours`
- `ch_return_temperature`
- `ch_water_pressure`
- `ch_water_temperature`
- `flame`
- `outside_temperature`
- `weather_status`
