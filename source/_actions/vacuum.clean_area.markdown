---
title: Clean area
action: vacuum.clean_area
domain: vacuum
description: "Cleans specific mapped areas using vacuum segments."
---

The **Clean area with vacuum cleaner** action sends your vacuum to clean one or more mapped Home Assistant areas.

Use it when only part of the home needs attention, like the kitchen after dinner or the hallway after muddy shoes, without sending the robot through every room.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Clean area with vacuum cleaner**.
4. Select your vacuum entity.
5. In **Areas**, choose one or more mapped Home Assistant areas.
6. Save the automation.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.clean_area
  target:
    entity_id: vacuum.cleaner
  cleaning_area_id:
    - living_room
    - kitchen
{% endexample %}

This sends `vacuum.cleaner` to clean the `living_room` and `kitchen` areas.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum to send to specific areas.
  required: true
  type: map
cleaning_area_id:
  description: The areas to clean. Use Home Assistant area IDs.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- You must first map vacuum segments to Home Assistant areas in the entity settings.
- If mapping or area selection does not appear, your vacuum does not support this feature.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clean the kitchen and dining room after dinner

After dinner, this automation checks whether anyone is still in the kitchen. If the room is empty, it sends the vacuum only to the areas that usually need attention.

- **Trigger**: Time: 20:30
- **Condition**: Kitchen presence sensor is off
- **Action**: Clean area
- **Target**: Main vacuum
- **Area**: Kitchen, dining room

{% details "YAML example for a targeted after-dinner cleanup" %}

{% example %}
automation: |
  alias: "After dinner vacuum cleanup"
  triggers:
    - trigger: time
      at: "20:30:00"
  conditions:
    - condition: state
      entity_id: binary_sensor.kitchen_occupancy
      state: "off"
  actions:
    - action: vacuum.clean_area
      target:
        entity_id: vacuum.main_floor
      cleaning_area_id:
        - kitchen
        - dining_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
