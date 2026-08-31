---
title: "Polar night started"
trigger: sun.polar_night_started
domain: sun
description: "Triggers when the polar night period starts and the sun stops rising."
related_triggers:
  - sun.polar_night_ended
  - sun.midnight_sun_started
  - sun.sunrise
---

The **Polar night started** trigger fires when the polar night period begins, the part of the year at high latitudes when the sun stays below the horizon for a full 24 hours and stops rising. Home Assistant calculates this for your [home location](/docs/configuration/basic/).

Use it to switch to a dark-season setup for the period ahead. For example, turn on a daylight lamp routine during the day, or send yourself a reminder that the sun will not rise for a while.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Polar night started**.
5. Optionally, set an offset to fire before or after the polar night starts:
   - Under **Offset**, enter how far from the start of the polar night to fire, such as 1 day.
   - Under **Offset type**, select **Before** or **After**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: The length of time from the start of the polar night when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when the polar night starts.
Offset type:
  description: |
    Whether the offset applies before or after the polar night starts:

    - **Before**: fires the offset amount before the polar night starts. This is the default.
    - **After**: fires the offset amount after the polar night starts.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.polar_night_started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.polar_night_started
{% endexample %}

This fires when the polar night period starts. To fire a fixed amount of time before or after it starts, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.polar_night_started
  options:
    offset:
      days: 1
    offset_type: before
{% endexample %}

This fires one day before the polar night starts.

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The length of time from the start of the polar night when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after the polar night starts.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after the polar night starts. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- The polar night only happens at high latitudes, roughly above the polar circles. Elsewhere, this trigger never fires.
- The polar night starts when the sun's daily high point, at solar noon, first stays below the horizon. From then until it ends, [Sunrise](/triggers/sun.sunrise/) and [Sunset](/triggers/sun.sunset/) do not fire, though there can still be some twilight around midday.
- To react when the polar night period is over and the sun rises again, use [Polar night ended](/triggers/sun.polar_night_ended/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. Because the polar night happens at most once a year, test the automation by temporarily switching to a trigger you can control while you build the rest of it.

{% include triggers/more_examples.md %}

### Automation: remind you to prepare for dark days

When the polar night period starts, send a notification so you can get ready for the period without a sunrise.

- **Trigger**: Polar night started
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a polar night reminder" %}

{% example %}
automation: |
  alias: "Notify when the polar night starts"
  triggers:
    - trigger: sun.polar_night_started
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The polar night has started. The sun will not rise for a while.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
