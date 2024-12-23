---
title: Palazzetti
description: Instructions on how to integrate Palazzetti within Home Assistant.
ha_category:
  - Climate
ha_release: 2024.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dotvav'
ha_domain: palazzetti
ha_platforms:
  - climate
  - diagnostics
  - sensor
ha_integration_type: device
ha_dhcp: true
---

The **Palazzetti** {% term integration %} integrates the [Palazzetti](https://palazzettigroup.com/)
stoves equipped with a [Connection Box](https://palazzettigroup.com/research-and-development/app/).
It is accessing the device's local API.

{% include integrations/config_flow.md %}

## Climate

The Palazzetti integration offers a climate entity that allows you to read the
room temperature, start and stop the stove, set the target temperature, and set
the fan speed.

### Integration actions

This integration supports the following actions (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#action-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
  - `heat` for heating mode
  - `off` to turn the stove off
- [`set_fan_mode`](/integrations/climate/#action-climateset_fan_mode)
  - `Silent` let the stove run in silent mode
  - `1` to `5` increasing fan speeds
  - `High` the highest available fan speed
  - `Auto` let the stove set the optimal fan speed

## Numbers

The Palazzetti integration offers control over the combustion power of the stove on a scale from `1` to `5`.

## Sensors

The Palazzetti integration offers the following sensors, for the products that provide them:

State sensors:

- Status (current operational state) can take the following values:
  - `off`: Off
  - `off_timer`: Timer-regulated switch off
  - `test_fire`: Ignition test
  - `heatup`: Pellet feed
  - `fueling`: Ignition
  - `ign_test`: Fuel check
  - `burning`: Operating
  - `burning_mod`: Operating - Modulating
  - `unknown`: Unknown
  - `cool_fluid`: Stand-by
  - `fire_stop`: Switch off
  - `clean_fire`: Burn pot cleaning
  - `cool`: Cooling in progress
  - `cleanup`: Final cleaning
  - `ecomode`: Ecomode
  - `chimney_alarm`: Chimney alarm
  - `grate_error`: Grate error
  - `pellet_water_error`: Pellet probe or return water error
  - `t05_error`: T05 error disconnected or faulty probe
  - `hatch_door_open`: Feed hatch or door open
  - `pressure_error`: Safety pressure switch error
  - `main_probe_failure`: Main probe failure
  - `flue_probe_failure`: Flue gas probe failure
  - `exhaust_temp_high`: Too high exhaust gas temperature
  - `pellet_finished`: Pellets finished or ignition failed
  - `firewood_finished`: Firewood finished
  - `cooling`: Cooling
  - `general_error`: General error
  - `door_open`: Door open
  - `temp_too_high`: Temperature too high
  - `cleaning_warning`: Cleaning warning
  - `fuel_error`: Fuel error
  
Temperature sensors:

- Outlet air temperature (°C)
- Wood combustion temperature (°C)
- Room temperature (°C)
- Return water temperature (°C)
- Tank water temperature (°C)
- Hydro temperature 1 (°C)
- Hydro temperature 2 (°C)

Fuel Sensors:

- Pellet quantity (kg - cumulative quantity consumed)
- Pellet level (cm - current level)