---
title: Vallox
description: Instructions on how to integrate Vallox ventilation units into Home Assistant.
ha_category:
  - Fan
  - Sensor
ha_config_flow: true
ha_release: 0.96
ha_iot_class: Local Polling
ha_domain: vallox
ha_platforms:
  - binary_sensor
  - fan
  - sensor
ha_codeowners:
  - '@andre-richter'
  - '@slovdahl'
  - '@viiru-'
ha_integration_type: integration
---

The `vallox` integration lets you control any Vallox ventilation unit that is supported by the [vallox_websocket_api](https://github.com/yozik04/vallox_websocket_api) (follow the link for a list of supported units).

The **fan** platform of this integration allows you to turn on/off the complete unit via the toggle switch and to select a ventilation profile.

Also, there is a **sensor** platform that exposes a number of relevant metrics like fan speed, various air temperatures and humidity.

{% include integrations/config_flow.md %}

## Profile Switching

For convenient switching of ventilation profiles in the GUI, just click on the `Vallox` fan entity to get a drop-down menu to select from. Alternatively, the service `fan/set_preset_mode` can be used.

The four standard Vallox profiles are supported:

- `At Home`
- `Away`
- `Boost`
- `Fireplace`

## Fan Services

### Service `vallox.set_profile_fan_speed_home`

Set the fan speed of the `Home` profile.

| Service data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### Service `vallox.set_profile_fan_speed_away`

Set the fan speed of the `Away` profile.

| Service data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### Service `vallox.set_profile_fan_speed_boost`

Set the fan speed of the `Boost` profile.

| Service data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |
