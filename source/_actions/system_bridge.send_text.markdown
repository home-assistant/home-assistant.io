---
title: "Send keyboard text"
action: system_bridge.send_text
domain: system_bridge
description: "Sends text for a System Bridge server to type."
related_actions:
  - system_bridge.send_keypress
---

The **Send keyboard text** action sends text for a System Bridge server to type, as if it was typed on the server's keyboard.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To send text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Bridge: Send keyboard text**.
6. Select the **Bridge** server and enter the **Text** to type.
7. Select **Save**.

This action does not support targets. In the UI, you select the System Bridge server through the **Bridge** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge:
  description: The System Bridge server to send the text to.
  required: true
Text:
  description: The text to type.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.send_text`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: system_bridge.send_text
  data:
    bridge: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    text: "Hello"
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
bridge:
  description: The device ID of the System Bridge server to send the text to.
  required: true
  type: string
text:
  description: The text to type.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response confirms the text that was sent and includes the following fields:

- `id`: The ID of the request.
- `type`: The result type, such as `KEYBOARD_TEXT_SENT`.
- `data`: The data that was sent, such as the `text` that was typed.
- `message`: A human-readable result message.

An example of the response looks like this:

```yaml
id: abc123
type: KEYBOARD_TEXT_SENT
data:
  text: Hello
message: Text entered
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
