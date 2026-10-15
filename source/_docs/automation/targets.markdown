---
title: "Automation targets: entities, devices, areas, floors, and labels"
description: "Use areas, floors, labels, and devices as targets in automations. Learn which entities a target covers, and how triggers and conditions react when a target covers several entities."
related:
  - docs: /docs/automation/basics/
    title: Understanding automations
  - docs: /docs/automation/trigger/
    title: Automation triggers
  - docs: /docs/automation/condition/
    title: Automation conditions
  - docs: /docs/scripts/perform-actions/
    title: Performing actions
  - docs: /docs/organizing/
    title: Grouping your assets
---

A target is what a {% term trigger %}, a {% term condition %}, or an {% term action %} works with, in both {% term automations %} and {% term scripts %}. A trigger monitors its targets for a change, a condition checks the {% term state %} of its targets, and an action controls its targets. For example, the **Light turned on** trigger reacts when a targeted light turns on, and the **Turn on light** action turns on the targeted lights.

A target can be a single {% term entity %}, or a group of entities, such as all lights in an {% term area %}, like a room in your home. Home Assistant finds the matching entities for you.

## Types of targets

You can use one or more targets in a trigger, condition, or action. You can also combine different target types, for example, one entity and an entire area.

- **Entity**: That one entity, for example, the hallway light.
- **Device**: The matching entities of that {% term device %}. If the device has [sub-devices](/docs/configuration/customizing-devices/#about-parent-devices-and-sub-devices), such as the outlets of a power strip, their matching entities are part of the target as well.
- **Area**: The matching entities in that area.
- **Floor**: The matching entities in all areas on that {% term floor %}.
- **Label**: The matching entities that have that {% term label %}. If the label is on a device or an area, the matching entities of that device or area are part of the target as well.

## Entities that are part of a target

When a target is a device, an area, a floor, or a label, not every entity that belongs to it is part of the target. An entity is part of a target if both of the following are true:

- It belongs to the device, area, floor, or label you selected.
- The trigger, condition, or action can work with it.

For example, a **Light turned on** trigger that targets the living room area monitors all lights in the living room.

An entity belongs to an area if one of the following is true:

- The entity is assigned to that area.
- The device of the entity is in that area, and the entity has no area of its own.

To learn how to assign devices and entities to areas, refer to [Grouping your assets](/docs/organizing/).

If you select an entity directly, it's always part of the target, even if it's one of the entities listed in the next section.

## Entities that are not part of a target

Some entities are not part of a target, even if they belong to the device, area, floor, or label you selected.

The following entities are not part of a target because of what the trigger, condition, or action works with:

- Entities of a different type. For example, for **Light turned on**, the switches and sensors in the room are not part of the target, and for **Window opened**, door sensors are not, because the trigger checks the device class.
- For triggers and conditions, the members of [old-style groups](/integrations/group/#old-style-groups). These are groups set up in YAML, with an entity ID that starts with `group.`, such as `group.downstairs_lights`.

The following entities are not part of a target because of how they are set up:

- Entities that you assigned to a different area than their device, when you target the area of the device. These entities belong to their own area only.
- Hidden entities. For example, if an action turns on all lights in the living room, a hidden light in that room stays off.
- Configuration and diagnostic entities, such as a firmware update or the signal strength of a device. If you put a label on the entity itself, and target that label, the entity is part of the target.

## Targets stay up to date

Home Assistant keeps the entities in a target up to date. If you've selected an area as a target, and later add a light to that area, the light becomes part of the target right away. You don't need to edit the automation.

## When a target covers several entities

When a target covers more than one entity, you can decide how the trigger or condition combines them.

### Triggers: Each, First, and All

Under **Trigger when**, select one of the following:

- **Each** (default): The trigger reacts every time one of the targets makes the change. For example, if three lights turn on, the automation starts three times.
- **First**: The trigger reacts when the first target makes the change, while none of the other targets is in that state yet. It reacts again only after none of the targets is in that state anymore. For example, the automation starts when the first light in the living room turns on, and doesn't start again until all of them are off again.
- **All**: The trigger reacts when the last target makes the change, so that all targets are in that state. For example, the automation starts when the last window is closed.

For **First** and **All**, Home Assistant skips targets that are **Unavailable** or **Unknown**. Most triggers also don't react when a target comes back from **Unavailable** or **Unknown**. For details, refer to [Unavailable and unknown state behavior in triggers](/docs/automation/trigger/#unavailable-and-unknown-state-behavior-in-triggers).

When an automation starts, the trigger data describes the one entity that made the change, not the entire target. For example, `trigger.entity_id` is the light that turned on, and `trigger.from_state` and `trigger.to_state` are the states of that light before and after the change. To learn how to use this data, refer to [Trigger data in templates](/docs/automation/templating/).

### Conditions: Any and All

Under **Condition passes if**, select one of the following:

- **Any** (default): The condition passes if at least one of the targets is in that state. For example, at least one light in the living room is on.
- **All**: The condition passes only if all targets are in that state. For example, all windows are closed.

Targets that are **Unavailable** or **Unknown** don't count. If all targets are **Unavailable** or **Unknown**, **Any** fails and **All** passes. For example, if all window sensors in the bedroom are **Unavailable**, because their hub is offline, **Window is closed** with **All** passes, even though Home Assistant can't tell whether the windows are closed.

**Any** and **All** combine the targets of one condition. To combine different conditions, use the [**And**](/conditions/and/) and [**Or**](/conditions/or/) conditions. For example, to check whether a light is on or a door is open, add an **Or** condition with both conditions in it.

### Actions

An action controls all of its targets. For example, if **Turn on light** targets an area, all lights in that area turn on. For details, refer to [Action targets](/docs/scripts/perform-actions/#action-targets).

## Targets in YAML

In {% term YAML %}, enter the targets under `target`. Use one or more of the following keys: `entity_id`, `device_id`, `area_id`, `floor_id`, and `label_id`. Each key can contain a single ID or a list of IDs. Use the IDs, not the names.

For triggers, set **Trigger when** with `behavior` under `options`. The values are `each`, `first`, and `all`.

{% example %}
trigger: |
  trigger: light.turned_on
  target:
    area_id: living_room
  options:
    behavior: first
{% endexample %}

For conditions, set **Condition passes if** with `behavior` under `options`. The values are `any` and `all`.

{% example %}
condition: |
  condition: light.is_on
  target:
    floor_id: upstairs
  options:
    behavior: all
{% endexample %}
