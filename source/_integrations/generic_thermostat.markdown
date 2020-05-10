---
title: Generic Thermostat
description: Turn Home Assistant into a thermostat
ha_category:
  - Climate
ha_release: 0 0.1XX
ha_iot_class: Local Polling
ha_domain: generic_thermostat
---

The `generic_thermostat` climate platform is a thermostat implemented in Home Assistant. It uses a sensor and a switch connected to a heater or air conditioning under the hood. When in heater mode, if the measured temperature is cooler than the target temperature, the heater will be turned on and turned off when the required temperature is reached. When in air conditioning mode, if the measured temperature is hotter than the target temperature, the air conditioning will be turned on and turned off when required temperature is reached. One Generic Thermostat entity can control two switches : one for the AC device and one for the heater. It also supports an _Away mode_, an _Eco mode_ and a _Comfort mode_

```yaml
# Minimal example configuration.yaml entry
climate:
  - platform: generic_thermostat
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
  default: Generic Thermostat
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
sensor_stale_duration:
  description: Set a period of time during which the sensor is allowed to be stalled. Over this period, if no new value has arrived, the emergency mode will be activated. The inner mecanism check every `sensor_stale_duration`, so the worse case scenario would be the sensor to stop emitting right after the last check, so it could be down for almost two times the `sensor_stale_duration` before the emergency mode is activated.
  required: false
  type: time
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

The hysteresis tolerance is used to save HVAC systems from restarting too often. If the hysteresis tolerance is set to `0.5`, the target temperature set to `22`, the current temperature is `22.1`, the HVAC mode is `heat` and the heater device switch is `off`. Then it won't turn ON, despite the fact the current temperature is above the target. The heater will turn ON when the current temperature will be `22.5`, this is target temperature + hysteresis ON. This is the same with the hysteresis OFF feature, but subtracting the hysteresis tolerance.

## Presets

This thermostat supports the preset modes `away`, `eco` and `comfort`. Eco and comfort are working the same way, but `away` is different.

When the preset mode is `away`, the temperature is fixed by the variable `away_temp` in the `heat` section or `cool` section. You cannot change it. If you call the temperature service with a HVAC mode, it will work as expected : the temperature will be changed for this mode, but the current target temperature will stay the one set in `away` mode.

When the preset mode is set to `eco` or `comfort`, the target temperature is modified this way : target temperature + `comfort_shift` (or `eco_shift`). That way, if you have a target temperature set to `25` in `cool` mode, and you have an `eco_shift` set to `4`, if you switch to `eco`, the new target temperature will be set to `29`. If you want the new target temperature to be below the normal target temperature, then you have to set a negative value. 

If you change the target temperature of the thermostat via the frontend, it's the target temperature you change, not the `eco_shift` or `comfort_shift`. If you are in `cool` mode, the preset set to `eco` with a `eco_shift` set to `4` in the configuration and you see `29` in the frontend, then that means the target temperature is set to `29 - 4 = 25`. If you change the temperature of the thermostat via the frontend to `30`, you will set the target temperature to `26`. That means if you set the preset mode to `none`, then the frontend will display `26`.

## Emergency mode

The emergency mode is enabled or disabled automatically. When the thermostat is in emergency mode, all the devices (entities defined in `heat` and `cool` sections) are turned `off`. The keepalive will just resend `off` orders each cycle.

There are two ways to enter in the emergency mode. The first is when the sensor is responding an unknown state. The thermostat immediately enter the emergency mode. The second is when the `sensor_stale_duration` configuration key is set. If the sensor has not updated it's state between two checks, the thermostat will enter in emergency mode, sending an order to `off`. Note that the `hvac_mode` will stay the same, this is just the current temperature not taken into account anymore.

The emergency mode is not saved upon restart, so if you restart Home Assistant, then the thermostat will reset this mode.

There is one way to exit automatically from this mode : the sensor has to update it's state. Once the state is updated, the emergency mode will be immediately stopped and the thermostat will start working normally again.

_A word of safety : you should always have a local safety system that can cut your equipments in case of overheating._

## Examples

```yaml
# Custom example configuration.yaml entry
climate:  
  - platform: virtual_thermostat
    name: Upstairs
    sensor: sensor.upstairs_temperature
    hysteresis_tolerance_on: 0.5
    hysteresis_tolerance_off: 1
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
    sensor_stale_duration:
      minutes: 120
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
