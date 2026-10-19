---
title: "Blue hour started"
trigger: sun.blue_hour_started
domain: sun
description: "Triggers when blue hour starts, in the morning, the evening, or either."
related_triggers:
  - sun.blue_hour_ended
  - sun.golden_hour_started
  - sun.dusk
---

The **Blue hour started** trigger fires when blue hour begins, the deeper part of twilight just before sunrise and just after sunset when the sky takes on a rich blue color. Blue hour is the period when the sun's elevation is between 6° and 4° below the horizon, just below golden hour. You can react to the morning blue hour, the evening one, or both. Home Assistant calculates the exact time for every day from your [home location](/docs/configuration/basic/).

Use it to turn on garden or path lighting as the sky darkens, start a calm evening scene once the sun is well down, or set the mood for the short blue-lit window.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Blue hour started**.
5. Under **Period**, select **Any**, **Morning**, or **Evening**.
6. Optionally, set an offset to fire before or after blue hour starts:
   - Under **Offset**, enter how far from the start of blue hour to fire, such as 10 minutes.
   - Under **Offset type**, select **Before** or **After**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Period:
  description: |
    Which blue hour the trigger reacts to:

    - **Any**: both the morning and the evening blue hour. This is the default.
    - **Morning**: only the blue hour before sunrise, while the sun is rising.
    - **Evening**: only the blue hour after sunset, while the sun is descending.
Offset:
  description: The length of time from the start of blue hour when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when blue hour starts.
Offset type:
  description: |
    Whether the offset applies before or after blue hour starts:

    - **Before**: fires the offset amount before blue hour starts. This is the default.
    - **After**: fires the offset amount after blue hour starts.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.blue_hour_started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.blue_hour_started
{% endexample %}

This fires when either the morning or the evening blue hour starts. To react to only the morning or the evening, add the `period` option:

{% example %}
trigger: |
  trigger: sun.blue_hour_started
  options:
    period: evening
{% endexample %}

To fire a fixed amount of time before or after blue hour starts, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.blue_hour_started
  options:
    period: evening
    offset:
      minutes: 10
    offset_type: before
{% endexample %}

This fires 10 minutes before the evening blue hour starts.

### Options in YAML

{% options_yaml %}
period:
  description: >
    Which blue hour the trigger reacts to. Accepts `any` (both the morning and the evening blue hour), `morning` (the blue hour before sunrise, while the sun is rising), or `evening` (the blue hour after sunset, while the sun is descending).
  required: false
  type: string
  default: any
offset:
  description: >
    The length of time from the start of blue hour when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after blue hour starts.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after blue hour starts. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Blue hour is the period when the sun's elevation is between -6° and -4°. In the morning, it starts as the sun rises to -6°. In the evening, it starts as the sun descends to -4°, where golden hour ends.
- To react to the moment blue hour ends, use [Blue hour ended](/triggers/sun.blue_hour_ended/). For the warmer light just outside blue hour, use [Golden hour started](/triggers/sun.golden_hour_started/).
- The length of blue hour changes through the year and with your latitude. Near the poles, it can last much longer or fail to occur on some days. When it does not occur, the trigger does not fire that day.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next blue hour, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: turn on garden lights when evening blue hour begins

When the evening blue hour starts and the sky turns blue, turn on the garden lights so the yard is lit as it gets dark.

- **Trigger**: Blue hour started
  - **Period**: Evening
- **Action**: Turn on light
  - **Target**: Garden lights

{% details "YAML example for garden lights at blue hour" %}

{% example %}
automation: |
  alias: "Garden lights at evening blue hour"
  triggers:
    - trigger: sun.blue_hour_started
      options:
        period: evening
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garden
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
