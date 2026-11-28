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

A climate entity has the attributes below.
Which ones appear depends on the features the device supports.
State attributes show what the device is doing right now. Capability attributes describe what the device can do.

### State attributes

- `hvac_action`: What the device is doing right now. One of `cooling`, `defrosting`, `drying`, `fan`, `heating`, `idle`, `off`, or `preheating`. Only shown when the integration reports it.
- `current_temperature`: The current temperature reported by the entity. It may come from the device or a separate sensor.
- `temperature`: The target temperature. Only available when the device supports a single target temperature.
- `target_temp_low`: The lower target temperature. Only available when the device supports a target temperature range.
- `target_temp_high`: The upper target temperature. Only available when the device supports a target temperature range.
- `current_humidity`: The current humidity measured by the device. Only shown when the device reports it.
- `humidity`: The target humidity. Only available when the device supports a target humidity.
- `fan_mode`: The current fan setting. The built-in values are `on`, `off`, `auto`, `low`, `medium`, `high`, `top`, `middle`, `focus`, and `diffuse`, and integrations can add their own. Only available when the device supports fan modes.
- `preset_mode`: The active preset. The built-in values are `none`, `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, and `activity`, and integrations can add their own. Only available when the device supports presets.
- `swing_mode`: The current swing setting. Only available when the device supports swing.
- `swing_horizontal_mode`: The current horizontal swing setting. Only available when the device supports horizontal swing.

### Capability attributes

- `temperature_unit`: The unit used by all temperature attributes, as set in your Home Assistant unit system.
- `min_temp`: The lowest target temperature you can set.
- `max_temp`: The highest target temperature you can set.
- `target_temp_step`: The step size of the target temperature. Only shown when the integration provides it.
- `min_humidity`: The lowest target humidity you can set. Only available when the device supports a target humidity.
- `max_humidity`: The highest target humidity you can set. Only available when the device supports a target humidity.
- `target_humidity_step`: The step size of the target humidity. Only available when the device supports a target humidity and the integration provides it.
- `hvac_modes`: The modes the device supports. These are the states listed in [Climate states](#climate-states), except `unavailable` and `unknown`.
- `fan_modes`: The fan settings the device supports. Only available when the device supports fan modes.
- `preset_modes`: The presets the device supports. Only available when the device supports presets.
- `swing_modes`: The swing settings the device supports. Only available when the device supports swing.
- `swing_horizontal_modes`: The horizontal swing settings the device supports. Only available when the device supports horizontal swing.

{% include integrations/triggers_conditions_actions.md %}
