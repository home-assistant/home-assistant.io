---
title: "Send a persistent notification"
action: notify.persistent_notification
domain: notify
description: "Sends a notification that is visible in the notifications panel."
related_actions:
  - notify.send_message
  - notify.notify
---

The **Send a persistent notification** action shows a notification in the Home Assistant interface. Use it for messages you want to keep visible in Home Assistant until someone dismisses them.

Persistent notifications are useful for local reminders, maintenance messages, and other information that should stay available in the notifications panel.

{% include actions/ui_header.md %}

To show a persistent notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Send a persistent notification**.
6. In **Message**, enter the notification text.
7. _Optional_: In **Title**, enter a title for the notification.
8. _Optional_: In **Data**, add integration-specific data such as a notification ID.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: Message body of the notification.
  required: true
Title:
  description: Title of the notification.
  required: false
Data:
  description: Additional data for the notification. You can include a `notification_id` to update an existing notification instead of creating a new one.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `notify.persistent_notification`. A basic example looks like this:

{% example %}
action: |
  action: notify.persistent_notification
  data:
    title: "Reminder"
    message: "Check the laundry."
{% endexample %}

This shows a notification in the Home Assistant notifications panel.

### Options in YAML

{% options_yaml %}
message:
  description: >
    Message body of the notification.
  required: true
  type: string
title:
  description: >
    Title of the notification.
  required: false
  type: string
data:
  description: >
    Additional data for the notification. You can include `notification_id` to update an existing notification instead of creating a new one.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- Persistent notifications appear in the Home Assistant notifications panel, not as push notifications on a phone or browser.
- A persistent notification stays visible until someone dismisses it or another action updates or removes it.
- If you include `notification_id` in `data`, Home Assistant updates the existing notification with that ID instead of creating a new notification.
- To send a message to a notify entity, use [Send a notification message](/actions/notify.send_message/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a notification when a leak is detected

When a leak sensor detects moisture, show a notification in Home Assistant.

- **Trigger**: State
  - **Entity**: Kitchen leak sensor (`binary_sensor.kitchen_leak`)
  - **To**: On
- **Action**: Send a persistent notification
  - **Title**: Water leak detected
  - **Message**: The kitchen leak sensor detected moisture.

{% details "YAML example for a leak notification" %}

{% example %}
automation: |
  alias: "Show a kitchen leak notification"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_leak
      to: "on"
  actions:
    - action: notify.persistent_notification
      data:
        title: "Water leak detected"
        message: "The kitchen leak sensor detected moisture."
{% endexample %}

{% enddetails %}

### Automation: keep one water leak notification updated

If a leak sensor reports moisture, show or update one persistent notification with the same notification ID.

- **Trigger**: State
  - **Entity**: Kitchen leak sensor (`binary_sensor.kitchen_leak`)
  - **To**: On
- **Action**: Send a persistent notification
  - **Title**: Water leak detected
  - **Message**: The kitchen leak sensor detected moisture.
  - **Data**: `notification_id: kitchen_leak`

{% details "YAML example for updating one leak notification" %}

{% example %}
automation: |
  alias: "Show a kitchen leak notification"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_leak
      to: "on"
  actions:
    - action: notify.persistent_notification
      data:
        title: "Water leak detected"
        message: "The kitchen leak sensor detected moisture."
        data:
          notification_id: kitchen_leak
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
