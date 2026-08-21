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
6. If more than one UI-managed Matrix account is configured, select the **Matrix account** to use.
7. Enter the **Message** and the **Target** room. Optionally, set extra options under **Data**.
8. Select **Save**.

This action does not support action targets. In the UI, you set the room in the **Target** field instead of selecting an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Matrix account:
  description: UI-managed Matrix account to use. If no YAML bot is configured and only one UI-managed account is loaded, Home Assistant selects it automatically.
  required: false
Message:
  description: The message to send.
  required: true
Target:
  description: The room ID or alias to send the message to.
  required: true
Data:
  description: Extra options for images, message format, and threaded replies.
  required: false
{% endoptions_ui %}

#### Data options in the UI

{% options_ui %}
Images:
  description: One or more image paths to attach to the message.
  required: false
Message format:
  description: Send the message as plain text or HTML. The default is plain text.
  required: false
Thread ID:
  description: Matrix event ID of the parent message to reply to in a thread.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matrix.send_message`:

{% example %}
action: |
  action: matrix.send_message
  data:
    config_entry_id: MATRIX_CONFIG_ENTRY_ID
    message: "My cool message"
    target: "#hasstest:matrix.org"
    data:
      images:
        - "/path/to/picture.jpg"
      format: html
      thread_id: "$-abcdeghij_klmnopqrstuvwxyz123"
{% endexample %}

This sends a message with an attached image to the `#hasstest:matrix.org` room.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: Config entry ID of the UI-managed Matrix account to use. If no YAML bot is configured and only one UI-managed account is loaded, this can be omitted.
  required: false
  type: string
message:
  description: The message to send.
  required: true
  type: string
target:
  description: The room or rooms to send the message to.
  required: true
  type: list
data:
  description: Extra options for images, message format, and threaded replies.
  required: false
  type: map
{% endoptions_yaml %}

#### Data options in YAML

{% options_yaml %}
images:
  description: Image paths to attach to the message.
  required: false
  type: list
format:
  description: Message format. Use `text` for plain text or `html` for HTML. The default is `text`.
  required: false
  type: string
thread_id:
  description: Matrix event ID of the parent message to reply to in a thread.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- The account must already be a member of each target room. A UI-managed account does not join or sync rooms.
- Room targets can be Matrix room IDs, such as `!roomid:example.com`, or aliases, such as `#garden:example.com`.
- When a YAML bot is configured and **Matrix account** is empty, the action uses the YAML bot.
- In YAML, `target` can contain one room or a list of rooms.
- Image paths must be in a directory allowed by Home Assistant. See [allowing external directories](/integrations/homeassistant/#allowlist_external_dirs).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a message when a door opens

Send a message to a Matrix room when the front door opens.

- **Trigger**: Front door opened
- **Action**: Send message
  - **Matrix account**: Home account
  - **Message**: The front door opened.
  - **Target**: `#home:example.com`

{% details "YAML example for sending a door message" %}

{% example %}
automation: |
  alias: "Send a Matrix message when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: matrix.send_message
      data:
        config_entry_id: MATRIX_CONFIG_ENTRY_ID
        message: "The front door opened."
        target: "#home:example.com"
{% endexample %}

{% enddetails %}

### Automation: send a camera snapshot after motion

Save a camera snapshot and send the image to a Matrix room when motion is detected.

- **Trigger**: Motion detected
- **Action**: Take snapshot
  - **Target**: Entrance camera
- **Action**: Send message
  - **Matrix account**: Home account
  - **Message**: Motion was detected at the entrance.
  - **Target**: `#home:example.com`
  - **Images**: `/config/www/entrance_snapshot.jpg`

{% details "YAML example for sending a camera snapshot" %}

{% example %}
automation: |
  alias: "Send an entrance snapshot to Matrix"
  triggers:
    - trigger: state
      entity_id: binary_sensor.entrance_motion
      to: "on"
  actions:
    - action: camera.snapshot
      target:
        entity_id: camera.entrance
      data:
        filename: "/config/www/entrance_snapshot.jpg"
    - action: matrix.send_message
      data:
        config_entry_id: MATRIX_CONFIG_ENTRY_ID
        message: "Motion was detected at the entrance."
        target: "#home:example.com"
        data:
          images:
            - "/config/www/entrance_snapshot.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
