---
title: "Generic turn on"
action: homeassistant.turn_on
domain: homeassistant
description: "Turns on one or more entities across any domain in a single action."
related_actions:
  - homeassistant.turn_off
  - homeassistant.toggle
---

Use this action to turn on one or more entities, no matter which domain they belong to. It works like `light.turn_on` or `switch.turn_on`, but it is not tied to a single domain. That means you can turn on a light and a switch in the same action. A common use is a single "everything on" action in a script that mixes lights, switches, and other devices.

Home Assistant passes the request on to the matching turn-on action for each entity's domain. If an entity's domain does not support turning on, that entity is skipped.

{% include actions/ui_header.md %}

To turn entities on from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Generic turn on**.
6. Under **Targets** (see [Targets](#targets)), select the entities, devices, or areas you want to turn on.
7. Select **Save**.

### Options in the UI

This action has no options other than its targets.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.turn_on
  target:
    entity_id:
      - light.living_room
      - switch.tv
{% endexample %}

### Options in YAML

This action has no options other than its target.

<a id="targets"></a>

## Targets of the action

This action requires a target. The target is the object of the action. Unlike most actions, the generic turn-on action is not limited to one domain. You can point it at any mix of entities that can be turned on, such as lights, switches, and fans.

- **Entity**: one specific entity, such as `light.living_room`.
- **Device**: every entity that belongs to a device.
- **Area**: every entity in a room or area.
- **Floor**: every entity on a floor.
- **Label**: every entity that shares a label.

You can combine target types in one action. For example, you can add a single light and a whole area at once.

## Good to know

- Entities whose domain does not support turning on are skipped. The rest are still turned on.

{% include actions/stuck.md %}

{% include actions/related.md %}
