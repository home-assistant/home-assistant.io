---
title: Reset accessory
action: homekit.reset_accessory
domain: homekit
description: "Resets a HomeKit accessory."
related_actions:
  - homekit.reload
  - homekit.unpair
---

The **Reset accessory** action resets one or more HomeKit accessories whose configuration may have changed. The accessory behaves as if it's being set up for the first time, so you need to restore its name, group, room, scene, and automation settings afterward.

This is useful after changing a media player's device class to `tv`, linking a battery sensor, or whenever Home Assistant adds support for new HomeKit features to existing entities.

{% include actions/ui_header.md %}

To reset an accessory from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomeKit Bridge: Reset accessory**.
6. Select the **Entity** to reset.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The entity, or entities, to reset.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homekit.reset_accessory`:

{% example %}
action: |
  action: homekit.reset_accessory
  data:
    entity_id: media_player.living_room_tv
{% endexample %}

This resets the HomeKit accessory for the given entity.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID, or list of entity IDs, of the accessories to reset.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- After a reset, the accessory behaves as if it's set up for the first time. You need to restore its name, group, room, scene, and automation settings.
- On earlier versions of Home Assistant, you can reset accessories by removing the entity from HomeKit through the filter and then adding it back.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
