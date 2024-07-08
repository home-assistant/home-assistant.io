---
title: Generic Thermostat
description: Turn Home Assistant into a thermostat
ha_category:
  - Climate
  - Helper
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: generic_thermostat
ha_platforms:
  - climate
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The `generic_thermostat` climate {% term integration %} is a thermostat implemented in Home Assistant. It uses a sensor and a switch connected to a heater or air conditioning under the hood. When in heater mode, if the measured temperature is cooler than the target temperature, the heater will be turned on and turned off when the required temperature is reached. When in air conditioning mode, if the measured temperature is hotter than the target temperature, the air conditioning will be turned on and turned off when required temperature is reached. One Generic Thermostat entity can only control one switch. If you need to activate two switches, one for a heater and one for an air conditioner, you will need two Generic Thermostat entities.

{% include integrations/config_flow.md %}

{% note %}
Configuration using our user interface provides a more limited subset of options, making this integration more accessible while covering most use cases.

If you need more specific features for your use case, the manual [YAML-configuration section](#yaml-configuration) of this integration might provide them.
{% endnote %}

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
as well. To enable the {% term integration %}, you need to add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    heater: switch.study_heater
    target_sensor: sensor.study_temperature
```

{% configuration %}
name:
  description: Name of thermostat.
  required: true
  default: Generic Thermostat
  type: string
unique_id:
  description: An ID that uniquely identifies this thermostat. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
heater:
  description: "`entity_id` for heater switch, must be a toggle device. Becomes air conditioning switch when `ac_mode` is set to `true`."
  required: true
  type: string
target_sensor:
  description: "`entity_id` for a temperature sensor, target_sensor.state must be temperature."
  required: true
  type: string
min_temp:
  description: Set minimum set point available.
  required: false
  default: 7
  type: float
max_temp:
  description: Set maximum set point available.
  required: false
  default: 35
  type: float
target_temp:
  description: Set initial target temperature. Failure to set this variable will result in target temperature being set to null on startup. As of version 0.59, it will retain the target temperature set before restart if available.
  required: false
  type: float
ac_mode:
  description: Set the switch specified in the *heater* option to be treated as a cooling device instead of a heating device.
  required: false
  type: boolean
  default: false
min_cycle_duration:
  description: Set a minimum amount of time that the switch specified in the *heater* option must be in its current state prior to being switched either off or on. This option will be ignored if the `keep_alive` option is set.
  required: false
  type: [time, integer]
cold_tolerance:
  description: Set a minimum amount of difference between the temperature read by the sensor specified in the *target_sensor* option and the target temperature that must change prior to being switched on. For example, if the target temperature is 25 and the tolerance is 0.5 the heater will start when the sensor equals or goes below 24.5.
  required: false
  default: 0.3
  type: float
hot_tolerance:
  description: Set a minimum amount of difference between the temperature read by the sensor specified in the *target_sensor* option and the target temperature that must change prior to being switched off. For example, if the target temperature is 25 and the tolerance is 0.5 the heater will stop when the sensor equals or goes above 25.5.
  required: false
  default: 0.3
  type: float
keep_alive:
  description: Set a keep-alive interval. If set, the switch specified in the *heater* option will be triggered every time the interval elapses. Use with heaters and A/C units that shut off if they don't receive a signal from their remote for a while. Use also with switches that might lose state. The keep-alive call is done with the current valid climate integration state (either on or off). When `keep_alive` is set the `min_cycle_duration` option will be ignored.
  required: false
  type: [time, integer]
initial_hvac_mode:
  description: Set the initial HVAC mode. Valid values are `off`, `heat` or `cool`. Value has to be double quoted. If this parameter is not set, it is preferable to set a *keep_alive* value. This is helpful to align any discrepancies between *generic_thermostat* and *heater* state.
  required: false
  type: string
away_temp:
  description: "Set the temperature used by `preset_mode: away`."
  required: false
  type: float
comfort_temp:
  description: "Set the temperature used by `preset_mode: comfort`."
  required: false
  type: float
eco_temp:
  description: "Set the temperature used by `preset_mode: eco`."
  required: false
  type: float
home_temp:
  description: "Set the temperature used by `preset_mode: home`."
  required: false
  type: float
sleep_temp:
  description: "Set the temperature used by `preset_mode: sleep`."
  required: false
  type: float
activity_temp:
  description: "Set the temperature used by `preset_mode: activity`."
  required: false
  type: float
precision:
  description: "The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`. This value is also used as the step size for setting the target temperature."
  required: false
  type: float
  default: "`0.1` for Celsius and `1.0` for Fahrenheit."
target_temp_step:
  description: "The desired step size for setting the target temperature. Supported values are `0.1`, `0.5` and `1.0`."
  required: false
  type: float
  default: "equal to `precision`."
{% endconfiguration %}

Time for `min_cycle_duration` and `keep_alive` must be set as "hh:mm:ss" or it must contain at least one of the following entries: `days:`, `hours:`, `minutes:`, `seconds:` or `milliseconds:`. Alternatively, it can be an integer that represents time in seconds.

Currently the `generic_thermostat` climate platform supports 'heat', 'cool' and 'off' HVAC modes. You can force your `generic_thermostat` to avoid starting by setting HVAC mode to 'off'.

Please note that when changing the preset mode to away, you will force a target temperature change as well that will get restored once the preset mode is set to none again.

## Full YAML configuration example

```yaml
climate:
  - platform: generic_thermostat
    name: Study
    heater: switch.study_heater
    target_sensor: sensor.study_temperature
    min_temp: 15
    max_temp: 21
    ac_mode: false
    target_temp: 17
    cold_tolerance: 0.3
    hot_tolerance: 0
    min_cycle_duration:
      seconds: 5
    keep_alive:
      minutes: 3
    initial_hvac_mode: "off"
    away_temp: 16
    precision: 0.1
```
