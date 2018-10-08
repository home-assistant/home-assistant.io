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

This component allows you to send messages to [Google Hangouts](https://hangouts.google.com) conversations, as well as to react to messages in conversations. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered.

## {% linkable_title Setup the component via the frontend %}

Menu: *Configuration* -> *Integrations*
  
Configure the integration:
* Enter your **Google Mail Address** and **Password**
* If you secured your account with 2-factor authentication you will be asked for a 2-factor authentication token.

<p class='note'>
You can't write messages to yourself or get notifications in a group, if "you" write the message. The best way is to create a new Google Hangouts account for this integration.<br>
<br>
If you secured your account with 2-factor authentication: Only verification by app or SMS are supported. There is no support for verification by prompt on your phone.<br>
<br>
If you are sure your email and password are correct, but the component says the login is invalid, wait a few hours and try again. It might be that Google asks for a captcha which we can't support. Google does not provide official support for using bots with Google Hangouts, that's why we have to work around this.
</p>

The authentication token will be generated and stored internally.

```yaml
# Example configuration.yaml entry
hangouts:
  intents:
    HangoutsHelp:
      sentences:
        - Help
    LivingRoomTemperature:
      sentences:
        - What is the temperature in the living room
      conversations:
        - id: CONVERSATION_ID1
        - id: CONVERSATION_ID2
  default_conversations:
    - id: CONVERSATION_ID1
  error_suppressed_conversations:
    - id: CONVERSATION_ID2

```
{% configuration %}
intents:
  description: "Intents that the hangouts component should understand."
  required: false
  type: map
  default: empty
  keys:
    '`<INTENT NAME>`':
      description: "Single intent entry."
      required: true
      type: map
      keys:
        sentences:
          description: "Sentences that should trigger this intent."
          required: true
          type: list
        conversations:
          description: "A list of conversations that triggers this intent. If no conversation are given, every conversations triggers the intent."
          required: false
          type: [map]
          default: empty
          keys:
            id:
              description: "Specifies the id of the conversation. *The conversation id can be obtained from the `hangouts.conversations` entity.*"
              required: true
              type: string
default_conversations:
  description: "A list of conversations that are used for intents if no `conversations` entry for an intent is given."
  required: false
  type: [map]
  default: empty
  keys:
    id:
      description: "Specifies the id of the conversation. *The conversation id can be obtained from the `hangouts.conversations` entity.*"
      required: true
      type: string
error_suppressed_conversations:
  description: "A list of conversations that won't get a message if the intent is not known."
  required: false
  type: [map]
  default: empty
  keys:
    id:
      description: "Specifies the id of the conversation. *The conversation id can be obtained from the `hangouts.conversations` entity.*"
      required: true
      type: string
{% endconfiguration %}

The conversations has to be precreated, the conversation id can be obtained from the `hangouts.conversations` entity. Make sure to use quotes around the conversation id or alias to escape special characters (`!`, and `#`) in YAML.

The intent `HangoutsHelp` is part of the component and return a list of all sentences the component unterstand in this conversation.

## {% linkable_title Adding sentences %}

```yaml
# The Hangouts component
hangouts:
  intents:
    HassLightSet:
      sentences:
        - Toggle {name}.
      conversations:
        - id: CONVERSATION_ID1
    Ping:
      sentences:
        - How many Conversation do you know
  error_suppressed_conversations:
    - id: CONVERSATION_ID2

intent_script:
  Ping:
    speech:
      text: I know {% raw %}{{ states.hangouts.conversations.state }}{% endraw %} conversations

```

This configuration will:
- Toggle the light in the given location in a specific conversation.
- Return the conversations the bot know.

## {% linkable_title Adding advanced custom sentences %}

Sentences can contain slots (marked with curly braces: `{name}`) and optional words (marked with square brackets: `[the]`). The values of slots will be passed on to the intent and are available inside the templates.

The following configuration can handle the following sentences:

 - Change the lights to red
 - Change the lights to green
 - Change the lights to blue
 - Change the lights to the color red
 - Change the lights to the color green
 - Change the lights to the color blue

```yaml
# Example configuration.yaml entry
hangouts:
  intents:
    ColorLight:
      sentences:
        - Change the lights to [the color] {color}
{% raw %}
intent_script:
  ColorLight:
    speech:
      text: Changed the lights to {{ color }}.
    action:
      service: light.turn_on
      data_template:
        rgb_color:
          - "{% if color == 'red' %}255{% else %}0{% endif %}"
          - "{% if color == 'green' %}255{% else %}0{% endif %}"
          - "{% if color == 'blue' %}255{% else %}0{% endif %}"
{% endraw %}
```

## {% linkable_title Services %}

### {% linkable_title Service `hangouts.update` %}

Updates the list of conversations.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
|                        |          |                                                  |

### {% linkable_title Service `hangouts.send_message` %}

Sends a message to the given conversations.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| target                 | List of targets with id or name. [Required] | [{"id": "UgxrXzVrARmjx_C6AZx4AaABAagBo-6UCw"}, {"name": "Test Conversation"}] |
| message                | List of message segments, only the "text" field is required in every segment. [Required] | [{"text":"test", "is_bold": false, "is_italic": false, "is_strikethrough": false, "is_underline": false, "parse_str": false, "link_target": "http://google.com"}, ...] |
| data                   | Extra options | {"image_file": "path"} / {"image_url": "url"} |

