---
title: Telegram client
description: Instructions on how to add Telegram client to Home Assistant.
ha_category:
  - Social
  - Sensor
  - Notifications
ha_release: 2024.8.0
ha_iot_class: Cloud Pull
ha_domain: telegram_client
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@lufton'
---

The `telegram_client` {% term integration %} uses [Telethon library](https://docs.telethon.dev/) to connect Home Assistant with your [Telegram](https://telegram.org/) account in order to send, edit and delete messages and also capture and propagate events to event bus.

## Two client types

This integration allows you to authorize either [as a user](#user-config-flow) or [as a bot](#bot-config-flow). Depending on your needs you can pick witch one is more preferable to you. Each type of client has its own benefits and limitations. For example `User` can send messages to any other user (depends on privacy setting), whereas `Bot` can't. But `Bot` can send messages with keyboards, whereas `User` can't.
But don't worry, you can create several instances of Telegram client with different types and get benefits of both.

## Obtaining Telegram `api_id` and `api_hash`

To register Telegram app you need to have active account.

1. Navigate to [App configuration page](https://my.telegram.org/apps)
2. Sign in
3. Give your app a title and short name and save changes
4. Copy `api_id` and `api_hash`, you will need them later

## Obtaining Telegram bot `token` (for bot client)

1. Start conversation with [BotFather](https://t.me/BotFather)
2. Send a command `/newbot` or select from menu
3. Enter your bot name
4. Enter your bot username
5. Copy `token`, you will need it later

## User config flow

1. Navigate to [Telegram client integrations page](https://my.home-assistant.io/redirect/config_flow_start?domain=telegram_client)
2. Enter previously saved `api_id` and `api_hash`, select `User` as a **Client type**
3. Press **Submit** button
4. Enter the phone number of your account in international format (+XXXXXXXXXXXX)
5. Press **Submit** button
6. Enter the code you received from Telegram
7. Press **Submit** button
8. If your account is protected with 2FA, then enter your `password` and press **Submit** button

## Bot config flow

1. Navigate to [Telegram client integrations page](https://my.home-assistant.io/redirect/config_flow_start?domain=telegram_client)
2. Enter previously saved `api_id` and `api_hash`, select `Bot` as a **Client type**
3. Press **Submit** button
4. Enter previously saved `token`
5. Press **Submit** button

## Options flow

Telegram client integration supports options on events that are going to propagate to Home Assistant event bus via **Configure** button on [this page](https://my.home-assistant.io/redirect/integration/?domain=telegram_client). You can select witch kinds of [events](#events) you want to be able to listen for.
Each event has its own set of settings. Please refer to [Telethon events documentation page](https://docs.telethon.dev/en/stable/modules/events.html) for full explanation.

## Services

* [telegram_client.send_messages](/#service-telegram-clientsend-messages) – Send message(s)
* [telegram_client.edit_message](/#service-telegram-clientedit-message) – Edit message
* [telegram_client.delete_messages](/#service-telegram-clientdelete-messages) – Delete message(s)

### Service `telegram_client.send_messages`

Send messages to user, group, channel or bot.
| Service data attribute | Optional | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | no       | Config entry ID to run service on.<br/><br/>*Defaults to first one.*                                                                                                                                                                                                                                                                                                               |
| `target_username`      | no       | Username or list of usernames to send message to.<br/>Example (my saved messages):<br/>`me`<br/>Example (bot):<br/>`BotFather`<br/>Example (user):<br/>`bigfoot`<br/><br/>*At least one of `target_username` or `target_user_id` is required.*                                                                                                                                     |
| `target_id`            | no       | User/group ID or list of user/group IDs to send message to.<br/>Example (user):<br/>`100000000`<br/>Example (group):<br/>`-100000000`<br/><br/>*At least one of `target_username` or `target_user_id` is required.*                                                                                                                                                                |
| `message`              | no       | Message text to send. Could contain `html` or `markdown` formatting. See `parse_mode` parameter.<br/><br/>*Optional when sending files.*                                                                                                                                                                                                                                           |
| `reply_to`             | no       | Mark the message as a reply to a message with provided ID. Also can be used to send a message in a specific group topic (provide topic ID).                                                                                                                                                                                                                                        |
| `parse_mode`           | no       | Message parse mode. Could be either `html` or `markdown`.<br/><br/>*Defaults to `plain text`.*                                                                                                                                                                                                                                                                                     |
| `link_preview`         | no       | Enables previews for links in the message.                                                                                                                                                                                                                                                                                                                                         |
| `file`                 | no       | Path or paths relative to `config` directory to send with a message.<br/>Example (1 file):<br/>`tts/ff5789a925ee97c09d1462a53b4416c21a26e128.mp3`<br/>Example (2 files):<br/>`["configuration.yaml", "secrets.yaml"]`                                                                                                                                                              |
| `force_document`       | no       | Attach file(s) as document(s) rather than image/audio/video.                                                                                                                                                                                                                                                                                                                       |
| `clear_draft`          | no       | Clears draft message to selected target after sending the message.                                                                                                                                                                                                                                                                                                                 |
| `keyboard`             | no       | Button, list of buttons or list of lists of buttons to show under the message.<br/>Example (1 button):<br/>`Accept`<br/>Example (1 row of 2 buttons):<br/>`["Yes", "No"]`<br/>Example (2 rows of 2 button each):<br/>`[["Like", "Dislike"], ["Share", "Subscribe"]]`                                                                                                               |
| `inline_keyboard`      | no       | Button, list of buttons or list of lists of buttons to show under the message. Each button could be a dictionary with `text` and `data` keys.<br/>Example (1 button):<br/>`Agree`<br/>Example (1 row of 2 buttons):<br/>`[{"text": "Accept", "data": "accept"}, {"text": "Decline", "data": "decline"}]`<br/>Example (2 rows of 2 button each):<br/>`[["-1", "+1"], ["-5", "+5"]]` |
| `keyboard_resize`      | no       | Resizes keyboard to minimize space used.<br/><br/>*Can be used only if `keyboard` is defined.*                                                                                                                                                                                                                                                                                     |
| `keyboard_single_use`  | no       | Hides keyboard after user press any button.<br/><br/>*Can be used only if `keyboard` is defined.*                                                                                                                                                                                                                                                                                  |
| `silent`               | no       | Sends message without sound notification.                                                                                                                                                                                                                                                                                                                                          |
| `supports_streaming`   | no       | Whether the sent video supports streaming or not.                                                                                                                                                                                                                                                                                                                                  |
| `schedule`             | no       | Schedule message delivery.<br/><br/>*Can be used only in `User` mode. Bots can't schedule message delivery.*                                                                                                                                                                                                                                                                       |
| `comment_to`           | no       | Similar to `reply_to`, but replies in the linked group of a broadcast channel instead.                                                                                                                                                                                                                                                                                             |
| `nosound_video`        | no       | Displays video without audio track as a video. Otherwise Telegram will attempt to display such video as an animated gif.                                                                                                                                                                                                                                                           |

### Service `telegram_client.edit_message`

Edits text of a previously sent message to user, group, channel or bot.
| Service data attribute | Optional | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | no       | Config entry ID to run service on.<br/><br/>*Defaults to first one.*                                                                                                                                                                                                                                                                                                               |
| `target_username`      | no       | Username to edit message for.<br/>Example (my saved messages):<br/>`me`<br/>Example (bot):<br/>`BotFather`<br/>Example (user):<br/>`bigfoot`<br/><br/>*Required if target message was sent to a group or a channel.*                                                                                                                                                               |
| `target_id`            | no       | User/group ID to edit message for.<br/>Example (user):<br/>`100000000`<br/>Example (group):<br/>`-100000000`<br/><br/>*Required if target message was sent to a group or a channel.*                                                                                                                                                                                               |
| `message`              | yes      | Message ID to edit.                                                                                                                                                                                                                                                                                                                                                                |
| `text`                 | yes      | New message text.                                                                                                                                                                                                                                                                                                                                                                  |
| `parse_mode`           | no       | Message parse mode. Could be either `html` or `markdown`.<br/><br/>*Defaults to `plain text`.*                                                                                                                                                                                                                                                                                     |
| `link_preview`         | no       | Enables previews for links in the message.                                                                                                                                                                                                                                                                                                                                         |
| `file`                 | no       | Path or paths relative to `config` directory to send with a message.<br/>Example (1 file):<br/>`tts/ff5789a925ee97c09d1462a53b4416c21a26e128.mp3`<br/>Example (2 files):<br/>`["configuration.yaml", "secrets.yaml"]`                                                                                                                                                              |
| `force_document`       | no       | Attach file(s) as document(s) rather than image/audio/video.                                                                                                                                                                                                                                                                                                                       |
| `keyboard`             | no       | Button, list of buttons or list of lists of buttons to show under the message.<br/>Example (1 button):<br/>`Accept`<br/>Example (1 row of 2 buttons):<br/>`["Yes", "No"]`<br/>Example (2 rows of 2 button each):<br/>`[["Like", "Dislike"], ["Share", "Subscribe"]]`                                                                                                               |
| `inline_keyboard`      | no       | Button, list of buttons or list of lists of buttons to show under the message. Each button could be a dictionary with `text` and `data` keys.<br/>Example (1 button):<br/>`Agree`<br/>Example (1 row of 2 buttons):<br/>`[{"text": "Accept", "data": "accept"}, {"text": "Decline", "data": "decline"}]`<br/>Example (2 rows of 2 button each):<br/>`[["-1", "+1"], ["-5", "+5"]]` |
| `keyboard_resize`      | no       | Resizes keyboard to minimize space used.<br/><br/>*Can be used only if `keyboard` is defined.*                                                                                                                                                                                                                                                                                     |
| `keyboard_single_use`  | no       | Hides keyboard after user press any button.<br/><br/>*Can be used only if `keyboard` is defined.*                                                                                                                                                                                                                                                                                  |
| `supports_streaming`   | no       | Whether the sent video supports streaming or not.                                                                                                                                                                                                                                                                                                                                  |
| `schedule`             | no       | Schedule message delivery.<br/><br/>*Can be used only in `User` mode. Bots can't schedule message delivery.*                                                                                                                                                                                                                                                                       |

### Service `telegram_client.delete_messages`

| Service data attribute | Optional | Description                                                                                                                                                                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config_entry_id`      | no       | Config entry ID to run service on.<br/><br/>*Defaults to first one.*                                                                                                                                                   |
| `target_username`      | no       | Username to delete message for.<br/>Example (my saved messages):<br/>`me`<br/>Example (bot):<br/>`BotFather`<br/>Example (user):<br/>`bigfoot`<br/><br/>*Required if target message was sent to a group or a channel.* |
| `target_id`            | no       | User/group ID to delete message for.<br/>Example (user):<br/>`100000000`<br/>Example (group):<br/>`-100000000`<br/><br/>*Required if target message was sent to a group or a channel.*                                 |
| `message_ids`          | yes      | Message ID(s) to delete.                                                                                                                                                                                               |
| `revoke`               | no       | Deletes message from everyone.                                                                                                                                                                                         |

## Events

* `telegram_client_new_message` – [New message event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.newmessage.NewMessage.Event)
* `telegram_client_message_edited` – [Message edited event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.messageedited.MessageEdited.Event)
* `telegram_client_message_read` – [Message read event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.messageread.MessageRead.Event)
* `telegram_client_message_deleted` – [Message deleted event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.messagedeleted.MessageDeleted.Event)
* `telegram_client_callback_query` – [Callback query event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.callbackquery.CallbackQuery.Event)
* `telegram_client_inline_query` – [Inline query event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.inlinequery.InlineQuery.Event)
* `telegram_client_chat_action` – [Chat action client](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.chataction.ChatAction.Event)
* `telegram_client_user_update` – [User update event](https://docs.telethon.dev/en/stable/modules/events.html#telethon.events.userupdate.UserUpdate.Event)

## Sensors

* `ID`
* `Username`
* `Last name` (for `User` mode)
* `First name`
* `Phone` (for `User mode`)

## Binary sensors

* `Restricted`
* `Premium`

## Automation examples

Based on events described above you can create all sorts of automations.

### Respond to a message from a specific user that matches pattern

```yaml
alias: Respond to a greeting message from mom
trigger:
  - platform: event
    event_type: telegram_client_new_message
    event_data:
      message:
        from_id:
          user_id: YOUR_MOM_TELEGRAM_USER_ID
condition:
  - condition: template
    value_template: >-
      {{ trigger.event.data.message.message | regex_match('hello', ignorecase=True) }}
action:
  - service: telegram_client.send_messages
    data:
      config_entry_id: "{{ trigger.event.data.config_entry_id }}"
      message: Hello, mom!
      target_id: "{{ trigger.event.data.message.from_id.user_id }}"
```

### Announce every edited message in specific chat

```yaml
alias: Blame "Poker planing" chat message editor
trigger:
  - platform: event
    event_type: telegram_client_message_edited
    event_data:
      chat_id: POKER_PLANNING_CHAT_ID
condition:
  - condition: template
    value_template: >-
      {{ trigger.event.data.message.from_id.user_id != trigger.event.data.me.id }}
action:
  - service: telegram_client.send_messages
    data:
      config_entry_id: "{{ trigger.event.data.config_entry_id }}"
      message: You're not suppose to change your estimation!
      target_id: "{{ trigger.event.data.chat_id }}"
      reply_to: "{{ trigger.event.data.message.id }}"
```

### Delete latest message that was read by specific user

```yaml
alias: Secret chat with Bob
trigger:
  - platform: event
    event_type: telegram_client_message_read
    event_data:
      chat_id: BOBS_USER_ID
action:
  - delay:
      seconds: 10
  - service: telegram_client.delete_messages
    data:
      config_entry_id: "{{ trigger.event.data.config_entry_id }}"
      message_ids: "{{ trigger.event.data.max_id }}"
mode: restart

```

### Send response when user in specific chat clicks inline button

```yaml
alias: Respond to callback query
trigger:
  - platform: event
    event_type: telegram_client_callback_query
    event_data:
      sender_id: POKER_PLANNING_CHAT_ID
action:
  - service: telegram_client.send_messages
    data:
      config_entry_id: "{{ trigger.event.data.config_entry_id }}"
      target_id: "{{ trigger.event.data.chat_id }}"
      message: >-
        {{ trigger.event.data.sender.first_name }}, thanks for selecting "{{ trigger.event.data.data }}"!
      reply_to: "{{ trigger.event.data.message_id }}"
```

### Send message when user joins specific group

```yaml
alias: Greet new joiner
trigger:
  - platform: event
    event_type: telegram_client_chat_action
    event_data:
      chat_id: CHAT_ID
      user_joined: true
action:
  - service: telegram_client.send_messages
    data:
      config_entry_id: "{{ trigger.event.data.config_entry_id }}"
      message: >-
        Welcome, {{ trigger.event.data.user.first_name }} {{ trigger.event.data.user.last_name }}!
      target_id: "{{ trigger.event.data.chat_id }}"
```

### Send response when specific user is typing

```yaml
alias: Spy eye
trigger:
  - platform: event
    event_type: telegram_client_user_update
    event_data:
      user_id: BOBS_USER_ID
      typing: true
action:
  - service: telegram_client.send_messages
    data:
      config_entry_id: "{{ trigger.event.data.config_entry_id }}"
      message: Whats up, man?
      target_id: "{{ trigger.event.data.chat_id }}"
  - delay:
      seconds: 30
mode: restart
```

## Side note

This integration is based on Telethon library. It has complete documentation on all [methods](https://docs.telethon.dev/en/stable/modules/client.html#telethon.client.messages.MessageMethods) and [events](https://docs.telethon.dev/en/stable/modules/events.html) it can handle. So in case you are not sure what that or other method or event field is for, you can refer to official documentation.
