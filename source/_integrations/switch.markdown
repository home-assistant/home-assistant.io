---
title: Switch
description: Instructions on how to set up your switches with Home Assistant.
ha_category:
  - Switch
ha_release: 0.7
ha_quality_scale: internal
ha_domain: switch
ha_platforms:
  - light
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

The **Switch** {% term integration %} manages the state of the switch entities and allows you to control them.

- Maintains a state for each of your switches.
- Registers actions `switch.turn_on`, `switch.turn_off`, and `switch.toggle` to control switches.

{% include integrations/building_block_integration.md %}

## Switch states

A switch entity can have the following states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **On** (`on`): The switch is turned on.
- **Off** (`off`): The switch is turned off.

In addition, the entity can have the following states:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Device class

The device class tells Home Assistant whether a switch controls a power outlet.

The device class makes a difference in the following places:

- Voice assistants and Apple Home: [Google Assistant](/integrations/google_assistant/) and Apple Home, through the [HomeKit Bridge](/integrations/homekit/) integration, show an outlet as an outlet. [Alexa](/integrations/alexa/) shows it as a smart plug. Other switches show up as switches.
- Icon: An outlet shows a plug {% icon "mdi:power-plug" %}, or {% icon "mdi:power-plug-off" %} when it's off. Other switches show a toggle {% icon "mdi:toggle-switch-variant" %}, or {% icon "mdi:toggle-switch-variant-off" %} when they're off.
- History and Activity: If you have switches with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the switch sets the device class.

### List of available device classes

A switch without a device class is a generic switch and shows {% icon "mdi:toggle-switch-variant" %}.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- {% icon "mdi:power-plug" %} **Outlet** (`outlet`): A switch for a power outlet.
- {% icon "mdi:toggle-switch-variant" %} **Switch** (`switch`): A generic switch.

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `outlet`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### Changing the device class of a switch

If a switch controls an outlet or a smart plug but shows up as a switch, or the other way around, you can change its device class. Under **Show as**, **Switch** and **Outlet** change the device class. The other options, such as **Light** or **Fan**, don't. Instead, Home Assistant creates a new entity of that type that controls the switch, and hides the switch. For details, refer to [Change device type of a switch](/integrations/switch_as_x/).

You can only change the device class this way if the switch has a unique ID. Otherwise, the entity settings show that its settings can't be managed from the UI. In that case, you can change the device class in YAML with [customization](/docs/configuration/customizing-devices/#customizing-an-entity-in-yaml).

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the switch.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Under **Show as**, select **Switch** or **Outlet**.
4. Select **Update**.
   - Result: The switch shows the matching icon.

Google Assistant and Alexa through Home Assistant Cloud pick up the new type automatically. If you use Apple Home through the HomeKit Bridge, [reset the accessory](/actions/homekit.reset_accessory/) so Apple Home shows the new type. Apple Home then treats it as a new accessory, so you need to set up its name, group, room, scenes, and automations again. If you set up Google Assistant or Alexa without Home Assistant Cloud, ask your voice assistant to sync or discover devices again.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}
