---
title: "Blue hour ended"
trigger: sun.blue_hour_ended
domain: sun
description: "Triggers when blue hour ends, in the morning, the evening, or either."
related_triggers:
  - sun.blue_hour_started
  - sun.golden_hour_ended
  - sun.dusk
---

The **Blue hour ended** trigger fires when blue hour is over, the deep-blue twilight just before sunrise and just after sunset. Blue hour is the period when the sun's elevation is between 6° and 4° below the horizon, just below golden hour. You can react to the end of the morning blue hour, the evening one, or both. Home Assistant calculates the exact time for every day from your [home location](/docs/configuration/basic/).

Use it to switch to a full night setup once the evening sky is dark, or to wind down overnight lighting in the morning as the blue hour gives way to the golden light before sunrise.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Blue hour ended**.
5. Under **Period**, select **Any**, **Morning**, or **Evening**.
6. Optionally, set an offset to fire before or after blue hour ends:
   - Under **Offset**, enter how far from the end of blue hour to fire, such as 10 minutes.
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
  description: The length of time from the end of blue hour when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when blue hour ends.
Offset type:
  description: |
    Whether the offset applies before or after blue hour ends:

    - **Before**: fires the offset amount before blue hour ends. This is the default.
    - **After**: fires the offset amount after blue hour ends.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.blue_hour_ended`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.blue_hour_ended
{% endexample %}

This fires when either the morning or the evening blue hour ends. To react to only the morning or the evening, add the `period` option:

{% example %}
trigger: |
  trigger: sun.blue_hour_ended
  options:
    period: evening
{% endexample %}

To fire a fixed amount of time before or after blue hour ends, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.blue_hour_ended
  options:
    period: evening
    offset:
      minutes: 10
    offset_type: after
{% endexample %}

This fires 10 minutes after the evening blue hour ends.

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
    The length of time from the end of blue hour when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after blue hour ends.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after blue hour ends. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Blue hour is the period when the sun's elevation is between -6° and -4°. In the morning, it ends as the sun rises past -4°, where golden hour begins. In the evening, it ends as the sun descends past -6°.
- To react to the moment blue hour starts, use [Blue hour started](/triggers/sun.blue_hour_started/). After the evening blue hour ends, the sky keeps darkening through the later twilight phases before it is fully dark. To check for those, use [It is evening twilight](/conditions/sun.is_evening_twilight/) or [It is night](/conditions/sun.is_night/) as a condition.
- The length of blue hour changes through the year and with your latitude. Near the poles, it can last much longer or fail to occur on some days. When it does not occur, the trigger does not fire on that day.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next blue hour, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: close the blinds when evening blue hour ends

When the evening blue hour ends and the sky goes dark, close the living room blinds for the night.

- **Trigger**: Blue hour ended
  - **Period**: Evening
- **Action**: Close cover
  - **Target**: Living room blinds

{% details "YAML example for closing blinds after blue hour" %}

{% example %}
automation: |
  alias: "Close blinds after evening blue hour"
  triggers:
    - trigger: sun.blue_hour_ended
      options:
        period: evening
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
