---
title: "It is polar night"
condition: sun.is_polar_night
domain: sun
description: "Tests if it is polar night."
related_conditions:
  - sun.is_midnight_sun
  - sun.is_night
  - sun.is_set
---

The **It is polar night** condition passes during the polar night, the part of the year at high latitudes when the sun stays below the horizon for a full 24 hours and never rises. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to adapt automations that normally rely on the sun coming up. For example, run a daylight lamp through the dark season, or keep indoor lights on during the day when the sun never rises.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **It is polar night**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_polar_night`. It has no options:

{% example %}
condition: |
  condition: sun.is_polar_night
{% endexample %}

This passes only while the sun stays below the horizon around the clock.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- The polar night only happens at high latitudes, roughly above the polar circles, during the local winter. Away from the poles, this condition never passes.
- This condition follows the sun's daily high, at solar noon: it passes while that midday high stays below the horizon, and turns off at the solar noon when the high rises above it again. On a full polar-night day the sun never crosses the horizon, so [Sunrise](/triggers/sun.sunrise/) and [Sunset](/triggers/sun.sunset/) do not fire and [Sun is up](/conditions/sun.is_up/) does not pass.
- On the day the polar night ends, the sun can briefly clear the horizon around midday before the condition turns off at solar noon. Even during the polar night, there can still be twilight around midday when the sun is just below the horizon.
- For the opposite time of year, when the sun stays above the horizon all day, use [It is midnight sun](/conditions/sun.is_midnight_sun/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run a daylight lamp during the polar night

When morning comes during the polar night, turn on a bright daylight lamp so the room has some light even though the sun does not rise.

- **Trigger**: Time is 8:00 AM
- **Condition**: It is polar night
- **Action**: Turn on light
  - **Target**: Daylight lamp

{% details "YAML example for a daylight lamp during the polar night" %}

{% example %}
automation: |
  alias: "Daylight lamp during the polar night"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: sun.is_polar_night
  actions:
    - action: light.turn_on
      target:
        entity_id: light.daylight_lamp
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
