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

- Maintains a state per switch and a combined state `all_switches`.
- Registers actions `switch.turn_on`, `switch.turn_off`, and `switch.toggle` to control switches.

{% include integrations/building_block_integration.md %}

## The state of a switch entity

The state of a switch {% term entity %} can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Device class

{% include integrations/device_class_intro.md %}

 The following device classes are supported for switches:

- **None**: Generic switch. This is the default and doesn't need to be set.
- **outlet**: A switch for a power outlet.
- **switch**: A generic switch.

## Using the actions

In the frontend open **Settings**. Select **Developer tools**, click **Actions**. From the **Action** dropdown menu choose `switch.turn_on` or `switch.turn_off` from the list of available actions. In the Entity dropdown menu choose or enter the entity ID you want to work with. This will enter something like the sample below into the **data** field. Now select **Perform action**.

```json
{"entity_id":"switch.livingroom_pin2"}
```

| Data attribute | Optional | Description                                                                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String or list of strings that point at `entity_id`s of switches. To target all switches, set `entity_id` to `all`. |
