---
title: "Generic turn off"
action: homeassistant.turn_off
domain: homeassistant
description: "Turns off one or more entities across any domain in a single action."
related_actions:
  - homeassistant.turn_on
  - homeassistant.toggle
---

Use this action to turn off one or more entities, no matter which domain they belong to. It works like `light.turn_off` or `switch.turn_off`, but it is not tied to a single domain. That means you can turn off a light and a switch in the same action. A common use is a single "everything off" action that you call when you leave home or go to bed.

Home Assistant passes the request on to the matching turn-off action for each entity's domain. If an entity's domain does not support turning off, that entity is skipped.

{% include actions/ui_header.md %}

To turn entities off from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Generic turn off**.
6. Under **Targets** (see [Targets](#targets)), select the entities, devices, or areas you want to turn off.
7. Select **Save**.

### Options in the UI

This action has no options other than its targets.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.turn_off
  target:
    entity_id:
      - light.living_room
      - switch.tv
{% endexample %}

### Options in YAML

This action has no options other than its target.

<a id="targets"></a>

## Targets of the action

This action requires a target. The target is the object of the action. Unlike most actions, the generic turn-off action is not limited to one domain. You can point it at any mix of entities that can be turned off, such as lights, switches, and fans.

- **Entity**: one specific entity, such as `light.living_room`.
- **Device**: every entity that belongs to a device.
- **Area**: every entity in a room or area.
- **Floor**: every entity on a floor.
- **Label**: every entity that shares a label.

You can combine target types in one action. For example, you can add a single light and a whole area at once.

## Good to know

- Entities whose domain does not support turning off are skipped. The rest are still turned off.

{% include actions/stuck.md %}

{% include actions/related.md %}
