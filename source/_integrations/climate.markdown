---
description: Instructions on how to set up climate control devices within Home Assistant.
ha_release: 0.19
ha_domain: climate
---

The **Climate** {% term integration %} allows you to control and monitor HVAC (heating, ventilating, and air conditioning) devices and thermostats.

{% include integrations/building_block_integration.md %}

## Climate states

A climate entity can have the following states, depending on the specific climate device and its capabilities. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **Off** (`off`): The device is turned off.
- **Heat** (`heat`): The device is set to heat to a target temperature.
- **Cool** (`cool`): The device is set to cool to a target temperature.
- **Heat/Cool** (`heat_cool`): The device is set to heat/cool to a target temperature range.
- **Auto** (`auto`): The device is set to a schedule, learned behavior, AI.
- **Dry** (`dry`): The device is set to dry/humidity mode.
- **Fan only** (`fan_only`): The device only has the fan on. No heating or cooling is taking place.
- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Attributes

The climate entity has extra attributes to represent the state of the device, depending on the specific climate device and its capabilities. A climate entity may not support all the attributes.

| Name | Description |
| ---- | ----------- |
| `hvac_action` | What the device is currently doing, such as `heating`, `cooling`, `fan`, `defrosting`, `drying`, `preheating`, `off`, or `idle`.
| `hvac_modes` | The HVAC modes the device supports, such as `off`, `heat`, `cool`, or `heat_cool`.
| `current_temperature` | The current temperature reported by the entity, which may come from the device or a separate sensor.
| `temperature` | The target temperature, when the device uses a single setpoint.
| `target_temp_low` | The lower target temperature, when the device uses a setpoint range.
| `target_temp_high` | The upper target temperature, when the device uses a setpoint range.
| `fan_mode` | The current fan setting, such as `on`, `off`, `auto`, `high`, or `low`.
| `fan_modes` | The fan settings the device supports.
| `preset_mode` | The active preset, such as `home`, `away`, `eco`, or `none`.
| `preset_modes` | The presets the device supports.

{% include integrations/triggers_conditions_actions.md %}
