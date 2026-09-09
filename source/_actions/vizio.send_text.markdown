---
title: "Send text"
action: vizio.send_text
domain: vizio
description: "Types text into the on-screen field that currently has focus on a VIZIO SmartCast device."
---

The **Send text** action types text into whatever on-screen field currently has focus on your VIZIO SmartCast device — for example, an app's search box or a sign-in form. Characters are sent with the same keyboard encoding the official SmartCast app uses, so they arrive in order as regular keystrokes.

Only ASCII characters are supported. This is also the most reliable way to enter digits (for example, PINs or channel numbers), because the remote's numeric key codes are not digit keys on SmartCast devices.

{% include actions/ui_header.md %}

To send text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **VIZIO SmartCast: Send text**.
6. Select the media player entity of your device as the target, and enter the **Text** to type.
7. Select **Save**.

This action targets the media player entity of your VIZIO SmartCast device.

### Options in the UI

{% options_ui %}
Text:
  description: The text to type. Only ASCII characters are supported.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vizio.send_text`. A basic example looks like this:

{% example %}
action: |
  action: vizio.send_text
  target:
    entity_id: media_player.vizio_smartcast
  data:
    text: "stranger things"
{% endexample %}

This types "stranger things" into the search field that is open on the TV.

### Options in YAML

{% options_yaml %}
text:
  description: >
    The text to type. Only ASCII characters are supported.
  required: true
  type: string
{% endoptions_yaml %}
