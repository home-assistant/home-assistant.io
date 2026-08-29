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
ha_integration_type: device
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

The following Vallox profiles are supported. Availability depends on the connected unit and the presets it exposes, so some profiles may not appear on all devices:

- `Home`
- `Away`
- `Boost`
- `Fireplace`
- `Extra` (available on devices/firmware that expose this preset)
- `Auto` (available on devices/firmware that expose this preset; requires firmware v3.1.4 or newer)

{% include integrations/actions.md %}
