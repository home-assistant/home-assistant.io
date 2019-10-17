---
title: "Virtual Thermostat"
description: "A virtual thermostat implementation"
logo: home-assistant.png
ha_category:
  - Climate
ha_release: 0.101
ha_iot_class: Local Polling
redirect_from:
 - /components/climate.virtual_thermostat/
---

The `virtual_thermostat` climate platform is a new thermostat implementation in Home Assistant. It handles things differently from its ancestor the `generic_thermostat` being more compliant with the new climate 1.0 and supposed to be closer to a real thermostat. For example, in one component, you can have both AC and heating, avoiding to create multiple instances to control the climate in one area. It also supports an _Away mode_, an _Eco mode_ and a _Comfort mode_

```yaml
# Minimal example configuration.yaml entry
- platform: virtual_thermostat
    sensor: sensor.upstairs_temperature
    heat:
      entity_id: switch.upstairs_heater_switch
    cool:
      entity_id: switch.upstairs_ac_switch
```

## Configuration

{% configuration %}
name:
  description: Name of thermostat.
  required: false
  default: Virtual Thermostat
  type: string
sensor:
  description: "`entity_id` of a temperature sensor."
  required: true
  type: string
initial_hvac_mode:
  description: Set the initial HVAC mode, used when `restore_from_old_state` is set to `False`. Can be `off`, `heat` or `cool`.
  required: false
  default: "`off`"
  type: string
initial_preset_mode:
  description: Set the initial preset mode, used when `restore_from_old_state` is set to `False`. Can be `none`, `away`, `eco` or `comfort`.
  required: false
  default: "`none`"
  type: string
hysteresis_tolerance_on:
  description: Hysteresis tolerance to turn ON the heater. See the example below.
  required: false
  default: "`0.5`"
  type: float
hysteresis_tolerance_off:
  description: Hysteresis tolerance to turn OFF the heater. See the example below.
  required: false
  default: "`0.5`"
  type: float
restore_from_old_state:
  description: When set to `True`, the previous state of this thermostat will be restored upon restart.
  required: false
  default: "`False`"
  type: boolean
keep_alive:
  description: Set a keep-alive interval. If set, the heater's or AC's switch will be triggered every time the interval elapses. Use with heaters and AC units that shut off if they don't receive a signal from their remote for a while. Use also with switches that might lose state. The keep-alive call is done with the current valid climate integration state (either on or off).
  required: false
  type: [time, integer]
min_cycle_duration:
  description: Set a minimum amount of time that the switches specified in the option must be in its current state prior to being switched either off or on. This is taken into account only when the sensor changes. If there is a manual change like a new HVAC mode or a target temperature change, the devices will be switched. It's useful to avoid switching too often.
  required: false
  type: [time, integer]
enabled_presets:
  description: List of presets you want to enable for this thermostat. See the explanation on presets below. This list can contain `away`, `eco` and `comfort`.
  required: false
  type: list
_hvac_mode_.entity_id:
  description: "`entity_id` of a switch. When `_hvac_mode_` is `heat`, the switch is supposed to be a heater and when key is `cool`, the switch is supposed to be an AC device."
  required: true
  type: string
_hvac_mode_.initial_target_temp:
  description: Initial target temperature used when `restore_from_old_state` is set to `False`
  required: false
  default: "`19.0` when `_hvac_mode_` is `heat` and `28.0` when `_hvac_mode_` is `cold`"
  type: float
_hvac_mode_.min_temp:
  description: Minimum temperature you can reach with the thermostat card.
  required: false
  default: "`17.0` when `_hvac_mode_` is `heat` and `20.0` when `_hvac_mode_` is `cold`"
  type: float
_hvac_mode_.max_temp:
  description: Maximum temperature you can reach with the thermostat card.
  required: false
  default: "`24.0` when `_hvac_mode_` is `heat` and `35.0` when `_hvac_mode_` is `cold`"
  type: float
_hvac_mode_.away_temp:
  description: Temperature used when preset mode is set to `away`. This will override everything else. This is required when preset mode `away` is enabled
  required: false
  type: float
_hvac_mode_.eco_shift:
  description: Shift added to the target temperature when the preset `eco` is enabled. This is required when this preset mode is enabled. See the explanation on presets below.
  required: false
  type: float
_hvac_mode_.comfort_shift:
  description: Shift added to the target temperature when the preset `comfort` is enabled. This is required when this preset mode is enabled. See the explanation on presets below.
  required: false
  type: float
{% endconfiguration %}

## Hysteresis

The hysteresis tolerance is used to save HVAC systems from restarting too often. If the hysteresis tolerance is set to `0.5`, the target temperature set to `22`, the current temperature is `22.1`, the HVAC mode is `heat` and the heater device switch is `off`. Then it won't turn ON, despite the fact the current temperature is above the target. The heater will turn ON when the current temperature will be `22.5`, this is target temperature + hysteresis ON. This is the same with the hysteresis OFF feature.

## Presets

This thermostat supports the preset modes `away`, `eco` and `comfort`. Eco and comfort are working the same way, but `away` is different.

When the preset mode is `away`, the temperature is fixed by the variable `away_temp` in the `heat` section or `cool` section. You cannot change it. If you call the temperature service with a HVAC mode, it will work as expected : the temperature will be changed for this mode, but the current target temperature will stay the one set in `away` mode.

When the preset mode is set to `eco` or `comfort`, the target temperature is modified this way : target_temperature + comfort_shift (or eco_shift). That way, if you have a target temperature set to `25` in `cool` mode, and you have an eco_shift set to `4`, if you switch to eco, the new target temperature will be set to `29`. If you want the new target temperature to be below the normal target temperature, then you have to set a negative value.

## Examples

```yaml
# Custom example configuration.yaml entry
climate:  
  - platform: virtual_thermostat
    name: Upstairs
    sensor: sensor.upstairs_temperature
    hysteresis_tolerance_on: 0.5
    hysteresis_tolerance_off: 1
    enabled_presets:
      - away
      - eco
    heat:
      entity_id: switch.upstairs_heater_switch
      min_temp: 15
      max_temp: 24
      initial_target_temp: 19
      away_temp: 12
      eco_shift: -2
    cool:
      entity_id: switch.upstairs_ac_switch
      min_temp: 10
      max_temp: 32
      initial_target_temp: 28
      away_temp: 28
      eco_shift: 4
```

```yaml
# Full example configuration.yaml entry
climate:  
  - platform: virtual_thermostat
    name: Upstairs
    sensor: sensor.upstairs_temperature
    initial_hvac_mode: "off"
    initial_preset_mode: "none"
    keep_alive:
      minutes: 30
    hysteresis_tolerance_on: 0.5
    hysteresis_tolerance_off: 1
    restore_from_old_state: True
    min_cycle_duration:
      minutes: 5
    enabled_presets:
      - away
      - eco
      - comfort
    heat:
      device: switch.upstairs_heater_switch
      min_temp: 15
      max_temp: 24
      initial_target_temp: 19
      away_temp: 12
      eco_shift: -2
      comfort_shift: 2
    cool:
      entity_id: switch.upstairs_ac_switch
      min_temp: 10
      max_temp: 32
      initial_target_temp: 28
      away_temp: 28
      eco_shift: 4
      comfort_shift: -2
```
