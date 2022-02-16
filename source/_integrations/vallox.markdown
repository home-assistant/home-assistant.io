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
---

The `vallox` integration lets you control any Vallox ventilation unit that is supported by the [vallox_websocket_api](https://github.com/yozik04/vallox_websocket_api) (follow the link for a list of supported units).

The **fan** platform of this integration allows you to turn on/off the complete unit via the toggle switch and to select a ventilation profile either through the GUI, or the service `fan/set_preset_mode`. The four standard Vallox profiles are provided:

- `At Home`
- `Away`
- `Boost`
- `Fireplace`

Also, there is a **sensor** platform that exposes a number of relevant metrics like fan speed, various air temperatures and humidity.

{% include integrations/config_flow.md %}

## Profile Switching

For convenient switching of ventilation profiles in the GUI, just click on the `Vallox` fan entity to get a drop-down menu to select from. Alternatively, consider using an [input_select](../input_select) hooked to an automation, which calls the fan platform's `set_preset_mode` service. For example:

{% raw %}

```yaml
input_select:
  ventilation_profile:
    name: Ventilation profile select
    options:
      - "Home"
      - "Away"
      - "Boost"
      - "Fireplace"
    icon: mdi:fan

automation:
  - alias: "Set Ventilation Profile"
    trigger:
      platform: state
      entity_id: input_select.ventilation_profile
    action:
      service: fan.set_preset_mode
      data:
        preset_mode: "{{ states('input_select.ventilation_profile') }}"
      target:
        entity_id: fan.vallox
```

{% endraw %}

In order to also update the input select in case some external event changes the Vallox profile (web interface, mechanical switch, reboot, etc...) you can use the following automation:

{% raw %}

```yaml
automation:
  - alias: "Update Vallox input_select"
    description: Update input_select when external event changes the profile
    trigger:
      - entity_id: sensor.vallox_current_profile
        platform: state
    action:
      - service: input_select.select_option
        target:
          entity_id: input_select.ventilation_profile
        data:
          option: "{{ states('sensor.vallox_current_profile') }}"
```

{% endraw %}

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
