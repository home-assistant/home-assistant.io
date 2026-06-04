---
title: "Occupancy is not detected"
condition: occupancy.is_not_detected
domain: occupancy
description: "Tests if one or more occupancy sensors are reporting a space as not occupied."
related_conditions:
  - occupancy.is_detected
---

The **Occupancy is not detected** condition passes when one or more occupancy sensors are reporting a space as not occupied. Use it in an automation to only run actions when a room or area is empty, like turning off devices or starting a clean-up routine.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Occupancy is not detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more occupancy entities, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set how long one or more sensors must be reporting the space as not occupied before the condition passes. Leave it at zero for the condition to pass as soon as the space becomes empty.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple occupancy sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is reporting the space as not occupied, or **All** to pass only when every sensor is reporting the space as not occupied.
For at least:
  description: How long one or more sensors must be continuously reporting the space as not occupied before the condition passes. The default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `occupancy.is_not_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: occupancy.is_not_detected
  target:
    entity_id: binary_sensor.occupancy_office
  options:
    for: "00:30:00"
{% endexample %}

This passes when the sensor `binary_sensor.occupancy_office` has been continuously reporting the office as not occupied for 30 minutes.

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
    How long one or more occupancy sensors must be continuously reporting the space as not occupied before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Use **For at least** to make sure a room has truly been empty before running actions, so a brief absence does not trigger the automation.
- For larger spaces, combine multiple occupancy sensors with the **All** behavior to confirm that the entire space is empty.
- Pair with time conditions to avoid running clean-up actions during the night, when occupancy sensors may report rooms as empty even though people are sleeping.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: pause the playroom speaker when no one is around

When the playroom has been empty for 10 minutes, this automation pauses the playroom speaker.

- **Trigger**: Time pattern (every 5 minutes)
- **Condition**: Occupancy is not detected
  - **Target**: Playroom occupancy sensor
  - **For at least**: 00:10:00
- **Action**: Media player pause
  - **Target**: Playroom speaker

{% details "YAML example for pausing the playroom speaker when empty" %}

{% example %}
automation: |
  alias: "Pause playroom speaker when empty"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: occupancy.is_not_detected
      target:
        entity_id: binary_sensor.occupancy_playroom
      options:
        for: "00:10:00"
  actions:
    - action: media_player.media_pause
      target:
        entity_id: media_player.playroom_speaker
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
