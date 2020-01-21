---
title: Atag
description: Instructions on how to setup Atag integration.
logo: atag.png
ha_category:
  - Climate
  - Water heater
  - Sensor
ha_release: '0.105'
ha_iot_class: Local Polling
---

The `Atag` integration allows Home Assistant to connect to [Atag One](https://atag-one.com) thermostats, reporting and setting its status.
The integration implements the following platforms.

- Climate
- Water Heater
- Sensor

## Configuration

The Atag integration can be enabled directly from the config flow UI.
In a regular setup only the IP address has to be provided (UDP discovery planned for future release).

Alternatively the integration can be setup through configuration.yaml.
This way additional (non-default) sensors can be enabled. Only the `host` field is required.

```yaml
# Minimal setup through configuration.yaml
atag:
  host: YOUR_ATAG_ADDRESS
```

{% configuration %}
host:
  description: Atag host or ip address.
  required: true
  type: string
email:
  description: Email registered in the Atag App.
  required: false
  type: string
port:
  description: Port to reach the Atag Api. Only needed if connecting through alternative routes.
  required: false
  type: integer
scan_interval:
  description: Polling frequency in seconds. Defaults to 30, increasing may overload the device.
  required:  false
  type: integer
sensors:
  description: List of sensors to add. Uses default list if not specified. See below for the full list.
  type: list
  required: false
{% endconfiguration %}

<div class='note warning'>
Setting `scan-interval` below 30 may overload the device. Make sure to use the default if you experience difficulties (e.g. network disconnects)
</div>

<div class='note'>
Changes to configuration.yaml may not be picked up automatically. Make sure to manually delete the config entry in the UI in case your configuration is not updated.
</div>

## Climate

The `Atag` climate platform provides current and target temperature information for the heating system, boiler status and HVAC mode.

### Component services

This integration supports the following services (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#service-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#service-climateset_hvac_mode)
  - `heat` for regular thermostat mode
  - `auto` for weather based mode
  - `off` to disable control from Home Assistant

<div class='note'>
HVAC mode provides returns regular or weather-based mode. (i.e. not manual, auto, extend, fireplace).
The hold modes (manual, auto, extend) are currently available as a sensor only. Setting these modes is planned for a future update.
</div>

## Water Heater

The Water Heater reports current and target temperature for Domestic Hot Water demand, as well as boiler status (heating or idle). This can be used to detect hot water demand, such a running shower or tap water.
Setting target values is currently not supported.

## Sensor

The `Atag` sensor platform provides additional metrics reported by the One, which are not part of either the Water-Heater or Climate platforms.
By default the following sensors are enabled.

```yaml
sensors:
  - outside_temp
  - outside_temp_avg
  - weather_status
  - operation_mode
  - ch_water_pressure
  - dhw_water_temp
  - dhw_water_pres
  - burning_hours
  - flame_level
```

Alternatively the user can provide a list of sensors to enable (requires setup through `configuration.yaml`).
<div class='note'>
This data is not always easily interpretable, as many fields are results of undocumented binary OR divisions.
</div>

```yaml
# Example configuration.yaml with all sensors enabled:
atag:
  host: atag.local
  sensors:
    - device_id
    - device_status
    - connection_status
    - date_time
    - report_time
    - burning_hours
    - device_errors
    - boiler_errors
    - room_temp
    - outside_temp
    - dbg_outside_temp
    - pcb_temp
    - ch_setpoint
    - dhw_water_temp
    - ch_water_temp
    - dhw_water_pres
    - ch_water_pres
    - ch_return_temp
    - boiler_status
    - boiler_config
    - ch_time_to_temp
    - shown_set_temp
    - power_cons
    - tout_avg
    - rssi
    - current
    - voltage
    - charge_status
    - lmuc_burner_starts
    - dhw_flow_rate
    - resets
    - memory_allocation
    - boiler_temp
    - boiler_return_temp
    - min_mod_level
    - rel_mod_level
    - boiler_capacity
    - target_temp
    - overshoot
    - max_boiler_temp
    - alpha_used
    - regulation_state
    - ch_m_dot_c
    - c_house
    - r_rad
    - r_env
    - alpha
    - alpha_max
    - delay
    - mu
    - threshold_offs
    - wd_k_factor
    - wd_exponent
    - lmuc_burner_hours
    - lmuc_dhw_hours
    - KP
    - KI
    - ch_status
    - ch_control_mode
    - ch_mode
    - ch_mode_duration
    - ch_mode_temp
    - dhw_temp_setp
    - dhw_status
    - dhw_mode
    - dhw_mode_temp
    - weather_temp
    - weather_status
    - vacation_duration
    - extend_duration
    - fireplace_duration
```
