---
title: "Calendar event started"
trigger: calendar.event_started
domain: calendar
description: "Triggers when one or more calendar events start."
related_triggers:
  - calendar.event_ended
---

The **Calendar event started** trigger fires when a calendar event starts. You can also set up the trigger to fire before or after the start of the event.

Use it to automate actions based on the start of a calendar event.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Calendar event started**.
5. Under **Targets** (see [Targets](#targets)), select **Add target** and pick what to watch. Select the calendar entity with the event that you want to watch. You can also select a device or a label, for example.
6. Optionally, set an offset to fire before or after the start of the event:
   - Under **Offset**, select **Before** or **After**.
   - Under **Duration**, enter how far from the start of the event to fire, such as 15 minutes.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: |
    Whether to fire before or after the start of the event:

    - **No offset**: fires exactly when the event starts. This is the default.
    - **Before**: fires the duration you enter before the start of the event.
    - **After**: fires the duration you enter after the start of the event.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `calendar.event_started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: calendar.event_started
  target:
    entity_id: calendar.personal
  options:
    offset:
      hours: -1
      minutes: -15
      seconds: -5
      days: -1
{% endexample %}

This fires 1 day, 1 hour, 15 minutes and 5 seconds before the start of an event in `calendar.personal`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
offset:
  description: >
    The length of time from the start of the event. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. A negative value, such as `minutes: -30` or `"-00:30:00"`, fires before the start of the event. A positive value fires after.
  required: true
  type: time
{% endoptions_yaml %}

<!-- Keep the "include" below if your integration supports targets -->
{% include triggers/targets.md %}

## Good to know

- Note that calendars are read once every 15 minutes. When testing, make sure you do not plan events less than 15 minutes away from the current time, or your {% term trigger %} might not fire.
- You can also create an automation based on the state of a calendar {% term entity %}.
- A calendar trigger should not generally use automation mode `single` to ensure the trigger can fire when multiple events start at the same time. For example, use `queued` or `parallel` instead. For details about these modes, refer to the [Automation modes](/docs/automation/modes/) page.
- In YAML, you can also set up other variables for calendar triggers. See [Automation Trigger Variables: Calendar](/docs/automation/templating/#calendar) to check the available trigger data.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send notification when a calendar event starts

For the calendar entity `calendar.my_calendar`, at the start of any calendar event, this automation sends a notification that is visible in the notification panel of Home Assistant. This automation allows the start of multiple events at the same time.

- **Trigger**: Calendar event started
- **Action**: Send a persistent notification

{% details "YAML example for sending a calendar event notification" %}

{% example %}
automation: |
  alias: "Calendar notification"
  triggers:
    - trigger: calendar.event_started
      target:
        entity_id: calendar.my_calendar
  actions:
    - action: notify.persistent_notification
      data:
        message: Event started!
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
