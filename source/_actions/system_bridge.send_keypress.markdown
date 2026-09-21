---
title: "Send keyboard keypress"
action: system_bridge.send_keypress
domain: system_bridge
description: "Sends a keyboard keypress to a System Bridge server."
related_actions:
  - system_bridge.send_text
---

The **Send keyboard keypress** action sends a single keyboard keypress to a System Bridge server, as if the key was pressed on the server's keyboard.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To send a keypress from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Bridge: Send keyboard keypress**.
6. Select the **Bridge** server and select or enter the **Key** to press.
7. Select **Save**.

This action does not support targets. In the UI, you select the System Bridge server through the **Bridge** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge:
  description: The System Bridge server to send the keypress to.
  required: true
Key:
  description: The key to press, such as `a`, `enter`, or `audio_play`. You can pick a key from the list or enter your own.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.send_keypress`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: system_bridge.send_keypress
  data:
    bridge: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    key: "a"
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
bridge:
  description: The device ID of the System Bridge server to send the keypress to.
  required: true
  type: string
key:
  description: >
    The key to press, such as `a`, `enter`, or `audio_play`. For the full
    list of supported keys, refer to the
    [keys documentation](https://robotjs.dev/docs/syntax#keys).
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response confirms the key that was pressed and includes the following fields:

- `id`: The ID of the request.
- `type`: The result type, such as `KEYBOARD_KEY_PRESSED`.
- `data`: The data that was sent, such as the `key` that was pressed.
- `message`: A human-readable result message.

An example of the response looks like this:

```yaml
id: abc123
type: KEYBOARD_KEY_PRESSED
data:
  key: a
message: Key pressed
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
