---
title: Telegram bot
description: Telegram bot support
ha_category:
  - Notifications
ha_release: 0.42
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: telegram_bot
ha_integration_type: service
ha_quality_scale: gold
ha_codeowners:
  - '@hanwg'
ha_platforms:
  - diagnostics
  - event
  - notify
---

Use Telegram on your mobile or desktop device to send and receive messages or commands to/from your Home Assistant.
This integration creates notification actions to send, edit, receive messages or download attachments from a [Telegram Bot account](https://core.telegram.org/bots).

## Introduction - Telegram bot platforms

Platforms are Telegram bot implementations for managing communications with Telegram for sending and receiving messages.
When setting up this integration, you should specify the platform which fits your environment and use case.

### Broadcast

Telegram implementation to support **sending messages only**. Your Home Assistant instance does not have to be exposed to the internet and there is no polling to receive messages or commands sent to the bot.

### Polling

Telegram chatbot polling implementation.
This implementation fetches data from Telegram via long polling with a timeout of 10 seconds.
(In long polling, the bot will wait until the timeout expires before fetching the data again if there are no updates from Telegram.)

Your Home Assistant instance does not have to be exposed to the internet.

### Webhooks

Telegram chatbot webhooks implementation as described in the Telegram [documentation](https://core.telegram.org/bots/webhooks).
This implementation allows Telegram to push updates directly to your server and requires your Home Assistant instance to be exposed to the internet.

## Prerequisites

### Create a bot in Telegram

To create your first [Telegram bot](https://core.telegram.org/bots#how-do-i-create-a-bot), follow these steps:

1. Tell Telegram to create a bot for you:
   - In Telegram, open a chat with [@BotFather](https://t.me/BotFather) and enter `/newbot`.
   - Follow the instructions on screen and give your bot a name.
   - BotFather will give you a link to your new bot and an HTTP **API token**.
   - Store the **API token** somewhere safe, it will be used for setting up the integration later.
2. Get your **chat ID**:
   - Send any message to [@id_bot](https://t.me/id_bot).
   - Note down the value of the **ID** field in the bot's response. You will need to add this ID to the allowlist after setting up the integration to permit your new bot to send/receive messages with this target.
3. Make the first contact with your new bot (bots are not allowed to initiate contact with users):
   - From the conversation with BotFather, select the link to open a chat.
   - In the chat, enter `/start`.

### Allow Telegram bot to access your Home Assistant files (Optional)

To enable Telegram bot to send local files, you must grant access to it by adding the file's folder to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs).

Example `configuration.yaml`:

```yaml
homeassistant:
  allowlist_external_dirs:
    - "/media"
```

### Allow Telegram to connect to your Home Assistant (Webhooks platform only)

{% note %}
This integration currently does not support self-signed certificates for HTTPS.
If you are using the *Reverse proxy* or *Direct* method, please ensure that your certificates are signed by a public Certificate Authority (CA).
{% endnote %}

If you plan to use the `Webhooks` platform, you will need to allow Telegram to connect to your Home Assistant using one of the following methods:

#### Home Assistant Cloud

If you have a Home Assistant Cloud subscription, you can [enable remote access](https://support.nabucasa.com/hc/articles/26474279202973#to-activate-remote-access-from-outside-your-network) to your Home Assistant.

#### Reverse proxy

If your Home Assistant is behind a publicly accessible reverse proxy (for example NGINX, Caddy, Traefik) with HTTPS enabled, do the following:

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and configure **Home Assistant URL**.
2. In the **HTTP server** section, allow Home Assistant to accept connections from your reverse proxy:
   - Turn on **Trust X-Forwarded-For**.
   - Add the IP address or CIDR network of the reverse proxy to **Trusted proxies**.

#### Direct

If your Home Assistant is publicly accessible, do the following:

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and configure **Home Assistant URL**.
2. In the **HTTP server** section, configure the settings needed for HTTPS, such as **Server port**, **Listen addresses**, **SSL certificate path**, and **SSL key path**.

{% include integrations/config_flow.md %}

{% note %}
When configuring the **API endpoint**, note the following protocol requirements:

- (Default) Official Telegram servers: HTTPS is required.
- Custom API endpoints: Both HTTP and HTTPS are supported.

{% endnote %}

{% configuration_basic %}
Platform:
  description: The Telegram bot type, either `Broadcast`, `Polling` or `Webhooks`.
API key:
  description: The API token of your bot.
API endpoint:
  description: The endpoint of the Telegram bot API server. You should only change this value if you are using a self-hosted or third-party [Telegram bot API server](https://core.telegram.org/bots/api#using-a-local-bot-api-server). Changing this value will result in a *10-minute lockout* on the official Telegram bot API server. Defaults to the official Telegram bot API server at `https://api.telegram.org`.
Proxy URL:
  description: Proxy URL if working behind one, optionally including username and password. (`socks5://username:password@proxy_ip:proxy_port`).
{% endconfiguration_basic %}

### Webhooks configuration

{% note %}
If you are using Home Assistant Cloud, you must include `127.0.0.1` in the **Trusted networks** field because the IP address of incoming requests is not forwarded to your Home Assistant.
{% endnote %}

{% note %}
If you are using a custom **API endpoint**, you must include the IP address or IP range of the server in CIDR notation, like `192.168.0.0/16`, in the **Trusted networks** field.
{% endnote %}

If you have selected the `Webhooks` Telegram bot type, the integration setup will continue with the webhooks configuration step.
{% configuration_basic %}
URL:
  description: Allow to overwrite the external URL from the Home Assistant [configuration](/integrations/homeassistant/#editing-the-general-settings-in-yaml) for different setups (`https://<public_url>:<port>`).
Trusted networks:
  description: Telegram server access ACL as list. Default is `149.154.160.0/20, 91.108.4.0/22`.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Parse mode:
  description: Default parser for messages if not explicit in message data, either `markdown` (legacy), `markdownv2`, `html` or `plain_text`. Refer to Telegram's [formatting options](https://core.telegram.org/bots/api#formatting-options) for more information.
{% endconfiguration_basic %}

## Allowlisting chat IDs via Subentries

A Telegram chat ID is a unique numerical identifier for an individual user (positive) or a chat group (negative).
You must allowlist the chat ID for the Telegram bot before it can send/receive messages for that chat.
To allowlist the chat ID, [retrieve the chat ID](#create-a-bot-in-telegram) and create a subentry:

1. Go to **{% my integrations title="Settings > Devices & services" %}**.
2. Select the Telegram bot integration.
3. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu. Then, select **Add allowed chat ID**.

{% configuration_basic %}
Chat ID:
  description: ID representing the user or group chat to which messages can be sent.
{% endconfiguration_basic %}

## Notifiers

This integration will add a notify {% term entity %} for each configured chat ID.
You can use the `notify.send_message` action to publish notifications.

{% details "Example YAML configuration" %}

```yaml
action: notify.send_message
data:
  message: "Reminder: Have you considered frogs?"
  entity_id: notify.telegram_bot_chat
```

{% enddetails %}

{% include integrations/actions.md %}

## Telegram notification platform

{% warning %}

The notification platform has been marked as legacy and might be deprecated in the future.
Please use [notifiers](./#notifiers) instead.

{% endwarning %}

The [`telegram` notification platform](/integrations/telegram) requires the `telegram_bot` integration to work with, and it's designed to generate a customized shortcut (`notify.USERNAME`) to send notifications (messages, photos, documents, and locations) to a particular `chat_id` with the old syntax, allowing backward compatibility. The data attributes `parse_mode`, `disable_notification`, `message_tag`, `disable_web_page_preview`, and `message_thread_id` are also supported.

The required YAML configuration now reduces to:

```yaml
notify:
  - platform: telegram
    name: NOTIFIER_NAME
    chat_id: USER_CHAT_ID
```

## Event entity

The **Telegram bot** integration provides an {% term event %} {% term entity %} which represents the state of the last message sent or received. It also provides several event attributes that can be used in automations.

### Event: Attachment received

The `telegram_attachment` event is triggered when the bot receives a file.

Example event attributes:

```yaml
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
date: "<message timestamp>"
event_type: "telegram_attachment"
file_id: "<unique identifier for the file>"
file_mime_type: "<MIME type of the file, if available>"
file_name: "<name of the file, if available>"
file_size: "<file size in bytes, if available>"
friendly_name: "<name of the event entity>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
text: "<caption of the file, if available>"
user_id: "<id of the sender>"
```

Example automation:

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_attachment
actions:
  - action: notify.persistent_notification
    data:
      message: >-
        Received a file.
        MIME type   : {{ trigger.to_state.attributes.file_mime_type }}
        Size (bytes): {{ trigger.to_state.attributes.file_size }}
        File ID     : {{ trigger.to_state.attributes.file_id }} 
        File name   : {{ trigger.to_state.attributes.file_name }}
```

### Event: Callback query received

The `telegram_callback` event is triggered when the bot receives a callback query from an inline keyboard button.

{% tip %}
The `id` attribute is used as the `callback_query_id` parameter for the `answer_callback_query` action.
{% endtip %}

Example event attributes:

```yaml
# Callback query always have no args
args: []
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
chat_instance: "<chat instance id>"
command: "<callback query>"
data: "<data associated to action callback>"
event_type: "telegram_callback"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
friendly_name: "<name of the event entity>"
id: "<callback id>"
message: "<message origin of the action callback>"
user_id: "<id of the sender>"
```

Example automation:

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
actions:
  - action: notify.persistent_notification
    data:
      message: >-
        Received callback query.
        Callback ID   : {{ trigger.to_state.attributes.id }}
        Callback query: {{ trigger.to_state.attributes.data }}
```

### Event: Command received

The `telegram_command` event is triggered when the bot receives a command.
A command looks like `/thecommand` or `/othercommand with some args`.

Example event attributes:

```yaml
args: "<any other text following the command>"
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
command: "/thecommand"
date: "<message timestamp>"
event_type: "telegram_command"
friendly_name: "<name of the event entity>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
user_id: "<id of the sender>"
```

Example automation:

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_command
actions:
  - action: notify.persistent_notification
    data:
      message: >-
        Received command.
        Command: {{ trigger.to_state.attributes.command }}
        Args   : {{ trigger.to_state.attributes.args }}
```

### Event: Text received

The `telegram_text` event is triggered when the bot receives a text message (any message that does not begin with `/`).

Example event attributes:

```yaml
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
date: "<message timestamp>"
event_type: "telegram_text"
friendly_name: "<name of the event entity>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
text: "<the text received>"
user_id: "<id of the sender>"
```

Example automation:

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_text
actions:
  - action: notify.persistent_notification
    data:
      message: >-
      Message received.
      Chat ID   : {{ trigger.to_state.attributes.chat_id }}
      First name: {{ trigger.to_state.attributes.from_first }}
      Last name : {{ trigger.to_state.attributes.from_last }}
      Message   : {{ trigger.to_state.attributes.text }}
```

### Event: Message sent

The `telegram_sent` event is triggered when the bot sends a message of any type.

{% tip %}
The `message_id` attribute can be used with the edit, delete and `set_message_reaction` actions to interact with a previously sent message.
{% endtip %}

Example event attributes:

```yaml
bot:
  config_entry_id: "<config entry id of the bot>"
  first_name: "<first name of the bot>"
  id: "<id of the bot>"
  last_name: "<last name of the bot>"
  username: "<username of the bot>"
chat_id: "<origin chat id>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
id: "<message id>"
message_thread_id: "<message thread id>"
user_id: "<id of the sender>"
```

Example automation:

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_sent
actions:
  - action: notify.persistent_notification
    data:
      message: >-
      Bot sent a message.
      Chat ID   : {{ trigger.to_state.attributes.chat_id }}
      Message ID: {{ trigger.to_state.attributes.message_id }}
        
```

### Sample automations with inline keyboards and callback queries

A quick example to show some of the callback capabilities of inline keyboards with a dumb automation consisting in a simple repeater of normal text that presents an inline keyboard with 3 buttons: 'EDIT', 'NO' and 'REMOVE BUTTON':

- Pressing 'EDIT' changes the sent message.
- Pressing 'NO' only shows a brief notification (answering the callback query).
- Pressing 'REMOVE BUTTON' changes the inline keyboard removing that button.

Text repeater:

```yaml
alias: Telegram bot that repeats text
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_text
actions:
  - action: telegram_bot.send_message
    data:
      message: "You said: {{ trigger.to_state.attributes.text }}"
      title: "*Dumb automation*"
      disable_notification: true
      inline_keyboard:
        - Edit message:/edit_msg, Don't:/do_nothing
        - Remove this button:/remove_button
```

Message editor:

```yaml
alias: Telegram bot that edits the last sent message
description: ""
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: command
    state: /edit_msg
actions:
  - action: telegram_bot.answer_callback_query
    data:
      show_alert: true
      message: Editing the message!
      callback_query_id: "{{ trigger.to_state.attributes.id }}"
  - action: telegram_bot.edit_message
    data:
      inline_keyboard:
        - Edit message:/edit_msg, Don't:/do_nothing
        - Remove this button:/remove_button
      message_id: "{{ trigger.to_state.attributes.message.message_id }}"
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      title: "*Message edit*"
      message: >-
        Callback received from {{ trigger.to_state.attributes.from_first }}.
        Message id: {{ trigger.to_state.attributes.message.message_id }}.
        Data: {{ trigger.to_state.attributes.data|replace("_", "\_") }}
```

Keyboard editor:

```yaml
alias: Telegram bot that edits the keyboard
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: command
    state: /remove_button
actions:
  - action: telegram_bot.answer_callback_query
    data:
      callback_query_id: "{{ trigger.to_state.attributes.id }}"
      message: Callback received for editing the inline keyboard!
      show_alert: false
  - action: telegram_bot.edit_replymarkup
    data:
      inline_keyboard:
        - Edit message:/edit_msg, Don't:/do_nothing
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message_id: last
```

Only acknowledges the 'NO' answer:

```yaml
alias: Telegram bot that simply acknowledges
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_callback
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: command
    state: /do_nothing
actions:
  - action: telegram_bot.answer_callback_query
    data:
      message: OK, you said no!
      callback_query_id: "{{ trigger.to_state.attributes.id }}"
```

### Sample automation to receive `chat_id` and `message_id` identifiers of sent messages

The following sample automation stores the `chat_id` and `message_id` of the last sent message using input entities.
These attributes can then be used in other **Telegram bot** actions.

```yaml
alias: Notifications about messages sent by Telegram bot
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your telegram bot event entity
    attribute: event_type
    state: telegram_sent
actions:
  - action: input_number.set_value
    data_template:
      value: "{{ trigger.to_state.attributes.chat_id }}"
    target:
      entity_id: input_number.chat_id # Replace with your input entity
  - action: input_number.set_value
    data_template:
      value: "{{ trigger.to_state.attributes.message_id }}"
    target:
      entity_id: input_number.message_id # Replace with your input entity
```

## Example: send_message with formatted Text

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      title: Example Message
      message: 'Message with *BOLD*, _ITALIC_ and `MONOSPACE` Text'
```

## Example: send_message with message tag

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      title: Example Message
      message: "Message with tag"
      message_tag: "example_tag"
```

## Example: send_message with disabled webpage preview

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      message: >-
        <a href="https://www.home-assistant.io/">HA site</a>
      parse_mode: html
      disable_web_page_preview: true
```

## Example: send_message then edit it after a delay

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      message: testing
    response_variable: response
  - delay:
      seconds: 5
  - action: telegram_bot.edit_message
    data:
      message: done testing
      chat_id: "{{ response.chats[0].chat_id }}"
      message_id: "{{ response.chats[0].message_id }}"
```

## Example: send_message to a topic within a group

```yaml
actions:
  - action: telegram_bot.send_message
    data:
      message: "Message to a topic"
      message_thread_id: 123
```

## Example: send_media_group

```yaml
actions:
  - action: telegram_bot.send_media_group
    data:
      media:
        - url: https://example/image.jpg
          caption: My album
          media_type: photo
        - url: https://example/video.mp4
          media_type: video
```

## Example: automation to send a message and delete after a delay

```yaml
alias: telegram send message and delete
actions:
  - action: telegram_bot.send_message
    data:
      message: testing
    response_variable: response
  - delay:
      seconds: 5
  - repeat:
      sequence:
        - action: telegram_bot.delete_message
          data:
            message_id: "{{ repeat.item.message_id }}"
            chat_id: "{{ repeat.item.chat_id }}"
      for_each: "{{ response.chats }}"
```

## Example: Multi-step automation that reports progress using draft messages

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your Telegram bot event entity
conditions:
  - condition: state
    entity_id: event.bot_update_event # Replace with your Telegram bot event entity
    attribute: text
    state: "Start morning routine"
actions:
  - action: telegram_bot.send_message_draft
    data:
      draft_id: 1
      message: "_Opening shades..._"
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message_thread_id: "{{ trigger.to_state.attributes.message_thread_id }}"
  - action: cover.open_cover
    target:
      entity_id: cover.bedroom
  - action: telegram_bot.send_message_draft
    data:
      draft_id: 1
      message: "_Adjusting thermostat..._"
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message_thread_id: "{{ trigger.to_state.attributes.message_thread_id }}"
  - action: climate.set_temperature
    target:
      entity_id: climate.bedroom
    data:
      temperature: 24
  - action: telegram_bot.send_message
    data:
      message: "Done!"
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message_thread_id: "{{ trigger.to_state.attributes.message_thread_id }}"
```

## Known limitations

The following features are not available in this integration:

- Editing the bot (You can edit the bot using [@BotFather](https://t.me/botfather) on the Telegram app instead)
- All payment related features such as Telegram Premium, Telegram Star and Telegram Gifts
- Telegram Business
- Telegram ADS
- Mini Bot Apps and Mini Bot Store
- Calls and live streaming
- Wallpapers and Themes

## Troubleshooting

{% details "Error sending message: Can't parse entities" %}

When using send actions such as `telegram_bot.send_message` with the `markdownv2` parse mode, the action will fail with the "Can't parse entities" error if the user input in the `message` field contains malformed Markdown syntax.

You can perform any of the following steps to resolve this issue:

- Use the `plain_text` parse mode either by configuring the Telegram bot options or by specifying it via the action's `parse_mode` data attribute.
- Escape special characters in the `message` field with a preceding '\\' character.
- Format your message according to the [formatting options](https://core.telegram.org/bots/api#formatting-options).

{% enddetails %}

{% details "Telegram Webhook bot is unable to receive updates" %}

If your Telegram bot is unable to receive updates (for example, all events other than `telegram_sent` are not triggered), please follow the troubleshooting steps below:

1. Reconfigure your Telegram bot to use the **Polling** platform and test again to verify that the issue is not related to network connectivity between Telegram and your Home Assistant.
2. Check your firewall rules to verify that incoming connections are not blocked.
3. Verify that your webhook URL is public and accessible.

If the issue persists, please refer to the [Webhooks Guide](https://core.telegram.org/bots/webhooks) for more detailed troubleshooting.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
