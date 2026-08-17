---
title: "Dawn"
trigger: sun.dawn
domain: sun
description: "Triggers at dawn, when civil, nautical, or astronomical twilight begins."
related_triggers:
  - sun.dusk
  - sun.sunrise
  - sun.elevation_crossed_threshold
---

The **Dawn** trigger fires at dawn, the moment the morning twilight begins and the sky starts to brighten before the sun rises. You choose how dark "dawn" is with the twilight type: civil, nautical, or astronomical. Home Assistant calculates the exact time for every day from your [home location](/docs/configuration/basic/).

Use it to start a gentle wake-up routine, raise blinds before the sun is up, or switch off lights that ran through the night, all timed to the first light rather than a fixed clock time.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Dawn**.
5. Under **Twilight type**, select **Civil**, **Nautical**, or **Astronomical** to choose how dark the start of dawn is.
6. Optionally, set an offset to fire before or after dawn:
   - Under **Offset**, enter how far from dawn to fire, such as 30 minutes.
   - Under **Offset type**, select **Before** or **After**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Twilight type:
  description: |
    The phase of twilight that marks the start of dawn:

    - **Civil**: the sun is 6° below the horizon. The brightest twilight, with enough light for most outdoor activities. This is the default.
    - **Nautical**: the sun is 12° below the horizon. The horizon is still faintly visible at sea.
    - **Astronomical**: the sun is 18° below the horizon. The sky is, for most purposes, fully dark.
Offset:
  description: The length of time from dawn when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly at dawn.
Offset type:
  description: |
    Whether the offset applies before or after dawn:

    - **Before**: fires the offset amount before dawn. This is the default.
    - **After**: fires the offset amount after dawn.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.dawn`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.dawn
{% endexample %}

This fires at civil dawn every day. To pick a different twilight phase, add the `type` option:

{% example %}
trigger: |
  trigger: sun.dawn
  options:
    type: astronomical
{% endexample %}

To fire a fixed amount of time before or after dawn, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.dawn
  options:
    offset:
      minutes: 30
    offset_type: after
{% endexample %}

This fires 30 minutes after civil dawn every day.

### Options in YAML

{% options_yaml %}
type:
  description: >
    The phase of twilight that marks the start of dawn. Accepts `civil` (sun 6° below the horizon), `nautical` (12° below), or `astronomical` (18° below).
  required: false
  type: string
  default: civil
offset:
  description: >
    The length of time from dawn when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after dawn.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after dawn. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Dawn always happens before sunrise. Astronomical dawn is the earliest, then nautical, then civil, then [Sunrise](/triggers/sun.sunrise/).
- The length of twilight changes through the year and with your latitude. Near the poles, a twilight phase can fail to occur on some days. When that happens, the trigger does not fire for that day.
- For the matching moment in the evening, use [Dusk](/triggers/sun.dusk/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next dawn, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: raise the bedroom blinds at dawn

When civil dawn breaks, raise the bedroom blinds so the room wakes up with the morning light.

- **Trigger**: Dawn
  - **Twilight type**: Civil
- **Action**: Open cover
  - **Target**: Bedroom blinds

{% details "YAML example for raising blinds at dawn" %}

{% example %}
automation: |
  alias: "Raise bedroom blinds at dawn"
  triggers:
    - trigger: sun.dawn
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
