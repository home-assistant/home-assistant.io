---
title: "It is midnight sun"
condition: sun.is_midnight_sun
domain: sun
description: "Tests if it is midnight sun."
related_conditions:
  - sun.is_polar_night
  - sun.is_up
  - sun.is_night
---

The **It is midnight sun** condition passes during the midnight sun, the part of the year at high latitudes when the sun stays above the horizon for a full 24 hours and never sets. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to adapt automations that normally rely on the sun setting. For example, keep blackout blinds closed at night through the bright season, or skip an automation that only makes sense once it gets dark outside.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **It is midnight sun**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_midnight_sun`. It has no options:

{% example %}
condition: |
  condition: sun.is_midnight_sun
{% endexample %}

This passes only while the sun stays above the horizon around the clock.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- The midnight sun only happens at high latitudes, roughly above the polar circles, during the local summer. Away from the poles, this condition never passes.
- During the midnight sun, the sun never crosses the horizon, so [Sunrise](/triggers/sun.sunrise/) and [Sunset](/triggers/sun.sunset/) do not fire and [It is night](/conditions/sun.is_night/) does not pass.
- For the opposite time of year, when the sun stays below the horizon all day, use [It is polar night](/conditions/sun.is_polar_night/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: keep the bedroom dark during the midnight sun

When it is bedtime during the midnight sun, close the bedroom blackout blinds so the room stays dark even though the sun is still up.

- **Trigger**: Time is 10:00 PM
- **Condition**: It is midnight sun
- **Action**: Close cover
  - **Target**: Bedroom blackout blinds

{% details "YAML example for closing blinds during the midnight sun" %}

{% example %}
automation: |
  alias: "Close blackout blinds during the midnight sun"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: sun.is_midnight_sun
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_blackout_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
