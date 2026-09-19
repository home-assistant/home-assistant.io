---
title: "Generic toggle"
action: homeassistant.toggle
domain: homeassistant
description: "Toggles one or more entities across any domain on or off in a single action."
related_actions:
  - homeassistant.turn_on
  - homeassistant.turn_off
---

Use this action to toggle one or more entities on or off, no matter which domain they belong to. It works like `light.toggle` or `switch.toggle`, but it is not tied to a single domain. That means you can toggle a light and a switch in the same action. A common use is a single button that flips a mix of devices to the opposite of their current state.

Home Assistant passes the request on to the matching toggle action for each entity's domain. If an entity's domain does not support toggling, that entity is skipped.

{% include actions/ui_header.md %}

To toggle entities from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Generic toggle**.
6. Under **Targets** (see [Targets](#targets)), select the entities, devices, or areas you want to toggle.
7. Select **Save**.

### Options in the UI

This action has no options other than its targets.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.toggle`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.toggle
  target:
    entity_id:
      - light.living_room
      - switch.tv
{% endexample %}

### Options in YAML

This action has no options other than its target.

<a id="targets"></a>

## Targets of the action

This action requires a target. The target is the object of the action. Unlike most actions, the generic toggle action is not limited to one domain. You can point it at any mix of entities that can be toggled, such as lights, switches, and fans.

- **Entity**: one specific entity, such as `light.living_room`.
- **Device**: every entity that belongs to a device.
- **Area**: every entity in a room or area.
- **Floor**: every entity on a floor.
- **Label**: every entity that shares a label.

You can combine target types in one action. For example, you can add a single light and a whole area at once.

## Good to know

- Each entity flips to the opposite of its current state. Entities that are on turn off, and entities that are off turn on.
- Entities whose domain does not support toggling are skipped.

{% include actions/stuck.md %}

{% include actions/related.md %}
