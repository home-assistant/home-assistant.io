---
title: "Send message"
action: system_bridge.send_message
domain: system_bridge
description: "Sends a notification to a System Bridge computer."
related_actions:
  - system_bridge.dismiss_message
  - notify.send_message
---

The **System Bridge: Send message** action sends a notification to a computer running System Bridge. Use it when you need notification options such as buttons, urgency, or an action to take when the notification is clicked.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the System Bridge notify entity for the computer.
6. From the actions shown for that target, select **Send message**.
7. Enter the message and any optional notification settings.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: The message body of the notification.
  required: true
Title:
  description: The notification title. Defaults to Home Assistant.
  required: false
Icon:
  description: An icon name or image path on the computer.
  required: false
Urgency:
  description: The notification urgency. Critical notifications stay until dismissed. Linux only.
  required: false
Duration:
  description: How long the notification shows for.
  required: false
Buttons:
  description: Up to three buttons. Each button has an ID and a label. Linux and Windows only.
  required: false
Sound:
  description: A sound file path on the computer. Linux only.
  required: false
URL:
  description: A URL to open on the computer when the notification is clicked. Can't be used with Path.
  required: false
Path:
  description: A file or folder to open on the computer when the notification is clicked. Can't be used with URL.
  required: false
{% endoptions_ui %}

{% important %}
Only administrators can use this action because **URL** and **Path** choose what opens on the computer when the notification is clicked.
{% endimportant %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.send_message`. It returns an `id` for the notification that you can use to match its events or dismiss it later.

{% example %}
action: |
  action: system_bridge.send_message
  target:
    entity_id: notify.my_computer
  data:
    title: "Front door"
    message: "Someone's at the door"
    urgency: critical
    duration:
      seconds: 30
    buttons:
      - id: unlock
        label: "Unlock"
      - id: ignore
        label: "Ignore"
    url: "http://homeassistant.local:8123/lovelace/cameras"
  response_variable: notification
{% endexample %}

The response contains the notification ID:

```yaml
notify.my_computer:
  id: 12
```

### Options in YAML

{% options_yaml %}
message:
  description: The message body of the notification.
  required: true
  type: string
title:
  description: The notification title. Defaults to `Home Assistant`.
  required: false
  type: string
icon:
  description: An icon name or image path on the computer.
  required: false
  type: string
urgency:
  description: The urgency level, one of `low`, `normal`, or `critical`.
  required: false
  type: string
duration:
  description: How long the notification shows for.
  required: false
  type: [string, integer, map]
buttons:
  description: Up to three buttons, each with an `id` and a `label`.
  required: false
  type: list
sound:
  description: A sound file path on the computer. Linux only.
  required: false
  type: string
url:
  description: A URL to open on the computer when the notification is clicked. Can't be used with `path`.
  required: false
  type: string
path:
  description: A file or folder to open on the computer when the notification is clicked. Can't be used with `url`.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

## Good to know

- The `id` is empty with System Bridge versions before 5.20.0, and `0` when the computer has no notification service.
- The button ID can't be `default`. System Bridge reports `default` when the notification itself is clicked.
- The action can return an `id` that you can use with [Dismiss message](/actions/system_bridge.dismiss_message/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
