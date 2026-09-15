---
title: Dismiss notification
action: persistent_notification.dismiss
domain: persistent_notification
description: "Removes a single persistent notification from the Home Assistant frontend."
related_actions:
  - persistent_notification.create
  - persistent_notification.dismiss_all
---

The **Dismiss notification** action removes a single persistent notification from the Home Assistant frontend. You identify the notification by its notification ID, so this works well to clear a notification that an automation or script created earlier.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Persistent notification: Dismiss**.
6. Provide the **Notification ID** of the notification to remove.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Notification ID:
  description: The identifier of the notification to remove. This is the same ID you set when you created the notification.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `persistent_notification.dismiss`. A basic example looks like this:

{% example %}
action: |
  action: persistent_notification.dismiss
  data:
    notification_id: "1234"
{% endexample %}

This removes the notification with the ID `1234`.

### Options in YAML

{% options_yaml %}
notification_id:
  description: The identifier of the notification to remove. This is the same ID you set when you created the notification.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
