---
title: Matrix
description: Matrix chatbot support
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.69
ha_domain: matrix
ha_config_flow: true
ha_platforms:
  - notify
ha_integration_type: service
ha_codeowners:
  - '@PaarthShah'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Matrix** {% term integration %} allows you to send messages and reactions to Matrix rooms. You can configure an outbound account in the UI. The YAML bot configuration remains available for joining rooms, listening for commands, and firing events when configured commands are triggered.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)

## Prerequisites

- A Matrix account with a full Matrix user ID and password.
- Membership in each room where you want Home Assistant to send messages or reactions.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Homeserver URL:
    description: The full URL of the Matrix homeserver. For example, `https://matrix.org`.
Username:
    description: The full Matrix user ID, including the homeserver domain. For example, `@my_matrix_bot:matrix.org`.
Password:
    description: The password for the Matrix account.
Verify TLS certificate:
    description: Verify the homeserver's TLS certificate. This is enabled by default.
{% endconfiguration_basic %}

The outbound account does not join or sync rooms. Before sending a message or reaction, invite the account to each target room and confirm that it has permission to post there. You can target a room by its room ID, such as `!roomid:example.com`, or by an alias, such as `#garden:example.com`.

## YAML bot configuration

To enable the Matrix {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
matrix:
  homeserver: "https://matrix.org"
  username: "@my_matrix_user:matrix.org"
  password: "supersecurepassword"
  rooms:
    - "#hasstest:matrix.org"
  commands:
    - word: "my_command"
      name: "my_command"
```

{% configuration %}
username:
  description: "The Matrix username that Home Assistant should use to log in. You must specify a full Matrix ID, including the homeserver domain. For example, `@my_matrix_bot:matrix.org`. The `@` character has a special meaning in YAML, so the ID must always be in quotes."
  required: true
  type: string
password:
  description: The password for your Matrix account.
  required: true
  type: string
homeserver:
  description: "The full URL for your homeserver. If you use the default matrix.org homeserver, this is `https://matrix.org`."
  required: true
  type: string
verify_ssl:
  description: Verify the homeservers certificate.
  required: false
  type: boolean
  default: true
rooms:
  description: "The list of rooms that the bot should join and listen for commands in. Although you can limit a command to specific rooms, you must list every room where commands can be received here. Use an internal ID, for example, `!cURbafjkfsMDVwdRDQ:matrix.org`, or an alias, for example, `#matrix:matrix.org`."
  required: false
  type: [string]
  default: empty
commands:
  description: "A list of commands that the bot should listen for. If a command is triggered by its *word*, *expression*, or *reaction*, an event is fired that you can handle using automations. Every command consists of these possible configuration options:"
  required: false
  type: map
  default: empty
  keys:
    word:
      description: "Specifies a word that the bot should listen for. If you specify `my_command`, the bot handles any message starting with `!my_command`."
      required: false
      type: string
    expression:
      description: "Specifies a regular expression (in Python regexp syntax) that the bot should listen to. The bot will handle any message that matches the regular expression."
      required: false
      type: string
    reaction:
      description: "Specifies an emoji reaction that the bot should listen to. The bot will handle any message that is reacted to with this emoji."
      required: false
      type: string
    name:
      description: "The name of the command. This will be an attribute of the event that is fired when this command triggers."
      required: true
      type: string
    rooms:
      description: "A list of rooms that the bot should listen for this command in. If this is not given, the *rooms* list from the main configuration is used. Please note that every room in this list must also be in the main *room* configuration."
      required: false
      type: [string]
      default: empty
{% endconfiguration %}

{% warning %}
To prevent infinite loops when reacting to commands, you have to use a separate account for the Matrix integration.
{% endwarning %}

When YAML configuration is present, Home Assistant also imports its account as a UI-managed outbound account. The YAML bot continues to own room joins, message sync, command handling, and the `matrix_command` event. Calls to `matrix.send_message` and `matrix.react` without an account selection continue to use the YAML bot.

### Event data

If a command is triggered, a `matrix_command` event is fired. The event contains the name of the command in the `command` field. It also includes the sender, room, Matrix event ID, and command arguments.

If the command is a word command, the `args` field contains a list of the command's arguments. If the command is an expression command, `args` contains the [group dictionary](https://docs.python.org/3/library/re.html#re.Match.groupdict) of the regular expression that matched the message. For a reaction command, `args` contains the reaction. Text events also include `thread_parent`.

### Comprehensive configuration example

This example also uses the [matrix `notify` platform](#notifications).

```yaml
# The Matrix integration
matrix:
  homeserver: "https://matrix.org"
  username: "@my_matrix_user:matrix.org"
  password: "supersecurepassword"
  rooms:
    - "#hasstest:matrix.org"
    - "#someothertest:matrix.org"
  commands:
    - word: "testword"
      name: "testword"
      rooms:
        - "#someothertest:matrix.org"
    - expression: "My name is (?P<name>.*)"
      name: "introduction"
    - reaction: "👍"
      name: "thumbsup"

notify:
  - name: matrix_notify
    platform: matrix
    default_room: "#hasstest:matrix.org"

automation:
  - alias: "Respond to !testword"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: notify.matrix_notify
        data:
          message: "It looks like you wrote !testword"

  - alias: "Respond to an introduction"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: introduction
    actions:
      - action: notify.matrix_notify
        data:
          message: "Hello {{ trigger.event.data.args['name'] }}"

  - alias: "Respond to a reaction"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: thumbsup
    actions:
      - action: notify.matrix_notify
        data:
          message: >-
            I saw that {{ trigger.event.data.args['reaction'] }}. Thanks!

  - alias: "React to a command"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: matrix.react
        data:
          reaction: "✅"
          room: "{{ trigger.event.data.room }}"
          message_id: "{{ trigger.event.data.event_id }}"
```

This configuration will:

- Listen for "!testword" in the room "#someothertest:matrix.org" (and *only*) there. If such a message is encountered, it will answer with "It looks like you wrote !testword" into the "#hasstest:matrix.org" channel and also place a ✅ reaction on the original message.
- Listen in both rooms for any message matching "My name is <any string>" and answer with "Hello <the string>" into "#hasstest:matrix.org".
- Listen in both rooms for messages reacted to with 👍 and answer with "I saw that 👍. Thanks!"

## Notifications

The `matrix` platform allows you to deliver notifications from Home Assistant to a [Matrix](https://matrix.org/) room. Rooms can be both direct as well as group chats.

To enable Matrix notifications in your installation, first configure the [YAML bot](#yaml-bot-configuration) or a single [UI-managed outbound account](#configuration). The legacy notification platform cannot select an account. If you configure multiple UI-managed accounts without a YAML bot, use the **Send message** action instead. Then, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: matrix
    default_room: ROOM_ID_OR_ALIAS
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
default_room:
  description: The room all messages will be sent to, when no other target is given.
  required: true
  type: string
{% endconfiguration %}

The target room has to be precreated, the room id can be obtained from the rooms settings dialog. Rooms by default have a canonical id of the form `"!<randomid>:homeserver.tld"`, but can also be allocated aliases like `"#roomname:homeserver.tld"`. Make sure to use quotes around the room id or alias to escape special characters (`!`, and `#`) in YAML. The notifying account may need to be invited to the room, depending on the individual rooms policies.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Message formats

Matrix supports sending messages using a [limited HTML subset](https://spec.matrix.org/v1.2/client-server-api/#mroommessage-msgtypes). To specify the message format, add it in the notification `data`.

Supported formats are: `text` (default), and `html`.

```yaml
# Example of notification as HTML
actions:
  - action: notify.matrix_notify
    data:
      message: >-
        <h1>Hello, world!</h1>
      data:
        format: "html"
```

### Images in notification

It is possible to send images with notifications. To do so, add a list of paths in the notification `data`.

```yaml
# Example of notification with images
actions:
  - action: notify.matrix_notify
    data:
      message: "Test with images"
      data:
        images:
          - "/path/to/picture.jpg"
```

{% important %}
If you need to include a file from an external folder in your notifications, you will have to [list the source folder as allowed](/integrations/homeassistant/#allowlist_external_dirs).

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - "/tmp"
```

{% endimportant %}

### Replying in threads

For word and expression commands, the `matrix_command` event contains an `event_id` field that represents the message identifier for the received message.
It also contains a `thread_parent` field that contains the message identifier for the parent message of the thread.
If the message was inside of a thread, `thread_parent` will be the identifier of the root message of the thread. If it
is not inside of a thread, `thread_parent` will be the same as `event_id`.

To reply inside of a thread, pass the correct message identifier of the root message into `data.thread_id` when sending
a reply message. For example:

```yaml
action: notify.matrix_notify
data:
  message: "Reply message goes here"
  data:
    thread_id: "{{ trigger.event.data.thread_parent }}"
```

{% include integrations/actions.md %}

## Matrix automation examples

Use Matrix actions to post a message to a room or react to a command received by the YAML bot.

{% include docs/paste_yaml_tip.md %}

### Automation: send a message when a door opens

Send a message through a UI-managed Matrix account when a door opens.

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

### Automation: react to a Matrix command

Add a check mark after the YAML bot receives the configured `!status` command.

- **Trigger**: `matrix_command` event for the `status` command
- **Action**: React
  - **Reaction**: ✅
  - **Room**: Room from the event
  - **Message ID**: Event ID from the event

{% details "YAML example for reacting to a Matrix command" %}

{% example %}
automation: |
  alias: "Acknowledge the Matrix status command"
  triggers:
    - trigger: event
      event_type: matrix_command
      event_data:
        command: status
  actions:
    - action: matrix.react
      data:
        reaction: "✅"
        room: "{{ trigger.event.data.room }}"
        message_id: "{{ trigger.event.data.event_id }}"
{% endexample %}

{% enddetails %}
