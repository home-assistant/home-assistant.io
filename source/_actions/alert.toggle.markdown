---
title: "Toggle alert"
action: alert.toggle
domain: alert
description: "Acknowledges an alert, or removes the acknowledgement if it's already acknowledged."
related_actions:
  - alert.turn_off
  - alert.turn_on
---

Use this action to switch an [alert](/integrations/alert/) between acknowledged and not acknowledged. If the alert is sending notifications, it's acknowledged and stops. If it's already acknowledged, it starts sending notifications again.

{% include actions/ui_header.md %}

To toggle an alert from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Toggle**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the alert. You can also select an area, a device, or a label.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alert.toggle`. A basic example looks like this:

{% example %}
action: |
  action: alert.toggle
  target:
    entity_id: alert.garage_door
{% endexample %}

This toggles the `alert.garage_door` alert.

### Options in YAML

This action has no additional options in YAML.

{% include actions/targets.md %}

## Good to know

- An acknowledgement only lasts while the alert is active. The next time the alert starts, it sends notifications again.
- If the alert is set up with `can_acknowledge: false`, toggling it to acknowledged fails with an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle an alert with an NFC tag

Place an NFC tag next to your front door. Scanning it acknowledges the garage door alert, and scanning it again turns the alert back on.

- **Trigger**: Tag
  - **Tag**: Front door tag
- **Action**: Toggle
  - **Target**: Garage door alert

{% details "YAML example for toggling an alert with an NFC tag" %}

{% example %}
automation: |
  alias: "Toggle the garage door alert with the front door tag"
  triggers:
    - trigger: tag
      tag_id: "A7-6B-90-5F"
  actions:
    - action: alert.toggle
      target:
        entity_id: alert.garage_door
{% endexample %}

{% enddetails %}

### Automation: toggle an alert from a phone notification

Your alert notification has a button with the ID `TOGGLE_LEAK_ALERT`. Selecting it switches the water leak alert between acknowledged and active.

- **Trigger**: Manual event received
  - **Event type**: `mobile_app_notification_action`
  - **Event data**: `action: TOGGLE_LEAK_ALERT`
- **Action**: Toggle
  - **Target**: Water leak alert

{% details "YAML example for toggling an alert from a phone notification" %}

{% example %}
automation: |
  alias: "Toggle the water leak alert from my phone"
  triggers:
    - trigger: event
      event_type: mobile_app_notification_action
      event_data:
        action: TOGGLE_LEAK_ALERT
  actions:
    - action: alert.toggle
      target:
        entity_id: alert.water_leak
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
