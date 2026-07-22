---
title: "Moon phase"
condition: moon.is_phase
domain: moon
description: "Tests if the moon is in a specific phase."
related_conditions:
  - moon.is_waxing
  - moon.is_waning
---

The **Moon phase** condition passes when the moon is currently in the phase you choose, such as full moon or new moon. Home Assistant works the phase out from the date, so it needs no account, no internet connection, and no location.

Use it to gate an automation on the lunar month, for example to only run a scene on the night of a full moon, or to skip a routine unless it is a new moon.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Moon phase**.
5. Under **Phase**, select the phase to test for.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Phase:
  description: |
    The moon phase the condition tests for. Select one of the eight phases, from **New moon** through **Full moon** to **Waning crescent**.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `moon.is_phase`. Set the phase to test for with the `phase` option:

{% example %}
condition: |
  condition: moon.is_phase
  options:
    phase: full_moon
{% endexample %}

This passes while the moon is a full moon.

### Options in YAML

{% options_yaml %}
phase:
  description: >
    The moon phase to test for. Accepts one of `new_moon`, `waxing_crescent`, `first_quarter`, `waxing_gibbous`, `full_moon`, `waning_gibbous`, `last_quarter`, or `waning_crescent`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This condition does not use a target. It checks the moon phase, which is the same everywhere on Earth, so it does not depend on your [home location](/docs/configuration/basic/).
- This is a point-in-time check. It reflects the phase at the moment the automation runs.
- The phase is based on the date, so it changes at most once a day.
- To test the direction the moon is heading rather than a single phase, use [Moon is waxing](/conditions/moon.is_waxing/) or [Moon is waning](/conditions/moon.is_waning/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: full moon garden lights

When motion is detected in the garden after dark, turn on the garden lights, but only on the night of a full moon.

- **Trigger**: State
  - **Entity**: Garden motion binary sensor
  - **To**: On
- **Condition**: Moon phase
  - **Phase**: Full moon
- **Action**: Turn on light
  - **Target**: Garden lights

{% details "YAML example for full moon garden lights" %}

{% example %}
automation: |
  alias: "Full moon garden lights"
  triggers:
    - trigger: state
      entity_id: binary_sensor.garden_motion
      to: "on"
  conditions:
    - condition: moon.is_phase
      options:
        phase: full_moon
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garden
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
