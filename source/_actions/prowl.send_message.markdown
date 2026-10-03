---
title: "Send message"
action: prowl.send_message
domain: prowl
description: "Send a Prowl push notification. Optionally set a priority and a URL that opens when the notification is selected."
since: "2026.10"
related_actions:
  - notify.send_message
---

The **Send message** action sends a push notification to your iOS device through Prowl. You can set the priority of the notification and attach a URL that opens when you select the notification in the Prowl app.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Prowl: Send message**.
6. Under **Target**, select the Prowl notifier to send the message to (see [Targets](#targets)).
7. In **Message**, enter a message for the notification.
8. _Optional_: enter a **Title**, select a **Priority**, or enter a **URL**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Title:
  description: Title (event) of the notification. Defaults to **Home Assistant**.
  required: false
Message:
  description: The message body of the notification.
  required: true
Priority:
  description: Priority of the notification. Possible values are **Very low**, **Moderate**, **Normal**, **High**, and **Emergency**. Emergency notifications may bypass quiet hours, depending on the settings in the Prowl app.
  required: false
URL:
  description: A URL that is opened when the notification is selected in the Prowl app.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `prowl.send_message`. A basic example looks like this:

{% example %}

action: |
  action: prowl.send_message
  target:
    entity_id: notify.prowl
  data:
    title: "Reminder"
    message: "Have you considered frogs?"

{% endexample %}

### Options in YAML

{% options_yaml %}
title:
  description: >
    Title (event) of the notification. Defaults to `Home Assistant`.
  required: false
  type: string
message:
  description: >
    The message body of the notification.
  required: true
  type: string
priority:
  description: >
    Priority of the notification. Possible values are `very_low`, `moderate`, `normal`, `high`, and `emergency`. Emergency notifications may bypass quiet hours, depending on the settings in the Prowl app.
  required: false
  type: string
url:
  description: >
    A URL that is opened when the notification is selected in the Prowl app.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a high-priority notification when the front door opens

When the front door opens, send a high-priority Prowl notification that links to your Home Assistant instance.

- **Trigger**: Door opened (`door.opened`)
- **Action**: Prowl: Send message (`prowl.send_message`)
  - **Target**: Prowl (`notify.prowl`)

{% example %}
automation: |
  alias: "Prowl: front door opened"
  triggers:
    - trigger: door.opened
      target:
        entity_id: binary_sensor.front_door
  actions:
    - action: prowl.send_message
      target:
        entity_id: notify.prowl
      data:
        title: "Front door"
        message: "The front door was opened."
        priority: high
        url: https://my.home-assistant.io/
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
