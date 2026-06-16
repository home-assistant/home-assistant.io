---
title: "Send message"
action: matrix.send_message
domain: matrix
description: "Sends a message to one or more Matrix rooms."
related_actions:
  - matrix.react
---

Use this action to send a message to one or more Matrix rooms, for example to post a notification or share an image.

{% include actions/ui_header.md %}

To send a Matrix message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Matrix: Send message**.
6. Enter the **Message** and the **Target** room or rooms. Optionally, set extra options under **Data**.
7. Select **Save**.

This action does not support action targets. In the UI, you set the room in the **Target** field instead of selecting an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Message:
  description: The message to send.
  required: true
Target:
  description: The room or rooms to send the message to.
  required: true
Data:
  description: "Extra options for the message. Supports images (a list of image paths to attach), format (text or html, default text), and thread_id (the ID of a parent message to thread this reply under)."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matrix.send_message`:

{% example %}
action: |
  action: matrix.send_message
  data:
    message: "My cool message"
    target:
      - "#hasstest:matrix.org"
    data:
      images:
        - "/path/to/picture.jpg"
      format: html
      thread_id: "$-abcdeghij_klmnopqrstuvwxyz123"
{% endexample %}

This sends a message with an attached image to the `#hasstest:matrix.org` room.

### Options in YAML

{% options_yaml %}
message:
  description: The message to send.
  required: true
  type: string
target:
  description: The room or rooms to send the message to.
  required: true
  type: list
data:
  description: "Extra options for the message. Supports images (a list of image paths to attach), format (text or html, default text), and thread_id (the ID of a parent message to thread this reply under)."
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
