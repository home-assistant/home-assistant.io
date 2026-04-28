---
title: Return to base
action: vacuum.return_to_base
domain: vacuum
description: "Sends the vacuum to the charging dock."
---

The **Return to base** action instructs the vacuum to stop its current task and return to its charging dock.

Use it when you want the robot to head home in an orderly way, like before bedtime, before guests arrive, or when you want the floor clear without leaving the vacuum stranded in the middle of a room.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Return to base**.
4. Select a vacuum, area, or group.
5. Save.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.return_to_base
    target:
      entity_id: vacuum.living_room
{% endexample %}

If you omit `entity_id`, the action will target all vacuums.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum, area, or device to send to base.
  required: false
  type: target
{% endoptions_yaml %}

## Good to know

- Not all vacuums support returning to base from every state.

### Automation: send the vacuum back before bedtime

At the end of the evening, this automation sends the vacuum back to its dock so the floor is clear and the robot is charging overnight.

- **Trigger**: Time: 22:30
- **Action**: Return to base
- **Target**: Downstairs vacuum

{% details "YAML example for sending a vacuum home at night" %}

{% example %}
automation: |
  alias: "Return vacuum to dock at bedtime"
  triggers:
    - trigger: time
      at: "22:30:00"
  actions:
    - action: vacuum.return_to_base
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}
