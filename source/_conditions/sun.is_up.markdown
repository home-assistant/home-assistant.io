---
title: "Sun is up"
condition: sun.is_up
domain: sun
description: "Tests if the sun is up."
related_conditions:
  - sun.is_set
  - sun.is_morning_twilight
  - sun.elevation
---

The **Sun is up** condition passes when the sun is above the horizon at your location. Home Assistant works this out from your [home location](/docs/configuration/basic/), so it stays accurate as sunrise and sunset shift through the seasons.

Use it to gate an automation so it only runs during daylight, like skipping the porch light when the sun is already up, or only watering the garden after the sun has risen.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun: Sun is up**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_up`. It has no options:

{% example %}
condition: |
  condition: sun.is_up
{% endexample %}

This passes while the sun is above the horizon.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- "Up" uses the same horizon definition as sunrise and sunset, so the condition flips at exactly those moments. For the opposite check, use [Sun is set](/conditions/sun.is_set/).
- This is a point-in-time check. It reflects whether the sun is up at the moment the automation runs, not whether it rose or set.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only turn on the porch light after dark

When motion is detected at the front door, turn on the porch light, but only when the sun is down.

- **Trigger**: Motion detected at the front door
- **Condition**: Not
  - **Condition**: Sun: sun is up
- **Action**: Turn on light
  - **Target**: Porch light

{% details "YAML example for motion lighting only after dark" %}

{% example %}
automation: |
  alias: "Porch light on motion after dark"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
  conditions:
    - condition: not
      conditions:
        - condition: sun.is_up
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
