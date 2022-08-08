---
title: Google Chat
description: Google chatbot support
ha_category:
  - Hub
  - Notifications
ha_release: 0.77
ha_config_flow: true
ha_domain: hangouts
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
---

This integration allows you to send messages to [Google Chat](https://chat.google.com) conversations, as well as to react to messages in conversations. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered. Home Assistant will impersonate a Smartisan YQ603 phone which will then show up in your Google devices.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)

{% include integrations/config_flow.md %}

## Manual Authentication

If you are sure your email and password are correct, but the integration says the login is invalid then you would need to use the manual authentication method.

To use the manual method, first you would need to obtain an authorization code (see <a href="#steps-to-obtain-authorization-code">instructions below</a> for details).

Once the code is obtained fill in the form with your email, password and the authorization code to complete authentication.

### Steps to obtain Authorization Code:

1. To obtain your authorization code, open [this URL](https://accounts.google.com/o/oauth2/programmatic_auth?scope=https%3A%2F%2Fwww.google.com%2Faccounts%2FOAuthLogin+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=936475272427.apps.googleusercontent.com&device_name=hangups) in your browser.
2. Log into your Google account normally.
3. You should be redirected to a loading screen. Copy the `oauth_code` cookie value set by this page and paste it here.

To obtain the `oauth_code` cookie value, follow the steps below:

*Note:* If the `oauth_code` cookie is not showing in Chrome, try Firefox.

* Press F12 to open developer tools.
* Select the "Application" (Chrome) or "Storage" (Firefox) tab.
* In the sidebar, expand "Cookies" and select `https://accounts.google.com`
* In the cookie list, double click on the value for the `oauth_code` cookie to select it, and copy the value. This is the authorization code

<div class='note'>
You can't write messages to yourself or get notifications in a group, if "you" write the message. The best way is to create a new Google Chat account for this integration.<br>
<br>
If you secured your account with 2-factor authentication: Only verification by app or SMS are supported. There is no support for verification by prompt on your phone.<br>
<br>
The manual authentication work-around is a result of unofficial support for using bots in Chat from Google.
</div>

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
  description: "Intents that the chat integration should understand."
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

The intent `HangoutsHelp` is part of the integration and return a list of all sentences the integration understands in this conversation.

## Adding sentences

{% raw %}

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
      text: I know {{ states('hangouts.conversations') }} conversations
```

{% endraw %}

This configuration will:

- Toggle the light in the given location in a specific conversation.
- Return the conversations the bot know.

## Adding advanced custom sentences

Sentences can contain slots (marked with curly braces: `{name}`) and optional words (marked with square brackets: `[the]`). The values of slots will be passed on to the intent and are available inside the templates.

The following configuration can handle the following sentences:

- Change the lights to red
- Change the lights to green
- Change the lights to blue
- Change the lights to the color red
- Change the lights to the color green
- Change the lights to the color blue

{% raw %}

```yaml
# Example configuration.yaml entry
hangouts:
  intents:
    ColorLight:
      sentences:
        - Change the lights to [the color] {color}

intent_script:
  ColorLight:
    speech:
      text: Changed the lights to {{ color }}.
    action:
      service: light.turn_on
      data:
        rgb_color:
          - "{% if color == 'red' %}255{% else %}0{% endif %}"
          - "{% if color == 'green' %}255{% else %}0{% endif %}"
          - "{% if color == 'blue' %}255{% else %}0{% endif %}"
```

{% endraw %}

## Services

### Service `hangouts.update`

Updates the list of conversations.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
|                        |          |                                                  |

### Service `hangouts.send_message`

Sends a message to the given conversations.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| target                 | No | List of targets with id or name. |
| message                | No | List of message segments, only the "text" field is required in every segment. |
| data                   | Yes | Either a path to an image file or a URL to an image. |

### Service `hangouts.reconnect`

Reconnects the Google Chat bot.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
|                        |          |                                                  |

## Advanced

### Automatic reconnect after IP change

The Google Chat integration can't detect if your IP address changes, so it can't automatically reconnect to the Google servers. This is a workaround for this problem.

{% raw %}

```yaml
sensor:
  - platform: rest
    resource: https://api.ipify.org/?format=json
    name: External IP
    value_template: "{{ value_json.ip }}"
    scan_interval: 10

automation:
  - alias: "Reconnect Chat"
    trigger:
      - entity_id: sensor.external_ip
        platform: state
    condition:
      - condition: template
        value_template: "{{ trigger.from_state.state != trigger.to_state.state }}"
      - condition: template
        value_template: '{{ not is_state("sensor.external_ip", "unavailable") }}'
    action:
      - service: hangouts.reconnect
```

{% endraw %}

## Notifications

The `hangouts` platform allows you to deliver notifications from Home Assistant to [Google Chat](https://chat.google.com/) conversations. Conversations can be both direct as well as group chats.

To enable Google Chat notifications in your installation, you first need to configure the Hangouts component. Then, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry  
notify:
  - name: NOTIFIER_NAME
    platform: hangouts
    default_conversations:
      - id: CONVERSATION_ID1
      - id: CONVERSATION_ID2
```

{% configuration %}
name:
  description: "Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
default_conversations:
  description: "The conversations all messages will be sent to, when no other target is given."
  required: true
  type: [map]
  keys:
    id:
      description: "Specifies the id of the conversation. *The conversation id can be obtained from the `hangouts.conversations` entity.*"
      required: true
      type: string
{% endconfiguration %}

### Finding the conversation ID

The conversations has to be precreated, the conversation id can be obtained from the `hangouts.conversations` entity, this can be found in **Developer Tools** -> **States**. Using your web browsers search tool to find the `hangouts.conversations` entity. You will find something like below.

```json
0: {
  "id": "<Hangout ID>",
  "name": "A simple hangout",
  "users": [
    "Steve",
    "Jo"
  ]
}
```

This may have more if the account is in multiple hangout conversations, for configuring the bot to be in a conversation you will need the ID that would be where `<Hangout ID>` is in that example. Make sure to use quotes around the conversation id or alias to escape special characters (`!`, and `#`) in YAML.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
