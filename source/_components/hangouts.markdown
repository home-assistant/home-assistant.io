---
layout: page
title: "Google Hangouts"
description: "Hangouts chatbot support"
date: 2018-08-18 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hangouts.png
ha_category: Hub
ha_release: 0.77
---

This component allows you to send messages to [Google Hangouts](http://hangouts.google.com) conversations, as well as to react to messages in conversations. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered.

```yaml
# Example configuration.yaml entry
hangouts:
  email: my_google_user@gmail.com
  password: supersecurepassword
  commands:
    - word: testword
      conversations:
        - name: CONVERSATION_NAME
        - id: CONVERSATION_ID
    - expression: "My name is (?P<name>.*)"
      name: introduction
```
{% configuration %}
email:
  description: "The Google email address that Home Assistant should use to log in. Please note also that the '@' character has a special meaning in YAML, so this must always be given in quotes."
  required: true
  type: string
password:
  description: The password for your Google account.
  required: true
  type: string
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
      description: "Specifies a regular expression (in python regexp syntax) that the bot should listen to. The bot will react to any message that matches the regular expression."
      required: false
      type: string
    name:
      description: "The name of the command. This will be an attribute of the event that is fired when this command triggers."
      required: true
      type: string
    conversations:
      description: "A list of conversations that the bot should listen for this command in. If this is not given, all conversations are used."
      required: false
      type: [map]
      default: empty
      keys:
        id:
          description: "Specifies the id of the conversation."
          required: false
          type: string
        name:
          description: "Specifies the name of the conversation."
          required: false
          type: string
{% endconfiguration %}

### {% linkable_title Event Data %}

If a command is triggered, a `hangouts_command` event is fired. The event contains the name of the command in the `command` field.

If the command is a word command, the `data` field contains a list of the command's arguments, i.e., everything that stood behind the word, split at spaces. If the command is an expression command, the `data` field contains the [group dictionary](https://docs.python.org/3.6/library/re.html?highlight=re#re.match.groupdict) of the regular expression that matched the message.

There are these additional fields: `conversation_id`, `user_id` and `user_name`.

### {% linkable_title Comprehensive Configuration Example %}

```yaml
# The Hangouts component
hangouts:
  email: my_google_user@gmail.com
  password: supersecurepassword
  commands:
    - word: testword
      conversations:
        - name: "someothertest"
    - expression: "My name is (?P<name>.*)"
      name: introduction

automation:
  - alias: 'React to !testword'
    trigger:
      platform: event
      event_type: hangouts_command
      event_data:
        command: testword
    action:
      service: hangouts.send_message
      data_template:
        target: 
          - name: "hasstest"
        message: 
          - text: 'It looks like you wrote testword'
  - alias: 'React to an introduction'
    trigger:
      platform: event
      event_type: hangouts_command
      event_data:
        command: introduction
    action:
      service: hangouts.send_message
      data_template:
        target: 
          - id: '{{ trigger.event.data.conversation_id}}'
        message: 
          - text: "Hello {{ trigger.event.data.data.name }}"

```

This configuration will:
- Listen for "testword" in the room "someothertest" (and only) there. 
  If such a message is encountered, it will answer with "It looks like you wrote testword" into the "hasstest" conversation.
- Listen in all conversations for any message matching “My name is (any name)" and answer with "Hello (the given name)" into the same conversation.
