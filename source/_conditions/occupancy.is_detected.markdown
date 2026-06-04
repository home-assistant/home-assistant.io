---
title: "Occupancy is detected"
condition: occupancy.is_detected
domain: occupancy
description: "Tests if one or more occupancy sensors are reporting a space as occupied."
related_conditions:
  - occupancy.is_not_detected
---

The **Occupancy is detected** condition passes when one or more occupancy sensors are reporting a space as occupied. Use it in an automation to only run actions when a room or area is currently in use, like adjusting the climate only while someone is there.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Occupancy is detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more occupancy entities, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set how long one or more sensors must be reporting the space as occupied before the condition passes. Leave it at zero for the condition to pass as soon as the space becomes occupied.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple occupancy sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is reporting the space as occupied, or **All** to pass only when every sensor is reporting the space as occupied.
For at least:
  description: How long one or more sensors must be continuously reporting the space as occupied before the condition passes. The default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `occupancy.is_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: occupancy.is_detected
  target:
    entity_id: binary_sensor.occupancy_living_room
  options:
    for: "00:05:00"
{% endexample %}

This passes when the entity `binary_sensor.occupancy_living_room` has been continuously reporting the room as occupied for 5 minutes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple occupancy sensors are targeted, controls how results combine. Accepts `any` or `all`.
  required: false
  type: string
  default: any
for:
  description: >
    How long one or more occupancy sensors must be continuously reporting the space as occupied before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Occupancy sensors are useful for rooms where people may be sitting still, such as a living room, office, or bedroom. They typically combine motion with other signals to keep reporting the space as occupied while someone is present.
- Use **For at least** to avoid reacting to brief or accidental triggers, such as someone passing through a doorway.
- Combine the **All** behavior with multiple sensors to confirm that an entire larger space is occupied.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: keep the living room warm when it is occupied in the evening

In the evening, if the living room is currently occupied, this automation sets the living room thermostat to a comfortable temperature.

- **Trigger**: Time (at 19:00)
- **Condition**: Occupancy is detected
  - **Target**: Living room occupancy sensor
- **Action**: Set temperature (21 °C)
  - **Target**: Living room thermostat

{% details "YAML example for warming the living room in the evening if occupied" %}

{% example %}
automation: |
  alias: "Warm the living room in the evening if occupied"
  triggers:
    - trigger: time
      at: "19:00:00"
  conditions:
    - condition: occupancy.is_detected
      target:
        entity_id: binary_sensor.occupancy_living_room
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: 21
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
