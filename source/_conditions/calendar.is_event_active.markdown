---
title: "Calendar event is active"
condition: calendar.is_event_active
domain: calendar
description: "Tests if one or more calendars have an active event."
---

The **Calendar event is active** condition passes when a calendar {% term entity %} has an active event. Use it to gate an automation so it only runs when a specific calendar event has started and not yet ended.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Calendar event is active**.
5. Under **Targets**, select a calendar entity, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, set how long the event must be active before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple calendars are targeted, controls how results combine. Pick **Any** to pass if at least one targeted calendar has an active event, or **All** to pass only when every calendar has an active event.
For at least:
  description: How long the event must be active before the condition passes. The default is `0` hours, `00` minutes and `00` seconds.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `calendar.is_event_active`. A basic example looks like this:

{% example %}
condition: |
  condition: calendar.is_event_active
  target:
    entity_id: calendar.my_calendar
{% endexample %}

This passes when an event of `calendar.my_calendar` is active.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple calendars are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the event must be active before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send reminder for a sunset run if no calendar event is active

Half an hour before sunset, if there is not an active event in the calendar, this automation sends a notification to the mobile phone with a reminder to go for a sunset run.

- **Trigger**: Sun
- **Condition**: Calendar event is active
- **Blocks**: Not
- **Action**: Send notification via mobile_app_phone

{% details "YAML example for sending reminder for sunset run if no calendar event is active" %}

{% example %}
automation: |
  alias: "Send reminder for a sunset run if no calendar event is active"
  triggers:
    - trigger: sun
      event: sunset
      offset: "-00:30:00"
  conditions:
    - condition: not
      conditions:
        - condition: calendar.is_event_active
          target:
            entity_id: calendar.my_calendar
  actions:
    - action: notify.mobile_app_phone
      data:
        message: Let's go for a sunset run!
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
