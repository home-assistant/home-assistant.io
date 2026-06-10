---
title: "Occupancy detected"
trigger: occupancy.detected
domain: occupancy
description: "Triggers after one or more occupancy sensors detect that a space is occupied."
related_triggers:
  - occupancy.cleared
---

The **Occupancy detected** trigger fires when one or more occupancy sensors report that a space is now occupied.

Use it to automate actions, such as turning on lights, adjusting climate, or sending notifications, when a room or area becomes occupied. Use a single sensor for a specific room and a group of sensors for larger spaces.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Occupancy detected**.
5. Select **Add target** (see [Targets](#targets)) and pick the occupancy sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must keep reporting the space as occupied before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple occupancy sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor starts reporting the space as occupied.
    - **First**: fires only when the first sensor starts reporting the space as occupied.
    - **All**: fires only after every targeted sensor reports the space as occupied.
  required: false
For at least:
  description: How long the sensor or sensors must keep reporting the space as occupied before the trigger fires. The default is zero (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `occupancy.detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: occupancy.detected
  target:
    entity_id: binary_sensor.occupancy_living_room
  options:
    for:
      minutes: 1
{% endexample %}

This fires 1 minute after the sensor entity `binary_sensor.occupancy_living_room` reports the room as occupied.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple occupancy sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor starts reporting the space as occupied.
    - `first`: fires only when the first sensor starts reporting the space as occupied.
    - `all`: fires only after every targeted sensor reports the space as occupied.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must keep reporting the space as occupied before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Occupancy sensors are useful for rooms where people may be sitting still, such as a living room, office, or bedroom. They typically combine motion with other signals to keep reporting the space as occupied while someone is present, even when there is no movement.
- Add the **For at least** option to avoid reacting to brief or accidental triggers, like someone passing through a doorway.
- Combine occupancy with light sensors or time conditions to only turn on lights when it is actually dark.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the living room lights when the room becomes occupied in the evening

When the living room becomes occupied after sunset, this automation turns on the living room lights.

- **Trigger**: Occupancy detected
  - **Target**: Living room occupancy sensor
- **Condition**: Sun is below the horizon
- **Action**: Turn on light (in the living room)

{% details "YAML example for turning on living room lights when occupied after sunset" %}

{% example %}
automation: |
  alias: "Turn on living room lights when occupied after sunset"
  triggers:
    - trigger: occupancy.detected
      target:
        entity_id: binary_sensor.occupancy_living_room
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        area_id: living_room
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
