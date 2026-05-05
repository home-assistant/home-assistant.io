---
title: "Calendar event is active"
condition: calendar.is_event_active
domain: calendar
description: "Tests if one or more calendars have an active event."
---

The **Calendar event is active** condition passes when a calendar {% term entity %} has an active event. Use it to gate an automation so it only runs when a specific calendar event has started.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Calendar event is active**.
5. Under **Targets**, select the light entity, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
1. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple calendars are targeted, controls how results combine. Pick **Any** to pass if at least one targeted calendar has an active event, or **All** to pass only when every calendar has an active event.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `calendar.is_event_active`. A basic example looks like this:

{% example %}
condition: |
  condition: calendar.is_event_active
  target:
    entity_id: calendar.my_calendar
{% endexample %}

This passes when an event of my_calendar is active.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple calendars are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send reminder for a sunset run if no calendar event is active

Before sunset, if there is not an active event in the calendar, this automation sends a notification to the mobile phone with a reminder to go for a sunset run.

- **Trigger**: Sun
- **Condition**: Calendar event is active
- **Action**: Notifications: Send notification via mobile_app

{% details "YAML example for sending reminder for sunset run if no calendar event is active" %}

{% example %}
automation: |
  alias: "Send reminder for a sunset run if no calendar event is active"
  triggers:
    - trigger: sun
    event: sunset
    offset: 0
  conditions:
    - condition: calendar.is_event_active
    target:
      entity_id: calendar.my_calendar
  actions:
    - action: notify.mobile_app
    data:
      message: Let´s go for a sunset run!
mode: single
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
