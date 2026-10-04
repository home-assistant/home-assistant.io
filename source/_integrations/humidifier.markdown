---
title: Humidifier
description: Instructions on how to set up humidity control devices within Home Assistant.
ha_category:
  - Humidifier
ha_release: '0.112'
ha_domain: humidifier
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

The **Humidifier** {% term integration %} is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

{% include integrations/building_block_integration.md %}

## Humidifier states

A humidifier entity can have the following states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **On** (`on`): The humidifier is turned on.
- **Off** (`off`): The humidifier is turned off.

In addition, the entity can have the following states:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Device class

The device class tells Home Assistant whether a device adds humidity to the air or removes it.

The device class makes a difference in the following places:

- Voice assistants and Apple Home: [Google Assistant](/integrations/google_assistant/) and Apple Home, through the [HomeKit Bridge](/integrations/homekit/) integration, show the device as a humidifier or a dehumidifier. Without a device class, they show it as a humidifier.
- Display: For a dehumidifier, the target humidity slider in the humidifier card and the entity dialog is filled from the high end.
- History and Activity: If you have humidifiers with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the humidifier sets the device class.

### List of available device classes

Without a device class, Home Assistant treats the device as a humidifier.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- **Humidifier** (`humidifier`): Adds humidity to the air around it.
- **Dehumidifier** (`dehumidifier`): Removes humidity from the air around it.

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `dehumidifier`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

{% include integrations/triggers_conditions_actions.md %}
