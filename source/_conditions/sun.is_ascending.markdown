---
title: "Sun is ascending"
condition: sun.is_ascending
domain: sun
description: "Tests if the sun is ascending."
related_conditions:
  - sun.is_descending
  - sun.is_up
  - sun.is_morning_twilight
---

The **Sun is ascending** condition passes while the sun is climbing. This happens during the half of the day between solar midnight and solar noon when the sun's elevation is increasing. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to tell morning apart from afternoon without picking a clock time. For example, run a routine only while the sun is on its way up, regardless of the season.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun is ascending**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_ascending`. It has no options:

{% example %}
condition: |
  condition: sun.is_ascending
{% endexample %}

This passes while the sun is rising toward solar noon.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Ascending covers the whole rising half of the day, from solar midnight up to solar noon, including the hours before sunrise. It is not limited to daylight. Combine it with [Sun is up](/conditions/sun.is_up/) if you only want the rising daytime hours.
- For the opposite half of the day, use [Sun is descending](/conditions/sun.is_descending/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: morning blinds only while the sun is rising

When the living room brightens past a threshold, raise the blinds, but only while the sun is still climbing, so an equally bright evening does not trigger it.

- **Trigger**: Living room illuminance rises above a threshold
- **Condition**: Sun is ascending
- **Action**: Open cover
  - **Target**: Living room blinds

{% details "YAML example for morning-only blinds" %}

{% example %}
automation: |
  alias: "Raise blinds on a bright morning"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.living_room_illuminance
      above: 5000
  conditions:
    - condition: sun.is_ascending
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
