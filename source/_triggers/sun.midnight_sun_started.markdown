---
title: "Midnight sun started"
trigger: sun.midnight_sun_started
domain: sun
description: "Triggers when the midnight sun period starts and the sun stops setting."
related_triggers:
  - sun.midnight_sun_ended
  - sun.polar_night_started
  - sun.sunset
---

The **Midnight sun started** trigger fires when the midnight sun period begins, the part of the year at high latitudes when the sun stays above the horizon for a full 24 hours and stops setting. Home Assistant calculates this for your [home location](/docs/configuration/basic/).

Use it to switch to a bright-season setup for the weeks ahead. For example, turn on a routine that keeps blackout blinds closed at night, or send yourself a reminder that the sun will not set for a while.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Midnight sun started**.
5. Optionally, set an offset to fire before or after the midnight sun starts:
   - Under **Offset**, enter how far from the start of the midnight sun to fire, such as 1 day.
   - Under **Offset type**, select **Before** or **After**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: The length of time from the start of the midnight sun when the trigger fires, in days, hours, minutes, and seconds. By default there is no offset, so the trigger fires exactly when the midnight sun starts.
Offset type:
  description: |
    Whether the offset applies before or after the midnight sun starts:

    - **Before**: fires the offset amount before the midnight sun starts. This is the default.
    - **After**: fires the offset amount after the midnight sun starts.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.midnight_sun_started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.midnight_sun_started
{% endexample %}

This fires when the midnight sun period starts. To fire a fixed amount of time before or after it starts, add the `offset` and `offset_type` options:

{% example %}
trigger: |
  trigger: sun.midnight_sun_started
  options:
    offset:
      days: 1
    offset_type: before
{% endexample %}

This fires one day before the midnight sun starts.

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The length of time from the start of the midnight sun when the trigger fires. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. Combine it with `offset_type` to fire before or after the midnight sun starts.
  required: false
  type: time
  default: "00:00:00"
offset_type:
  description: >
    Whether the offset applies before or after the midnight sun starts. Accepts `before` or `after`.
  required: false
  type: string
  default: before
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- The midnight sun only happens at high latitudes, roughly above the polar circles. Elsewhere, this trigger never fires.
- The midnight sun starts when the sun's daily low point, at solar midnight, first stays above the horizon. From then until it ends, [Sunrise](/triggers/sun.sunrise/) and [Sunset](/triggers/sun.sunset/) do not fire.
- To react when the midnight sun period is over and the sun sets again, use [Midnight sun ended](/triggers/sun.midnight_sun_ended/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. Because the midnight sun happens at most once a year, test the automation by temporarily switching to a trigger you can control while you build the rest of it.

{% include triggers/more_examples.md %}

### Automation: remind you to prepare for bright nights

When the midnight sun period starts, send a notification so you can get ready for weeks without a sunset.

- **Trigger**: Midnight sun started
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a midnight sun reminder" %}

{% example %}
automation: |
  alias: "Notify when the midnight sun starts"
  triggers:
    - trigger: sun.midnight_sun_started
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The midnight sun has started. The sun will not set for a while.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
