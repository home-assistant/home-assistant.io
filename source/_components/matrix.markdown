---
layout: page
title: "Matrix"
description: "Matrix chatbot support"
date: 2018-03-25 18:50
sidebar: true
comments: false
sharing: true
footer: true
logo: matrix.png
ha_category: Hub
---

This component allows you to send messages to matrix rooms, as well as to react to messages in matrix rooms. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered.

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
```

Configuration variables:

- **username** (*Required*): The matrix username that home assistant should use to log in. *Note*: You must specify a full matrix ID here, including the homeserver domain, e.g. "@my_matrix_bot:matrix.org". Please note also that the "@" character has a special meaning in YAML, so this must always be given in quotes.
- **homeserver** (*Required*): The full URL for your homeserver. If you use the defauls matrix.org homeserver, this is "https://matrix.org".
- **password** (*Required*): The password for your Matrix account.
- **verify_ssl** (*Optional*): Verify the homeservers certificate. Defaults to `true`.
- **rooms** (*Optional*): The list of rooms that the bot should join and listen for commands (see below) in. While you can limit the list of rooms that a certain command applies to on a per-command basis (see below), you must still list all rooms here that commands should be received in. Rooms can be given either by their internal ID (e.g., "!cURbafjkfsMDVwdRDQ:matrix.org") or any of their aliases (e.g., "#matrix:matrix.org").
- **commands** (*Optional*): A list of commands that the bot should listen for. If a command is triggered (via its *word* or *expression*, see below), an event is fired that you can handle using automations. Every command consists of these possible configuration options:
  - **word** (*Required* if **expression** is not given, *Forbidden* otherwise): Specifies a word that the bot should listen for. If you specify "my_command" here, the bot will react to any message starting with "!my_command".
  - **expression** (*Required* if **word** is not given, *Forbidden* otherwise): Specifies a regular expression (in python regexp syntax) that the bot should listen to. The bot will react to any message that matches the regular expression.
  - **name** (*Required* if **expression** is given, *Optional* otherwise): The name of the command. This will be an attribute of the event that is fired when this command triggers.
  - **rooms** (*Optional*): A list of rooms that the bot should listen for this command in. If this is not given, the *rooms* list from the main config is used. Please note that every room in this list must also be in the main *room* config.

### {% linkable_title Event Data %}

If a command is triggered, a `matrix_command` event is fired. The event contains the name of the command in the `name` field. If the command is a word command that has no name set, the `name` field contains the word instead.

If the command is a word command, the `data` field contains a list of the command's arguments, i.e., everything that stood behind the word, split at spaces. If the command is an expression command, the `data` field contains the [group dictionary](https://docs.python.org/3.6/library/re.html?highlight=re#re.match.groupdict) of the regular expression that matched the message.

### {% linkable_title Comprehensive Configuration Example %}

This example also uses the [matrix `notify` platform](/components/notify.matrix/).

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
      rooms:
        - "#someothertest:matrix.org"
    - expression: "My name is (?P<name>.*)"
      name: introduction

notify:
  - name: matrix_notify
    platform: matrix
    default_room: "#hasstest:matrix.org"

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
        message: 'It looks like you wrote !testword'
  - alias: 'React to an introduction'
    trigger:
      platform: event
      event_type: matrix_command
      event_data:
        command: introduction
    action:
      service: notify.matrix_notify
      data_template:
        message: "Hello {{trigger.event.data.name}}"
```

This configuration will:
- Listen for "!testword" in the room "#someothertest:matrix.org" (and *only*) there. If such a message is encountered, it will answer with "It looks like you wrote !testword" into the "#hasstest:matrix.org" channel.
- Listen in both rooms for any message matching "My name is <any string>" and answer with "Hello <the string>" into "#hasstest:matrix.org".
