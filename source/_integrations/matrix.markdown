---
title: Matrix
description: Matrix chatbot support
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.69
ha_domain: matrix
ha_platforms:
  - notify
ha_integration_type: integration
ha_codeowners:
  - '@PaarthShah'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This {% term integration %} allows you to send messages to matrix rooms, as well as to react to messages in matrix rooms. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)

## Configuration

To enable the Matrix {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
matrix:
  homeserver: https://matrix.org
  username: "@my_matrix_user:matrix.org"
  password: supersecurepassword
  rooms:
    - "#hasstest:matrix.org"
  commands:
    - word: my_command
      name: my_command
```

{% configuration %}
username:
  description: "The matrix username that Home Assistant should use to log in. *Note*: You must specify a full matrix ID here, including the homeserver domain, e.g., '@my_matrix_bot:matrix.org'. Please note also that the '@' character has a special meaning in YAML, so this must always be given in quotes."
  required: true
  type: string
password:
  description: The password for your Matrix account.
  required: true
  type: string
homeserver:
  description: "The full URL for your homeserver. If you use the default matrix.org homeserver, this is 'https://matrix.org'."
  required: true
  type: string
verify_ssl:
  description: Verify the homeservers certificate.
  required: false
  type: string
  default: true
rooms:
  description: "The list of rooms that the bot should join and listen for commands (see below) in. While you can limit the list of rooms that a certain command applies to on a per-command basis (see below), you must still list all rooms here that commands should be received in. Rooms can be given either by their internal ID (e.g., '!cURbafjkfsMDVwdRDQ:matrix.org') or any of their aliases (e.g., '#matrix:matrix.org')."
  required: false
  type: [string]
  default: empty
commands:
  description: "A list of commands that the bot should listen for. If a command is triggered (via its *word* or *expression*, see below), an event is fired that you can handle using automations. Every command consists of these possible configuration options:"
  required: false
  type: map
  default: empty
  keys:
    word:
      description: "Specifies a word that the bot should listen for. If you specify 'my_command' here, the bot will react to any message starting with '!my_command'."
      required: false
      type: string
    expression:
      description: "Specifies a regular expression (in Python regexp syntax) that the bot should listen to. The bot will react to any message that matches the regular expression."
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
In order to prevent infinite loops when reacting to commands, you have to use a separate account for the Matrix integration.
{% endwarning %}

### Event data

If a command is triggered, a `matrix_command` event is fired. The event contains the name of the command in the `name` field.

If the command is a word command, the `data` field contains a list of the command's arguments, i.e., everything that stood behind the word, split at spaces. If the command is an expression command, the `data` field contains the [group dictionary](https://docs.python.org/3.6/library/re.html?highlight=re#re.match.groupdict) of the regular expression that matched the message.

### Comprehensive Configuration Example

This example also uses the [matrix `notify` platform](#notifications).

{% raw %}

```yaml
# The Matrix integration
matrix:
  homeserver: https://matrix.org
  username: "@my_matrix_user:matrix.org"
  password: supersecurepassword
  rooms:
    - "#hasstest:matrix.org"
    - "#someothertest:matrix.org"
  commands:
    - word: testword
      name: testword
      rooms:
        - "#someothertest:matrix.org"
    - expression: "My name is (?P<name>.*)"
      name: introduction

notify:
  - name: matrix_notify
    platform: matrix
    default_room: "#hasstest:matrix.org"

automation:
  - alias: "React to !testword"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: notify.matrix_notify
        data:
          message: "It looks like you wrote !testword"

  - alias: "React to an introduction"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: introduction
    actions:
      - action: notify.matrix_notify
        data:
          message: "Hello {{trigger.event.data.args['name']}}"
```

{% endraw %}

This configuration will:

- Listen for "!testword" in the room "#someothertest:matrix.org" (and *only*) there. If such a message is encountered, it will answer with "It looks like you wrote !testword" into the "#hasstest:matrix.org" channel.
- Listen in both rooms for any message matching "My name is <any string>" and answer with "Hello <the string>" into "#hasstest:matrix.org".

## Notifications

The `matrix` platform allows you to deliver notifications from Home Assistant to a [Matrix](https://matrix.org/) room. Rooms can be both direct as well as group chats.

To enable Matrix notifications in your installation, you first need to configure the [Matrix integration](#configuration). Then, add the following to your {% term "`configuration.yaml`" %} file:

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
          - /path/to/picture.jpg
```

{% important %}
If you need to include a file from an external folder in your notifications, you will have to [list the source folder as allowed](/integrations/homeassistant/#allowlist_external_dirs).

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - /tmp
```
{% endimportant %}
