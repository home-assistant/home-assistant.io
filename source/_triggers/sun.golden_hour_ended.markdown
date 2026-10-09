---
title: "Golden hour ended"
trigger: sun.golden_hour_ended
domain: sun
description: "Triggers when golden hour ends, in the morning, the evening, or either."
related_triggers:
  - sun.golden_hour_started
  - sun.blue_hour_ended
  - sun.sunset
---

The **Golden hour ended** trigger fires when golden hour is over, the warm, low-light time around sunrise and sunset. Golden hour is the period when the sun's elevation is between 4° below the horizon and 6° above it. You can react to the end of the morning golden hour, the evening one, or both. Home Assistant calculates the exact time for every day from your [home location](/docs/configuration/basic/).

Use it to close a warm evening scene as the light fades, switch to normal indoor lighting after sunset, or open the blinds once the low morning sun has climbed higher.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Golden hour ended**.
5. Under **Period**, select **Any**, **Morning**, or **Evening**.
6. Optionally, set an offset to fire before or after golden hour ends:
   - Under **Offset**, enter how far from the end of golden hour to fire, such as 15 minutes.
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
  description: The length of time from the end of golden hour when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when golden hour ends.
Offset type:
  description: |
    Whether the offset applies before or after golden hour ends:

    - **Before**: fires the offset amount before golden hour ends. This is the default.
    - **After**: fires the offset amount after golden hour ends.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.golden_hour_ended`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.golden_hour_ended
{% endexample %}

This fires when either the morning or the evening golden hour ends. To react to only the morning or the evening, add the `period` option:

{% example %}
trigger: |
  trigger: sun.golden_hour_ended
  options:
    period: evening
{% endexample %}

To fire a fixed amount of time before or after golden hour ends, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.golden_hour_ended
  options:
    period: evening
    offset:
      minutes: 15
    offset_type: after
{% endexample %}

This fires 15 minutes after the evening golden hour ends.

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
    The length of time from the end of golden hour when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after golden hour ends.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after golden hour ends. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Golden hour is the period when the sun's elevation is between -4° and 6°. In the morning, it ends as the sun rises past 6°. In the evening, it ends as the sun descends past -4°, where blue hour begins.
- To react to the moment golden hour starts, use [Golden hour started](/triggers/sun.golden_hour_started/). For the deeper twilight just after evening golden hour, use [Blue hour started](/triggers/sun.blue_hour_started/).
- The length of golden hour changes through the year and with your latitude. Near the poles, it can last much longer or fail to occur on some days. When it does not occur, the trigger does not fire on that day.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next golden hour, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: turn on indoor lights when evening golden hour ends

When the evening golden hour ends and the warm light fades, turn on the indoor lights so the room stays comfortably lit into the evening.

- **Trigger**: Golden hour ended
  - **Period**: Evening
- **Action**: Turn on light
  - **Target**: Living room lights

{% details "YAML example for indoor lights after golden hour" %}

{% example %}
automation: |
  alias: "Indoor lights after evening golden hour"
  triggers:
    - trigger: sun.golden_hour_ended
      options:
        period: evening
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
