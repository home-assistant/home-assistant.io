---
title: Climate
description: Instructions on how to set up climate control devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.19
ha_quality_scale: internal
ha_domain: climate
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Climate** {% term integration %} allows you to control and monitor HVAC (heating, ventilating, and air conditioning) devices and thermostats.

{% include integrations/building_block_integration.md %}

## The state of an HVAC entity

An HVAC entity can have the following states, depending on the specific climate device and its capabilities.

- **Off**: The device is turned off.
- **Heat**: The device is set to heat to a target temperature.
- **Cool**: The device is set to cool to a target temperature.
- **Heat/Cool**: The device is set to heat/cool to a target temperature range.
- **Auto**: The device is set to a schedule, learned behavior, AI.
- **Dry**: The device is set to dry/humidity mode.
- **Fan only**: The device only has the fan on. No heating or cooling is taking place.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/actions.md %}

## Attributes

The climate entity has extra attributes to represent the state of the thermostat.

| Name | Description |
| ---- | ----------- |
| `hvac_action` | Current state: `heating` / `cooling` / `idle`.
| `fan_mode` | If the fan is currently on or off: `on` / `off`.

It depends on the thermostat you are using which states are available.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
