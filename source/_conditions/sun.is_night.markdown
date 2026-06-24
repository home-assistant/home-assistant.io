---
title: "It is night"
condition: sun.is_night
domain: sun
description: "Tests if it is night."
related_conditions:
  - sun.is_set
  - sun.is_evening_twilight
  - sun.is_morning_twilight
---

The **It is night** condition passes during true darkness: when the sun is 18° or more below the horizon, the point where even astronomical twilight has ended and the sky is fully dark. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it when you want an automation to run only in the dead of night, not merely after sunset. For example, dim status lights to their lowest level, or hold off on noisy tasks until the sky is genuinely dark.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun: It is night**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_night`. It has no options:

{% example %}
condition: |
  condition: sun.is_night
{% endexample %}

This passes only while the sky is fully dark.

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Night here means the sun is at or below -18° elevation (the end of astronomical twilight). This is stricter than [Sun is set](/conditions/sun.is_set/), which passes during twilight as well.
- At high latitudes in summer, the sun may never drop below -18°. On those days this condition never passes. If you need a check that always has a dark period, use [Sun is set](/conditions/sun.is_set/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: dim the hallway night light in the dead of night

When motion is detected in the hallway during full darkness, turn the light on at a low brightness instead of full power.

- **Trigger**: Motion detected in the hallway
- **Condition**: Sun: It is night
- **Action**: Turn on the hallway light at 10% brightness

{% details "YAML example for a dim night light" %}

{% example %}
automation: |
  alias: "Dim hallway light at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: sun.is_night
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 10
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
