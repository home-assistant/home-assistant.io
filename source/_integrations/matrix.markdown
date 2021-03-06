---
title: Matrix
description: Matrix chatbot support
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.69
ha_codeowners:
  - '@tinloaf'
  - '@szimszon'
ha_domain: matrix
ha_platforms:
  - notify
---

This integration allows you to send messages and images to matrix rooms, as well as to react to messages in matrix rooms. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)

## Configuration

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

### Event Data

If a command is triggered, a `matrix_command` event is fired. The event contains the name of the command in the `name` field.

If the command is a word command, the `data` field contains a list of the command's arguments, i.e., everything that stood behind the word, split at spaces. If the command is an expression command, the `data` field contains the [group dictionary](https://docs.python.org/3.6/library/re.html?highlight=re#re.match.groupdict) of the regular expression that matched the message.

### Comprehensive Configuration Example

This example also uses the [matrix `notify` platform](#notifications).

{% raw %}

```yaml
# The Matrix component
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
    default_markdown: false
    default_notice: false

automation:
  - alias: 'React to !testword'
    trigger:
      platform: event
      event_type: matrix_command
      event_data:
        command: testword
    action:
      service: notify.matrix_notify
      data:
        message: "It looks like you wrote !testword"
  - alias: 'React to an introduction'
    trigger:
      platform: event
      event_type: matrix_command
      event_data:
        command: introduction
    action:
      service: notify.matrix_notify
      data:
        message: "Hello {{trigger.event.data.args['name']}}"
```

{% endraw %}

This configuration will:

- Listen for "!testword" in the room "#someothertest:matrix.org" (and *only*) there. If such a message is encountered, it will answer with "It looks like you wrote !testword" into the "#hasstest:matrix.org" channel.
- Listen in both rooms for any message matching "My name is <any string>" and answer with "Hello <the string>" into "#hasstest:matrix.org".

## Notifications

The `matrix` platform allows you to deliver notifications from Home Assistant to a [Matrix](https://matrix.org/) room. Rooms can be both direct as well as group chats.

To enable Matrix notifications in your installation, you first need to configure the [Matrix component](#configuration). Then, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: matrix
    default_room: ROOM_ID_OR_ALIAS
    default_markdown: false
    default_notice: false
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
default_room:
  description: The room all messages will be sent to, when no other target is given.
  required: true
  type: string
default_markdown:
  description: If true the message will be sent as a Markdown text. If omitted the default is false. This option is available only from version 2021.3.
  required: false
  default: false
  type: boolean
default_notice:
  description: If true the message will be sent as notice. If omitted the default is false. This option is available only from version 2021.3.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

The target room has to be precreated, the room id can be obtained from the rooms settings dialog. Rooms by default have a canonical id of the form `"!<randomid>:homeserver.tld"`, but can also be allocated aliases like `"#roomname:homeserver.tld"`. Make sure to use quotes around the room id or alias to escape special characters (`!`, and `#`) in YAML. The notifying account may need to be invited to the room, depending on the individual rooms policies.

To use matrix notification in scripts or automation:

{% raw %}
```yaml
 service: notify.matrix_notify
 data:
   title: "This is a markdown header line"
   message: "This is a markdown formatted message because 'title' is defined."
   data:
     markdown: true
     notice: false
     image: "file:///tmp/image.jpg"
```
{% endraw %}

{% configuration %}
service:
  description: The name of the notification service.
  required: true
  type: string
data: "This is a map with the parameters passed to the notification service"
  required: true
  type: map
  keys:
    title:
      description: This is the title of the message. If defined Markdown formatting is enabled.
      required: false
      type: string
    message:
      description: This is the message.
      required: true
      type: string
    data:
      description: With this map additional parameters will be passed to the service.
      required: false
      type: map
      keys:
        markdown:
          description: Switch Markdown formatting on or off.
          required: false
          type: boolean
        notice:
          description: Indicate if the message will be a notice or not
          required: false
          type: boolean
        image:
          description: This is the path to the image will be send to the room. For local file the prefix have to be `file://` for remote files the prefix could be `http://` or `https://`.
          required: false
          type: string
{% endconfiguration %}

For additional info, please see the [getting started with automation page](/getting-started/automation/).
