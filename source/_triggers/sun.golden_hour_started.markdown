---
title: "Golden hour started"
trigger: sun.golden_hour_started
domain: sun
description: "Triggers when golden hour starts, in the morning, the evening, or either."
related_triggers:
  - sun.golden_hour_ended
  - sun.blue_hour_started
  - sun.sunset
---

The **Golden hour started** trigger fires when golden hour begins, the time around sunrise and sunset when the sun sits low in the sky and the light turns warm and soft. Golden hour is the period when the sun's elevation is between 4° below the horizon and 6° above it. You can react to the morning golden hour, the evening one, or both. Home Assistant calculates the exact time for every day from your [home location](/docs/configuration/basic/).

Use it to start a warm scene as the light turns golden, dim the indoor lights to match the low sun, or lower the blinds against the glare.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Golden hour started**.
5. Under **Period**, select **Any**, **Morning**, or **Evening**.
6. Optionally, set an offset to fire before or after golden hour starts:
   - Under **Offset**, enter how far from the start of golden hour to fire, such as 15 minutes.
   - Under **Offset type**, select **Before** or **After**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Period:
  description: |
    Which golden hour the trigger reacts to:

    - **Any**: both the morning and the evening golden hour. This is the default.
    - **Morning**: only the golden hour around sunrise, while the sun is rising.
    - **Evening**: only the golden hour around sunset, while the sun is descending.
Offset:
  description: The length of time from the start of golden hour when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when golden hour starts.
Offset type:
  description: |
    Whether the offset applies before or after golden hour starts:

    - **Before**: fires the offset amount before golden hour starts. This is the default.
    - **After**: fires the offset amount after golden hour starts.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.golden_hour_started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.golden_hour_started
{% endexample %}

This fires when either the morning or the evening golden hour starts. To react to only the morning or the evening, add the `period` option:

{% example %}
trigger: |
  trigger: sun.golden_hour_started
  options:
    period: evening
{% endexample %}

To fire a fixed amount of time before or after golden hour starts, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.golden_hour_started
  options:
    period: evening
    offset:
      minutes: 15
    offset_type: before
{% endexample %}

This fires 15 minutes before the evening golden hour starts.

### Options in YAML

{% options_yaml %}
period:
  description: >
    Which golden hour the trigger reacts to. Accepts `any` (both the morning and the evening golden hour), `morning` (the golden hour around sunrise, while the sun is rising), or `evening` (the golden hour around sunset, while the sun is descending).
  required: false
  type: string
  default: any
offset:
  description: >
    The length of time from the start of golden hour when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after golden hour starts.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after golden hour starts. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Golden hour is the period when the sun's elevation is between -4° and 6°. In the morning, it starts as the sun rises to -4°. In the evening, it starts as the sun descends to 6°.
- To react to the moment golden hour ends, use [Golden hour ended](/triggers/sun.golden_hour_ended/). For the deeper twilight just outside golden hour, use [Blue hour started](/triggers/sun.blue_hour_started/).
- The length of golden hour changes through the year and with your latitude. Near the poles, it can last much longer or fail to occur on some days. When it does not occur, the trigger does not fire that day.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next golden hour, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: set a warm scene when evening golden hour begins

When the evening golden hour starts, turn on the living room lamps at a warm color so the room glows with the low sun.

- **Trigger**: Golden hour started
  - **Period**: Evening
- **Action**: Turn on light
  - **Target**: Living room lamps

{% details "YAML example for a warm scene at golden hour" %}

{% example %}
automation: |
  alias: "Warm scene at evening golden hour"
  triggers:
    - trigger: sun.golden_hour_started
      options:
        period: evening
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lamps
      data:
        color_temp_kelvin: 2700
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
