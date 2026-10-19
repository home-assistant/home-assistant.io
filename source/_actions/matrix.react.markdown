---
title: "React"
action: matrix.react
domain: matrix
description: "Sends a reaction to a message in a Matrix room."
related_actions:
  - matrix.send_message
---

Use this action to send a reaction to a message in a Matrix room, for example to acknowledge a message with a 👍.

{% include actions/ui_header.md %}

To react to a Matrix message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Matrix: React**.
6. Enter the **Reaction**, the **Room**, and the **Message ID** to react to.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Reaction:
  description: The reaction to send.
  required: true
Room:
  description: The room to send the reaction to.
  required: true
Message ID:
  description: The ID of the message to react to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matrix.react`:

{% example %}
action: |
  action: matrix.react
  data:
    reaction: "✅"
    room: "#hasstest:matrix.org"
    message_id: "$-abcdeghij_klmnopqrstuvwxyz123"
{% endexample %}

This adds a ✅ reaction to the given message.

### Options in YAML

{% options_yaml %}
reaction:
  description: The reaction to send.
  required: true
  type: string
room:
  description: The room to send the reaction to.
  required: true
  type: string
message_id:
  description: The ID of the message to react to.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- A reaction does not have to be an emoji. It can be any valid string, but emoji are the typical use.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
