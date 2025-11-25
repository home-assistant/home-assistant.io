---
title: Vallox
description: Instructions on how to integrate Vallox ventilation units into Home Assistant.
ha_category:
  - Fan
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 0.96
ha_iot_class: Local Polling
ha_domain: vallox
ha_platforms:
  - binary_sensor
  - date
  - fan
  - number
  - sensor
  - switch
ha_codeowners:
  - '@andre-richter'
  - '@slovdahl'
  - '@viiru-'
  - '@yozik04'
ha_integration_type: integration
---

The **Vallox** {% term integration %} lets you control any Vallox ventilation unit that is supported by the [vallox_websocket_api](https://github.com/yozik04/vallox_websocket_api) (follow the link for a list of supported units).

{% include integrations/config_flow.md %}

## Platforms

### Fan

The fan platform of this integration allows you to control the entire unit. You can turn the unit on/off using the toggle switch, adjust the fan speed, and select a ventilation profile.

### Sensor

The sensor platform allows you to monitor various metrics such as fan speeds, air temperatures, humidity, remaining filter life, cell state, and more.

### Binary sensor

The binary sensor platform allows you to monitor the status of the post heater.

### Switch

The switch platform allows you to lock the heat recovery bypass.

### Number

The number platform gives you control over the supply air temperatures.

### Date

The date platform allows you to set the filter change date.


## Profile switching

For convenient switching of ventilation profiles in the GUI, just click on the `Vallox` fan {% term entity %} to get a drop-down menu to select from. Alternatively, the action `fan/set_preset_mode` can be used.

The four standard Vallox profiles are supported:

- `Home`
- `Away`
- `Boost`
- `Fireplace`

## Fan actions

### Action `vallox.set_profile_fan_speed_home`

Set the fan speed of the `Home` profile.

| Data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### Action `vallox.set_profile_fan_speed_away`

Set the fan speed of the `Away` profile.

| Data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### Action `vallox.set_profile_fan_speed_boost`

Set the fan speed of the `Boost` profile.

| Data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### Action `vallox.set_profile` 

Set the profile, and optionally a duration for the profile to be active.

| Data attribute | Optional | Description                                                                                                                                                                           |
|----------------|---------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `profile`      |       no | Profile to set, one of `home`, `away`, `boost`, `fireplace`, or `extra`.                                                                                                              |
| `duration`     |      yes | Duration to activate the profile for; in minutes. `Integer` between 1 and 65535. Only applies to  `boost`, `fireplace` or `extra` profiles. 65535 sets the profile without a timeout. |
