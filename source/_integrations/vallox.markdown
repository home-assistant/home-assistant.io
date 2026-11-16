---
description: Instructions on how to integrate Vallox ventilation units into Home Assistant.
ha_release: 0.96
ha_domain: vallox
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


## Fan presets

The presets of the **Vallox** fan {% term entity %} are the ventilation modes of your unit. To switch them in the UI, select the fan and choose a preset. In automations and scripts, use the `fan.set_preset_mode` action with one of these values:

- **Home**: `home`
- **Away**: `away`
- **Boost**: `boost`
- **Fireplace / Custom**: `fireplace`. This mode was renamed to **Custom** in firmware 2.0.20.
- **Extra**: `extra`
- **Auto**: `auto`. Requires firmware 3.1.4 or newer.

The unit doesn't report which modes it supports, so the fan always lists all six presets.

{% include integrations/actions.md %}
