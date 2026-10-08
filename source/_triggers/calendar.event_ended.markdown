---
title: "Calendar event ended"
trigger: calendar.event_ended
domain: calendar
description: "Triggers when one or more calendar events end."
related_triggers:
  - calendar.event_started
---

The **Calendar event ended** trigger fires when a calendar event ends. You can also set up the trigger to fire before or after the end of the event.

Use it to automate actions based on the end of a calendar event.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Calendar event ended**.
5. Under **Targets** (see [Targets](#targets)), select **Add target** and pick what to watch. Select the calendar entity with the event that you want to watch. You can also select a device or a label, for example.
6. Optionally, set an offset to fire before or after the end of the event:
   - Under **Offset**, select **Before** or **After**.
   - Under **Duration**, enter how far from the end of the event to fire, such as 15 minutes.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: |
    Whether to fire before or after the end of the event:

    - **No offset**: fires exactly when the event ends. This is the default.
    - **Before**: fires the duration you enter before the end of the event.
    - **After**: fires the duration you enter after the end of the event.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `calendar.event_ended`. A basic example looks like this:

{% example %}
trigger: |
  trigger: calendar.event_ended
  target:
    entity_id: calendar.personal
  options:
    offset:
      minutes: 30
{% endexample %}

This fires 30 minutes after the end of an event in `calendar.personal`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
offset:
  description: >
    The length of time from the end of the event. Accepts a time period mapping in `hours`, `minutes`, `seconds`, and `days`. Also accepts a duration string in `HH:MM:SS` format. A negative value, such as `minutes: -30` or `"-00:30:00"`, fires before the end of the event. A positive value fires after.
  required: true
  type: time
{% endoptions_yaml %}

<!-- Keep the "include" below if your integration supports targets -->
{% include triggers/targets.md %}

## Good to know

- Note that calendars are read once every 15 minutes. When testing, make sure you do not plan events less than 15 minutes away from the current time, or your {% term trigger %} might not fire.
- You can also create an automation based on the state of a calendar {% term entity %}.
- A calendar trigger should not generally use automation mode `single` to ensure the trigger can fire when multiple events end at the same time. For example, use `queued` or `parallel` instead. For details about these modes, refer to the [Automation modes](/docs/automation/modes/) page.
- In YAML, you can also set up other variables for calendar triggers. See [Automation Trigger Variables: Calendar](/docs/automation/templating/#calendar) to check the available trigger data.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off lights after a family gathering

After a scheduled family gathering takes place at home, this automation turns off specific lights in the living room.

- **Trigger**: Calendar event ended
- **Action**: Turn off light

{% details "YAML example for turning off specific lights after a family gathering" %}

{% example %}
automation: |
  alias: "Turn off lights after a family gathering"
  triggers:
    - trigger: calendar.event_ended
      target:
        entity_id: calendar.my_family_events
  actions:
    - action: light.turn_off
      target:
        label_id: cozy_lights_living_room
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
