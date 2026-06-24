---
title: "Sun is set"
condition: sun.is_set
domain: sun
description: "Tests if the sun is set."
related_conditions:
  - sun.is_up
  - sun.is_evening_twilight
  - sun.is_night
---

The **Sun is set** condition passes when the sun is below the horizon at your location. Home Assistant works this out from your [home location](/docs/configuration/basic/), so it stays accurate as sunrise and sunset shift through the seasons.

Use it to gate an automation so it only runs after dark, like turning on lights when motion is detected at night, or closing the blinds once the sun has gone down.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun: Sun is set**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_set`. It has no options:

{% example %}
condition: |
  condition: sun.is_set
{% endexample %}

This passes while the sun is below the horizon.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- "Set" means the sun's center is below the horizon, the same moment used for sunrise and sunset. For the opposite check, use [Sun is up](/conditions/sun.is_up/).
- The sun is set during the whole period between sunset and sunrise, including twilight and the dead of night. If you specifically want full darkness, use [It is night](/conditions/sun.is_night/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close the blinds when the sun goes down

When motion is detected in the living room after the sun has set, close the blinds for the evening.

- **Trigger**: Motion detected in the living room
- **Condition**: Sun is set
- **Action**: Close the living room blinds

{% details "YAML example for closing blinds after sunset" %}

{% example %}
automation: |
  alias: "Close blinds after sunset"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_motion
      to: "on"
  conditions:
    - condition: sun.is_set
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
