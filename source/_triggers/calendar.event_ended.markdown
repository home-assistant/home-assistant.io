---
title: "Calendar event ended"
trigger: calendar.event_ended
domain: calendar
description: "Triggers when a calendar event ends."
related_triggers:
  - calendar.event_started
---

The **Calendar event ended** trigger fires when a calendar event ends. You can also set up the trigger to fire before or after the end of the event.

Use it to automate actions based on the end of a calendar event.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Calendar event ended**.
5. Under **Targets** (see [Targets](#targets)), select **Add target** and pick what to watch. Select the calendar entity with the event that you want to watch. You can also select a device or a label, for example.
6. Under **Offset**, you can enter the time from the end of the event when the trigger will fire. If you want the trigger to fire at the ending time of the event, skip this step and the next one.
7. If you entered an offset, under **Offset type**, select one of the following:
   - **Before** if you want the trigger to fire before the end of the event.
   - **After** if you want the trigger to fire after the end of the event.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Offset:
  description: The length of time from the end of the event.
  required: false
Offset type:
  description: Whether to trigger before or after the end of the event, if an offset is defined.
  required: false
  default: before
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
    offset_type: after
{% endexample %}

This fires 30 minutes after the end of an event in `calendar.personal`.

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The length of time from the end of the event.
  required: false
  type: time
offset_type:
  description: >
    Whether to trigger before or after the end of the event, if an offset is defined.
  required: false
  default: before
  type: string
{% endoptions_yaml %}

<!-- Keep the "include" below if your integration supports targets -->
{% include triggers/targets.md %}

## Good to know

- Note that calendars are read once every 15 minutes. When testing, make sure you do not plan events less than 15 minutes away from the current time, or your {% term trigger %} might not fire.
- You can also create an automation based on the state of a calendar {% term entity %}.
- A calendar trigger should not generally use automation mode `single` to ensure the trigger can fire when multiple events end at the same time. For example, use `queued` or `parallel` instead.
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
