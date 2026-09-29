---
title: Create notification
action: persistent_notification.create
domain: persistent_notification
description: "Creates a persistent notification in the Home Assistant frontend."
related_actions:
  - persistent_notification.dismiss
  - persistent_notification.dismiss_all
---

The **Create notification** action shows a persistent notification in the Home Assistant frontend. The notification stays visible until someone dismisses it, which makes it useful for messages that need attention, such as a reminder or a warning from an automation.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Persistent notification: Create**.
6. Provide a **Message** and, if you want, a **Title** and a **Notification ID**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Message:
  description: The body of the notification. Supports Markdown formatting.
Title:
  description: The title of the notification.
  required: false
Notification ID:
  description: An identifier for the notification. When you reuse the same ID, the existing notification is overwritten instead of a new one being added.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `persistent_notification.create`. A basic example looks like this:

{% example %}
action: |
  action: persistent_notification.create
  data:
    message: "Your message goes here"
    title: "Custom subject"
{% endexample %}

This creates a notification with a fixed title and message.

### Options in YAML

{% options_yaml %}
message:
  description: The body of the notification. Supports Markdown formatting.
  required: true
  type: string
title:
  description: The title of the notification.
  required: false
  type: string
notification_id:
  description: An identifier for the notification. When you reuse the same ID, the existing notification is overwritten instead of a new one being added.
  required: false
  type: string
{% endoptions_yaml %}

## Markdown support

The message supports the [Markdown formatting syntax](https://daringfireball.net/projects/markdown/syntax). Some examples are:

- Headline 1: `# Headline`
- Headline 2: `## Headline`
- Newline: `\n`
- Bold: `**My bold text**`
- Italic: `*My italic text*`
- Link: `[Link](https://www.home-assistant.io/)`
- Image: `![image](/local/my_image.jpg)`

{% note %}
`/local/` in this context refers to the `.homeassistant/www/` folder.
{% endnote %}

## Show runtime information

To show runtime information, use a [template](/docs/templating/).
For example:

{% example %}
action: |
  action: persistent_notification.create
  data:
    title: >
      Thermostat is {{ state_attr('climate.thermostat', 'hvac_action') }}
    message: "Temperature {{ state_attr('climate.thermostat', 'current_temperature') }}"
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
