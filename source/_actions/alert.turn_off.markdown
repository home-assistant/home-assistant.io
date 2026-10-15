---
title: "Acknowledge alert"
action: alert.turn_off
domain: alert
description: "Acknowledges an alert, so it stops sending notifications."
related_actions:
  - alert.turn_on
  - alert.toggle
---

Use this action to acknowledge an [alert](/integrations/alert/). The alert stops sending repeating notifications, even though the problem it warns about is still there. For example, you know the garage door is open, and you don't need more reminders.

An acknowledged alert has the state `off`. Selecting the toggle of the alert entity on a dashboard does the same.

{% include actions/ui_header.md %}

To acknowledge an alert from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Turn off**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alert. You can also select an area, a device, or a label.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alert.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: alert.turn_off
  target:
    entity_id: alert.garage_door
{% endexample %}

This acknowledges the `alert.garage_door` alert.

### Options in YAML

This action has no additional options in YAML.

{% include actions/targets.md %}

## Good to know

- An acknowledgement only lasts while the alert is active. The next time the alert starts, it sends notifications again.
- When the problem is resolved, you still get the done message, if the alert has one.
- If the alert is set up with `can_acknowledge: false`, it can't be acknowledged, and this action fails with an error.
- To start the notifications again, use [Turn on alert](/actions/alert.turn_on/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: acknowledge an alert from a phone notification

Your alert sends a notification with an **Acknowledge** button to your phone. When you select the button, this automation acknowledges the alert, so you don't get more reminders. The notification must include an action with the ID `ACKNOWLEDGE_GARAGE`, see the [Companion app documentation](https://companion.home-assistant.io/docs/notifications/actionable-notifications/).

- **Trigger**: Manual event received
  - **Event type**: `mobile_app_notification_action`
  - **Event data**: `action: ACKNOWLEDGE_GARAGE`
- **Action**: Turn off
  - **Target**: Garage door alert

{% details "YAML example for acknowledging an alert from a phone notification" %}

{% example %}
automation: |
  alias: "Acknowledge the garage door alert from my phone"
  triggers:
    - trigger: event
      event_type: mobile_app_notification_action
      event_data:
        action: ACKNOWLEDGE_GARAGE
  actions:
    - action: alert.turn_off
      target:
        entity_id: alert.garage_door
{% endexample %}

{% enddetails %}

### Automation: silence the garage door alert when you get home

When you get home, you can see whether the garage door is open yourself, so you don't need more reminders. This automation acknowledges the garage door alert when you arrive.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Enter
- **Action**: Turn off
  - **Target**: Garage door alert

{% details "YAML example for silencing an alert when you get home" %}

{% example %}
automation: |
  alias: "Silence the garage door alert when I get home"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: enter
  actions:
    - action: alert.turn_off
      target:
        entity_id: alert.garage_door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
