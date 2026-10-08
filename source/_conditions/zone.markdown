---
title: "Zone"
condition: zone
domain: zone
description: "Older condition that tests if a person, device tracker, or other entity with a location is in a zone."
related_conditions:
  - zone.in_zone
  - zone.not_in_zone
  - zone.occupancy_is_detected
---

The **Zone** condition checks whether a person, a device tracker, or another {% term entity %} with a location is in a [zone](/integrations/zone/). You can check several entities and several zones in one condition. For example, the condition can check whether Sam is at work or at the gym.

This is an older condition. When you select **Add condition**, it isn't in the list anymore, but automations that use it keep working. For new automations, use the conditions in the **Zone** group, such as [Is in zone](/conditions/zone.in_zone/). This page helps you read and change automations that already use the **Zone** condition.

## Choosing a zone condition for new automations

For new automations, use these conditions instead:

- Whether people or device trackers are in a zone: [Is in zone](/conditions/zone.in_zone/)
  - With **For at least**, it can also check how long they've been there.
- Whether people or device trackers are not in a zone: [Is not in zone](/conditions/zone.not_in_zone/)
- Whether someone is in one of several zones: an **Or** block with an [Is in zone](/conditions/zone.in_zone/) condition for each zone
- Whether anyone is in a zone: [Zone occupancy is detected](/conditions/zone.occupancy_is_detected/)
- Whether an entity that isn't a person or a device tracker is in a zone: no newer condition checks this. Keep using the **Zone** condition in YAML.

## Editing this condition in the UI

When you open an automation that uses the **Zone** condition, the editor shows its options:

{% options_ui %}
Entity with location:
  description: The person, device tracker, or other entity with a location to check.
  required: true
Zone:
  description: The zone the entity must be in.
  required: true
{% endoptions_ui %}

The editor shows one entity and one zone. To check several entities or zones, edit the condition in YAML.

To switch to a newer condition, delete the **Zone** condition, then add one from the **Zone** group.

{% include conditions/yaml_header.md %}

In YAML, the condition uses `condition: zone`. A basic example looks like this:

{% example %}
condition: |
  condition: zone
  entity_id: person.sam
  zone: zone.home
{% endexample %}

This passes when Sam is home.

### Options in YAML

**Entity with location** is `entity_id`, and **Zone** is `zone`. In YAML, both also accept a list.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `zone`.
  required: true
  type: string
entity_id:
  description: The entity to check, or a list of entities. Use a person, a device tracker, or another entity with `latitude` and `longitude` attributes. With a list, every entity must be in one of the zones.
  required: true
  type: [string, list]
zone:
  description: The zone to check, or a list of zones. With a list, the condition passes if the entity is in any of these zones.
  required: true
  type: [string, list]
{% endoptions_yaml %}

The following example passes if Sam is at work or at the gym:

{% example %}
condition: |
  condition: zone
  entity_id: person.sam
  zone:
    - zone.work
    - zone.gym
{% endexample %}

## Good to know

- With several entities, the condition only passes if every entity is in one of the zones. They don't have to be in the same zone.
- For people and device trackers, the condition uses the zones they're in, from their `in_zones` attribute. For other entities, and for device trackers without that attribute, it uses their `latitude` and `longitude` attributes and their GPS accuracy.
- If an entity is unavailable or unknown, it doesn't count as being in a zone, so the condition doesn't pass.
- A person without a location doesn't count as being in a zone. For other entities without a location, the condition fails with an error. The error is shown in the trace.

## Examples

These examples show automations that use the **Zone** condition, and what to use instead in a new automation.

### Automation: turn on the hallway light when the door opens and Sam is home

When the front door opens, this automation turns on the hallway light, but only if Sam is home.

- **Trigger**: State changed
  - **Entity**: Front door (`binary_sensor.front_door`)
  - **To**: Open
- **Condition**: Zone
  - **Entity with location**: Sam (`person.sam`)
  - **Zone**: Home (`zone.home`)
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)

In a new automation, use [Is in zone](/conditions/zone.in_zone/) instead.

{% details "YAML example for the hallway light when Sam is home" %}

{% example %}
automation: |
  alias: "Hallway light when the door opens and Sam is home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: zone
      entity_id: person.sam
      zone: zone.home
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Automation: remind Sam to buy groceries when at work or at the gym

At 17:00, this automation sends Sam a reminder to buy groceries, but only if Sam is at work or at the gym. This condition checks two zones, so it's written in YAML.

In a new automation, use an **Or** block with an [Is in zone](/conditions/zone.in_zone/) condition for each zone instead.

{% details "YAML example for a grocery reminder" %}

{% example %}
automation: |
  alias: "Grocery reminder after work or the gym"
  triggers:
    - trigger: time
      at: "17:00:00"
  conditions:
    - condition: zone
      entity_id: person.sam
      zone:
        - zone.work
        - zone.gym
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Don't forget to buy groceries on your way home."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
