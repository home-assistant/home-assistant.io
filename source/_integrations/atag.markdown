---
title: Atag
description: Instructions on how to setup Atag integration.
ha_category:
  - Climate
  - Water heater
  - Sensor
ha_release: 0.109
ha_iot_class: Local Polling
---

The `Atag` integration allows Home Assistant to connect to [Atag One](https://atag-one.com) thermostats, reporting and setting its status.
The integration implements the following platforms:

- Climate
- Water Heater
- Sensor

## Configuration

The Atag integration can be enabled directly from Home Assistant. Navigate to `configuration`, then `integrations` and click `add`. Click `Atag` to initiate the configuration. Only the IP Address has to be provided, but be sure to add your email address if you experience connectivity issues.

{% configuration %}
host:
  description: Atag hostname or IP address.
  required: true
  type: string
email:
  description: Email registered in the Atag App.
  required: false
  type: string
port:
  description: Port to reach the Atag API. Only needed if connecting through alternative routes.
  required: false
  type: integer
{% endconfiguration %}

## Climate

The `Atag` climate platform provides current and target temperature information for the heating system, boiler status and HVAC mode.

### Integration services

This integration supports the following services (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#service-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#service-climateset_hvac_mode)
  - `heat` for regular thermostat mode
  - `auto` for weather-based mode
  - `off` to disable control from Home Assistant

<div class='note'>
HVAC mode provides returns regular or weather-based mode (i.e., not manual, auto, extend, fireplace).
The hold modes (manual, auto, extend) are currently available as a sensor only. Setting these modes is planned for a future update.
</div>

## Water Heater

The Water Heater reports current and target temperature for Domestic Hot Water demand, as well as boiler status (heating or idle). This can be used to detect hot water demand, such as a running shower or tap water.
Setting target values is currently not supported.

## Sensor

Not all metrics reported by the One are part of either the Water-Heater or Climate platform. Additional sensors are added to Home Assistant to monitor these metrics, which can be disabled in the UI if preferred. Navigate to `Configuration`, `Entities` and select the entity you wish to disable.
The following sensors will be added to Home Assistant:

### Sensors enabled by default

- `outside_temp`
- `outside_temp_avg`
- `weather_status`
- `operation_mode`
- `ch_water_pressure`
- `dhw_water_temp`
- `dhw_water_pres`
- `burning_hours`
- `flame_level`
