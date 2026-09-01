---
title: "Sunrise"
trigger: sun.sunrise
domain: sun
description: "Triggers when the sun rises."
related_triggers:
  - sun.sunset
  - sun.dawn
  - sun.elevation_crossed_threshold
---

The **Sunrise** trigger fires the moment the sun rises above the horizon at your location. Home Assistant calculates the exact time for every day of the year from your [home location](/docs/configuration/basic/), so the trigger stays accurate as sunrise shifts through the seasons.

Use it to open blinds, turn off outdoor or night lighting, or start your morning routine the moment the day begins.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Sunrise**.
5. Optionally, set an offset to fire before or after sunrise:
   - Under **Offset**, enter how far from sunrise to fire, such as 30 minutes.
   - Under **Offset type**, select **Before** or **After**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: The length of time from sunrise when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly at sunrise.
Offset type:
  description: |
    Whether the offset applies before or after sunrise:

    - **Before**: fires the offset amount before sunrise. This is the default.
    - **After**: fires the offset amount after sunrise.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.sunrise`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.sunrise
{% endexample %}

This fires every day, the moment the sun rises above the horizon. To fire a fixed amount of time before or after sunrise, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.sunrise
  options:
    offset:
      minutes: 30
    offset_type: after
{% endexample %}

This fires 30 minutes after sunrise every day.

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The length of time from sunrise when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after sunrise.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after sunrise. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- To fire a fixed amount of time before or after sunrise, set the **Offset** and **Offset type** options. For light-based timing that adapts to the seasons, use [Sun elevation crossed threshold](/triggers/sun.elevation_crossed_threshold/) instead.
- To react to the first light before sunrise, use [Dawn](/triggers/sun.dawn/). To react when the sun goes down, use [Sunset](/triggers/sun.sunset/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next sunrise, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: open the living room blinds at sunrise

When the sun rises, open the living room blinds so the room fills with daylight.

- **Trigger**: Sunrise
- **Action**: Open cover
  - **Target**: Living room blinds

{% details "YAML example for opening blinds at sunrise" %}

{% example %}
automation: |
  alias: "Open living room blinds at sunrise"
  triggers:
    - trigger: sun.sunrise
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
