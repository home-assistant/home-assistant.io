---
title: "Sun is descending"
condition: sun.is_descending
domain: sun
description: "Tests if the sun is descending."
related_conditions:
  - sun.is_ascending
  - sun.is_set
  - sun.is_evening_twilight
---

The **Sun is descending** condition passes while the sun is sinking. This happens during the half of the day between solar noon and solar midnight when the sun's elevation is decreasing. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to tell afternoon and evening apart from the morning without picking a clock time. For example, run a routine only while the sun is on its way down, regardless of the season.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun is descending**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_descending`. It has no options:

{% example %}
condition: |
  condition: sun.is_descending
{% endexample %}

This passes while the sun is sinking toward solar midnight.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Descending covers the whole sinking half of the day, from solar noon down to solar midnight, including the hours after sunset. It is not limited to daylight. Combine it with [Sun is up](/conditions/sun.is_up/) if you only want the descending daytime hours.
- For the opposite half of the day, use [Sun is ascending](/conditions/sun.is_ascending/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: lower the awning only in the afternoon

When the patio gets hot, lower the awning, but only while the sun is descending, so it reacts to the afternoon sun rather than a warm morning.

- **Trigger**: Patio temperature rises above a threshold
- **Condition**: Sun is descending
- **Action**: Close cover
  - **Target**: Patio awning

{% details "YAML example for afternoon-only awning" %}

{% example %}
automation: |
  alias: "Lower awning on a hot afternoon"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.patio_temperature
      above: 28
  conditions:
    - condition: sun.is_descending
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.patio_awning
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
