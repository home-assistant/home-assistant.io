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

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sunset**.
5. Optionally, set an offset to fire before or after sunset:
   - Under **Offset**, enter how far from sunset to fire, such as 30 minutes.
   - Under **Offset type**, select **Before** or **After**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: The length of time from sunset when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly at sunset.
Offset type:
  description: |
    Whether the offset applies before or after sunset:

    - **Before**: fires the offset amount before sunset. This is the default.
    - **After**: fires the offset amount after sunset.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.sunset`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.sunset
{% endexample %}

This fires every day, the moment the sun sets below the horizon. To fire a fixed amount of time before or after sunset, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.sunset
  options:
    offset:
      minutes: 30
    offset_type: before
{% endexample %}

This fires 30 minutes before sunset every day.

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The length of time from sunset when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after sunset.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after sunset. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- To fire a fixed amount of time before or after sunset, set the **Offset** and **Offset type** options. For light-based timing that adapts to the seasons, use [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) instead.
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
