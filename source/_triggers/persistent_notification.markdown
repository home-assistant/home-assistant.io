---
title: "Persistent notification"
trigger: persistent_notification
domain: persistent_notification
description: "Triggers when a persistent notification is added, updated, or removed."
related_triggers:
  - event
  - homeassistant
---

The **Persistent notification** trigger is useful when you want an automation to react to the notifications that Home Assistant shows in the sidebar under **Notifications**. For example, Home Assistant adds a notification when an integration can't be set up. With this trigger, you can forward that notification to your phone, so you don't miss it.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **Persistent notification** trigger.
5. Optional: In **Notification ID**, enter the ID of the notification to react to.
   - Leave it empty to react to all notifications.
6. Under **Update type**, select the changes to react to: **added**, **removed**, or **updated**.
   - By default, **added** and **removed** are selected.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Notification ID:
  description: The ID of the notification to react to. Leave it empty to react to all notifications.
  required: false
Update type:
  description: |
    The changes to react to:
    - **added**: A new notification is added.
    - **updated**: A notification with the same ID is added again, which replaces the existing notification.
    - **removed**: A notification is dismissed.
    - **current**: Doesn't make the trigger react. For details, refer to [Good to know](#good-to-know).

    Default is **added** and **removed**.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: persistent_notification`. A basic example looks like this:

{% example %}
trigger: |
  trigger: persistent_notification
  notification_id: invalid_config
  update_type:
    - added
    - updated
{% endexample %}

This runs when Home Assistant adds or updates the notification about integrations that can't be set up.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `persistent_notification`.
  required: true
  type: string
notification_id:
  description: The ID of the notification to react to. If you leave it out, the trigger reacts to all notifications.
  required: false
  type: string
update_type:
  description: The changes to react to. You can use `added`, `updated`, and `removed`. If you leave it out, the trigger reacts to all changes.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- In the UI, a new trigger reacts to **added** and **removed**. In YAML, a trigger without `update_type` reacts to all changes, including **updated**.
- The update type **current** doesn't make the trigger react. Home Assistant only uses it to send the list of current notifications to the UI. Use **added** to react to new notifications.
- When you add a notification with an ID that already exists, it replaces the existing notification. The trigger then reacts with the update type **updated**, not **added**.
- When you dismiss all notifications at once, the trigger reacts once for each notification.
- For the data that this trigger passes to your conditions and actions, such as `trigger.notification.message`, refer to [Persistent notification triggers](/docs/automation/trigger-data/#persistent-notification-triggers).

{% include triggers/try_it.md %}

For this trigger, create a notification with the [**Create persistent notification**](/actions/persistent_notification.create/) action, for example, in {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.

{% include triggers/more_examples.md %}

### Automation: send a notification when an integration can't be set up

When Home Assistant can't set up an integration, it adds a notification with the ID `invalid_config`. If more integrations fail, it updates that notification. This automation sends the notification to your phone.

- **Trigger**: Persistent notification
  - **Notification ID**: `invalid_config`
  - **Update type**: **added** and **updated**
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: {% raw %}`{{ trigger.notification.message }}`{% endraw %}

{% details "YAML example for sending a notification when an integration can't be set up" %}

{% example %}
automation: |
  alias: "Notify when an integration can't be set up"
  triggers:
    - trigger: persistent_notification
      notification_id: invalid_config
      update_type:
        - added
        - updated
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "{{ trigger.notification.message }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
