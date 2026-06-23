---
title: "Sunset"
trigger: sun.sunset
domain: sun
description: "Triggers when the sun sets."
related_triggers:
  - sun.sunrise
  - sun.dusk
  - sun.elevation_crossed_threshold
---

The **Sunset** trigger fires the moment the sun sets below the horizon at your location. Home Assistant calculates the exact time for every day of the year from your [home location](/docs/configuration/basic/), so the trigger stays accurate as sunset shifts through the seasons.

Use it to turn on lights, close blinds, or arm an evening routine the moment the day ends.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sun: Sunset**.
5. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.sunset`. It has no options:

{% example %}
trigger: |
  trigger: sun.sunset
{% endexample %}

This fires every day, the moment the sun sets below the horizon.

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- The trigger fires exactly at sunset. To fire a fixed amount of time before or after sunset, use the classic [sun trigger](/integrations/sun/#automation-trigger), which accepts an offset. For light-based timing that adapts to the seasons, use [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) instead.
- To react to the last light after sunset, use [Dusk](/triggers/sun.dusk/). To react when the sun comes up, use [Sunrise](/triggers/sun.sunrise/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next sunset, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: turn on the porch light at sunset

When the sun sets, turn on the porch light so the entrance stays lit through the evening.

- **Trigger**: Sunset
- **Action**: Turn on light
  - **Target**: Porch light

{% details "YAML example for turning on a light at sunset" %}

{% example %}
automation: |
  alias: "Turn on porch light at sunset"
  triggers:
    - trigger: sun.sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
