---
title: "Persistent notification"
trigger: persistent_notification
domain: persistent_notification
description: "Triggers when a persistent notification is added, updated, or removed."
related_triggers:
  - event
  - homeassistant
---

The **Persistent notification** trigger is useful when you want an automation to react to the notifications that Home Assistant shows in the sidebar under **Notifications**. For example, Home Assistant adds a notification when someone fails to log in. With this trigger, you can forward that notification to your phone, so you don't miss it.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **Persistent notification** trigger.
5. Optional: In **Notification ID**, enter the ID of the notification to react to.
   - Leave it empty to react to all notifications.
6. Under **Update type**, select the changes to react to: **added**, **removed**, or **updated**.
   - **current** is also in the list, but it doesn't make the trigger react. For details, refer to [Good to know](#good-to-know).
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
  notification_id: http-login
  update_type:
    - added
    - updated
{% endexample %}

This runs when Home Assistant adds or updates the notification about a failed login attempt.

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
  description: The changes to react to. You can use `added`, `updated`, and `removed`. `current` is also accepted, but it doesn't make the trigger react. If you leave it out, the trigger reacts to all changes.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- The update type **current** doesn't make the trigger react. Home Assistant only uses it to send the list of current notifications to the UI. Use **added** to react to new notifications.
- When you add a notification with an ID that already exists, it replaces the existing notification. The trigger then reacts with the update type **updated**, not **added**.
- When you dismiss all notifications at once, the trigger reacts once for each notification.
- The trigger only reacts to changes after the automation starts. When Home Assistant starts, it sets up integrations before it starts automations. Notifications that it adds during startup don't make the trigger react.
- For the data that this trigger passes to your conditions and actions, such as `trigger.notification.message`, refer to [Persistent notification triggers](/docs/automation/trigger-data/#persistent-notification-triggers).

{% include triggers/try_it.md %}

For this trigger, create a notification with the [**Create persistent notification**](/actions/persistent_notification.create/) action, for example, in {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}. If the trigger has a **Notification ID**, use the same ID in the action. To test **removed**, dismiss the notification afterward.

{% include triggers/more_examples.md %}

### Automation: send a notification when a login attempt fails

When someone fails to log in to Home Assistant, or an app sends a request with invalid authentication, Home Assistant adds a notification with the ID `http-login` and the title **Login attempt failed**. If it happens again, Home Assistant updates that notification. This automation sends the message of the notification to your phone. The message includes the address that the request came from.

- **Trigger**: Persistent notification
  - **Notification ID**: `http-login`
  - **Update type**: **added** and **updated**
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: {% raw %}`{{ trigger.notification.message }}`{% endraw %}

{% details "YAML example for sending a notification when a login attempt fails" %}

{% example %}
automation: |
  alias: "Notify when a login attempt fails"
  triggers:
    - trigger: persistent_notification
      notification_id: http-login
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
