---
title: "Occupancy cleared"
trigger: occupancy.cleared
domain: occupancy
description: "Triggers when one or more occupancy sensors stop detecting occupancy."
related_triggers:
  - occupancy.detected
---

The **Occupancy cleared** trigger fires when one or more occupancy sensors report that a space is no longer occupied.

Use it to automate actions, such as turning off lights, lowering the heating, or running a clean-up routine, when a room or area becomes empty. Use a single sensor for a specific room and a group of sensors for larger spaces.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Occupancy cleared**.
5. Select **Add target** (see [Targets](#targets)) and pick the occupancy sensor that you want to watch. You can also select an area, a floor, a device, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, you can set how long the sensor must keep reporting the space as empty before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple occupancy sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor stops reporting the space as occupied.
    - **First**: fires only when the first sensor stops reporting the space as occupied.
    - **All**: fires only after every targeted sensor reports the space as no longer occupied.
  required: false
For at least:
  description: How long the sensor or sensors must keep reporting the space as no longer occupied before the trigger fires. The default is zero (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `occupancy.cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: occupancy.cleared
  target:
    entity_id: binary_sensor.occupancy_office
  options:
    for:
      minutes: 15
{% endexample %}

This fires 15 minutes after the sensor entity `binary_sensor.occupancy_office` reports the office as no longer occupied.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple occupancy sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor stops reporting the space as occupied.
    - `first`: fires only when the first sensor stops reporting the space as occupied.
    - `all`: fires only after every targeted sensor reports the space as no longer occupied.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must keep reporting the space as no longer occupied before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use the **For at least** option to avoid turning devices off too quickly when the room briefly registers as empty, like during a short break.
- For larger spaces, combine multiple occupancy sensors and pick **All** so the trigger only fires once the entire space is empty.
- Pair this trigger with conditions, such as time of day, to keep automations from running while someone is asleep or otherwise expected to be in the room.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the office lights and HVAC when the office is empty

When the office occupancy sensor reports the room as empty for 15 minutes, this automation turns off the office lights and HVAC.

- **Trigger**: Occupancy cleared
  - **Target**: Office occupancy sensor
  - **For at least**: 00:15:00
- **Action**: Turn off light (in the office)
- **Action**: Set HVAC mode to off (office HVAC)

{% details "YAML example for turning off the office when empty" %}

{% example %}
automation: |
  alias: "Turn off office lights and HVAC when empty"
  triggers:
    - trigger: occupancy.cleared
      target:
        entity_id: binary_sensor.occupancy_office
      options:
        for:
          minutes: 15
  actions:
    - action: light.turn_off
      target:
        area_id: office
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.hvac_office
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
