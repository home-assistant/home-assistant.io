---
title: "Polar night ended"
trigger: sun.polar_night_ended
domain: sun
description: "Triggers when the polar night period ends and the sun rises again."
related_triggers:
  - sun.polar_night_started
  - sun.midnight_sun_ended
  - sun.sunrise
---

The **Polar night ended** trigger fires when the polar night period is over and the sun climbs back above the horizon around midday. The polar night is the part of the year at high latitudes when the sun stays below the horizon for a full 24 hours. Home Assistant calculates this for your [home location](/docs/configuration/basic/).

Use it to switch back to your normal day-and-night setup. For example, re-enable automations that depend on sunrise, or send yourself a reminder that daylight is returning.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Polar night ended**.
5. Optionally, set an offset to fire before or after the polar night ends:
   - Under **Offset**, enter how far from the end of the polar night to fire, such as 1 day.
   - Under **Offset type**, select **Before** or **After**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: The length of time from the end of the polar night when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when the polar night ends.
Offset type:
  description: |
    Whether the offset applies before or after the polar night ends:

    - **Before**: fires the offset amount before the polar night ends. This is the default.
    - **After**: fires the offset amount after the polar night ends.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.polar_night_ended`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.polar_night_ended
{% endexample %}

This fires when the polar night period ends. To fire a fixed amount of time before or after it ends, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.polar_night_ended
  options:
    offset:
      days: 1
    offset_type: after
{% endexample %}

This fires one day after the polar night ends.

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The length of time from the end of the polar night when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after the polar night ends.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after the polar night ends. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- The polar night only happens at high latitudes, roughly above the polar circles. Elsewhere, this trigger never fires.
- The polar night ends when the sun's daily high point, at solar noon, rises above the horizon again for the first time. From then on, [Sunrise](/triggers/sun.sunrise/) and [Sunset](/triggers/sun.sunset/) resume.
- To react when the polar night period begins, use [Polar night started](/triggers/sun.polar_night_started/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. Because the polar night happens at most once a year, test the automation by temporarily switching to a trigger you can control while you build the rest of it.

{% include triggers/more_examples.md %}

### Automation: announce the end of the polar night

When the polar night period ends and the sun climbs above the horizon again, send a notification so you know daylight is returning.

- **Trigger**: Polar night ended
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a polar night ended notification" %}

{% example %}
automation: |
  alias: "Notify when the polar night ends"
  triggers:
    - trigger: sun.polar_night_ended
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The polar night is over. Daylight is returning.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
