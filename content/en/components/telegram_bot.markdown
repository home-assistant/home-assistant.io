---
layout: page
title: "Telegram chatbot"
description: "Telegram chatbot support"
date: 2017-04-05 18:50
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: Hub
ha_release: 0.42
ha_iot_class: "Cloud Push"
---

Use Telegram on your mobile or desktop device to send and receive messages or commands to/from your Home Assistant.

This component creates notification services to send, or edit previously sent, messages from a [Telegram Bot account](https://core.telegram.org/bots) configured either with the [polling](/components/telegram_bot.polling/) method or with the [webhooks](/components/telegram_bot.webhooks/) one, and trigger events when receiving messages.

If you don't need to receive messages, you can use the [broadcast](/components/telegram_bot.broadcast/) platform instead.

## {% linkable_title Notification services %}

Available services: `send_message`, `send_photo`, `send_document`, `send_location`, `send_sticker`, `edit_message`, `edit_replymarkup`, `edit_caption` and `answer_callback_query`.

### {% linkable_title Service `telegram_bot.send_message` %}

Send a notification.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `message`                 |       no | Message body of the notification. |
| `title`                   |      yes | Optional title for your notification. Will be composed as '%title\n%message'. |
| `target`                  |      yes | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id. |
| `parse_mode`              |      yes | Parser for the message text: `html` or `markdown`. |
| `disable_notification`    |      yes | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False. |
| `disable_web_page_preview`|      yes | True/false for disable link previews for links in the message. |
| `keyboard`                |      yes | List of rows of commands, comma-separated, to make a custom keyboard. Example: `["/command1, /command2", "/command3"]` |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.send_photo` and `telegram_bot.send_sticker` %}

Send a photo.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `url`                     |       no | Remote path to an image. |
| `file`                    |       no | Local path to an image.  |
| `caption`                 |      yes | The title of the image. |
| `username`                |      yes | Username for a URL which requires HTTP basic authentication. |
| `password`                |      yes | Password for a URL which requires HTTP basic authentication. |
| `authentication`          |      yes | Define which authentication method to use. Set to `digest` to use HTTP digest authentication. Defaults to `basic`. |
| `target`                  |      yes | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id. |
| `disable_notification`    |      yes | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False. |
| `keyboard`                |      yes | List of rows of commands, comma-separated, to make a custom keyboard. Example: `["/command1, /command2", "/command3"]` |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.send_video` %}

Send a video.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `url`                     |       no | Remote path to a video. |
| `file`                    |       no | Local path to a video.  |
| `caption`                 |      yes | The title of the video. |
| `username`                |      yes | Username for a URL which requires HTTP basic authentication. |
| `password`                |      yes | Password for a URL which requires HTTP basic authentication. |
| `authentication`          |      yes | Define which authentication method to use. Set to `digest` to use HTTP digest authentication. Defaults to `basic`. |
| `target`                  |      yes | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id. |
| `disable_notification`    |      yes | True/false to send the message silently. iOS users and web users will not receive a notification. Android users will receive a notification with no sound. Defaults to False. |
| `keyboard`                |      yes | List of rows of commands, comma-separated, to make a custom keyboard. Example: `["/command1, /command2", "/command3"]` |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.send_document` %}

Send a document.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `url`                     |       no | Remote path to a document. |
| `file`                    |       no | Local path to a document.  |
| `caption`                 |      yes | The title of the document. |
| `username`                |      yes | Username for a URL which requires HTTP basic authentication. |
| `password`                |      yes | Password for a URL which requires HTTP basic authentication. |
| `authentication`          |      yes | Define which authentication method to use. Set to `digest` to use HTTP digest authentication. Defaults to `basic`. |
| `target`                  |      yes | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id. |
| `disable_notification`    |      yes | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False. |
| `keyboard`                |      yes | List of rows of commands, comma-separated, to make a custom keyboard. Example: `["/command1, /command2", "/command3"]` |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.send_location` %}

Send a location.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `latitude`                |       no | The latitude to send. |
| `longitude`               |       no | The longitude to send.  |
| `target`                  |      yes | An array of pre-authorized chat_ids or user_ids to send the notification to. Defaults to the first allowed chat_id. |
| `disable_notification`    |      yes | True/false for send the message silently. iOS users and web users will not receive a notification, Android users will receive a notification with no sound. Defaults to False. |
| `keyboard`                |      yes | List of rows of commands, comma-separated, to make a custom keyboard. Example: `["/command1, /command2", "/command3"]` |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.edit_message` %}

Edit a previously sent message in a conversation.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `message_id`              |       no | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: `{{ trigger.event.data.message.message_id }}`. You can use `"last"` to refer to the last message sent to `chat_id`. |
| `chat_id`                 |       no | The chat_id where to edit the message.  |
| `message`                 |       no | Message body of the notification. |
| `title`                   |      yes | Optional title for your notification. Will be composed as '%title\n%message'. |
| `parse_mode`              |      yes | Parser for the message text: `html` or `markdown`. |
| `disable_web_page_preview`|      yes | True/false for disable link previews for links in the message. |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.edit_caption` %}

Edit the caption of a previously sent message.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `message_id`              |       no | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: `{{ trigger.event.data.message.message_id }}`. You can use `"last"` to refer to the last message sent to `chat_id`. |
| `chat_id`                 |       no | The chat_id where to edit the caption.  |
| `caption`                 |       no | Message body of the notification. |
| `disable_web_page_preview`|      yes | True/false for disable link previews for links in the message. |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.edit_replymarkup` %}

Edit the inline keyboard of a previously sent message.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `message_id`              |       no | Id of the message to edit. When answering a callback from a pressed button, the id of the origin message is in: `{{ trigger.event.data.message.message_id }}`. You can use `"last"` to refer to the last message sent to `chat_id`. |
| `chat_id`                 |       no | The chat_id where to edit the reply_markup.  |
| `disable_web_page_preview`|      yes | True/false for disable link previews for links in the message. |
| `inline_keyboard`         |      yes | List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data. Example: `["/button1, /button2", "/button3"]` or `[[["Text btn1", "/button1"], ["Text btn2", "/button2"]], [["Text btn3", "/button3"]]]` |

### {% linkable_title Service `telegram_bot.answer_callback_query` %}

Respond to a callback query originated by clicking on an online keyboard button. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `message`                 |       no | Unformatted text message body of the notification. |
| `callback_query_id`       |       no | Unique id of the callback response. In the `telegram_callback` event data: `{{ trigger.event.data.id }}` |
| `show_alert`              |      yes | True/false for show a permanent notification. Defaults to False. |

### {% linkable_title Service `telegram_bot.delete_message` %}
Delete a previously sent message in a conversation.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `message_id`              |       no | Id of the message to delete. When answering a callback from a pressed button, the id of the origin message is in: `{{ trigger.event.data.message.message_id }}`. You can use `"last"` to refer to the last message sent to `chat_id`. |
| `chat_id`                 |       no | The chat_id where to delete the message.  |

## {% linkable_title `telegram` notification platform %}

The [`telegram` notification platform](/components/notify.telegram/) requires the `telegram_bot` component to work with, and it's designed to generate a customized shortcut (`notify.USERNAME`) to send notifications (messages, photos, documents and locations) to a particular `chat_id` with the old syntax, allowing backward compatibility.

The required yaml configuration now reduces to:

```yaml
notify:
  - name: NOTIFIER_NAME
    platform: telegram
    chat_id: USER_CHAT_ID
```

## {% linkable_title Event triggering %}

A command looks like `/thecommand`, or `/othercommand with some args`.

When received by Home Assistant it will fire a `telegram_command` event on the event bus with the following `event_data`:

```yaml
command: "/thecommand"
args: "<any other text following the command>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
chat_id: "<origin chat id>"
chat: "<chat info>"
```

Any other message not starting with `/` will be processed as simple text, firing a `telegram_text` event on the event bus with the following `event_data`:

```yaml
text: "some text received"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
chat_id: "<origin chat id>"
chat: "<chat info>"
```

If the message is sent from a [press from an inline button](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), for example, a callback query is received, and Home Assistant will fire a `telegram_callback` event with:

```yaml
data: "<data associated to action callback>"
message: <message origin of the action callback>
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
id: "<unique id of the callback>"
chat_instance: "<chat instance>"
chat_id: "<origin chat id>"
```

### {% linkable_title Configuration samples %}

Simple ping pong example.

```yaml
alias: 'Telegram bot that reply pong to ping'
hide_entity: true
trigger:
  platform: event
  event_type: telegram_command
  event_data:
    command: '/ping'
action:
  - service: notify.notify
    data:
      message: 'pong'
```

An example that shows keyboard interaction with `notify.telegram`

```yaml
trigger:
  platform: event
  event_type: telegram_command
  event_data:
    command: '/start'
action:
  - service: notify.telegram
    data:
      message: 'commands'
      data:
        keyboard:
          - '/ping, /alarm'
          - '/siren'
```

and an automation to trigger a related command "/siren".

```yaml
trigger:
  platform: event
  event_type: telegram_command
  event_data:
    command: '/siren'
action:
  - service: homeassistant.turn_on
    entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
  - delay:
      seconds: 10
  - service: homeassistant.turn_off
    entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
```

An example to show the use of event_data in action:

{% raw %}
```yaml
- alias: 'Kitchen Telegram Speak'
  trigger:
    platform: event
    event_type: telegram_command
    event_data:
      command: '/speak'
  action:
    - service: notify.kitchen_echo
      data_template:
        message: >
          Message from {{ trigger.event.data["from_first"] }}. {% for state in trigger.event.data["args"] %} {{ state }} {% endfor %}
```
{% endraw %}

### {% linkable_title Sample automations with callback queries and inline keyboards %}

A quick example to show some of the callback capabilities of inline keyboards with a dumb automation consisting in a simple repeater of normal text that presents an inline keyboard with 3 buttons: 'EDIT', 'NO' and 'REMOVE BUTTON':

- Pressing 'EDIT' changes the sent message.
- Pressing 'NO' only shows a brief notification (answering the callback query).
- Pressing 'REMOVE BUTTON' changes the inline keyboard removing that button.

Text repeater:

{% raw %}
```yaml
- alias: 'Telegram bot that repeats text'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_text
  action:
    - service: telegram_bot.send_message
      data_template:
        title: '*Dumb automation*'
        target: '{{ trigger.event.data.user_id }}'
        message: 'You said: {{ trigger.event.data.text }}'
        disable_notification: true
        inline_keyboard:
          - "Edit message:/edit_msg, Don't:/do_nothing"
          - "Remove this button:/remove button"
```
{% endraw %}

Message editor:

{% raw %}
```yaml
- alias: 'Telegram bot that edits the last sent message'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_callback
    event_data:
      data: '/edit_msg'
  action:
    - service: telegram_bot.answer_callback_query
      data_template:
        callback_query_id: '{{ trigger.event.data.id }}'
        message: 'Editing the message!'
        show_alert: true
    - service: telegram_bot.edit_message
      data_template:
        message_id: '{{ trigger.event.data.message.message_id }}'
        chat_id: '{{ trigger.event.data.chat_id }}'
        title: '*Message edit*'
        inline_keyboard:
          - "Edit message:/edit_msg, Don't:/do_nothing"
          - "Remove this button:/remove button"
        message: >
          Callback received from {{ trigger.event.data.from_first }}.
          Message id: {{ trigger.event.data.message.message_id }}.
          Data: {{ trigger.event.data.data }}
```
{% endraw %}

Keyboard editor:

{% raw %}
```yaml
- alias: 'Telegram bot that edits the keyboard'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_callback
    event_data:
      data: '/remove button'
  action:
    - service: telegram_bot.answer_callback_query
      data_template:
        callback_query_id: '{{ trigger.event.data.id }}'
        message: 'Callback received for editing the inline keyboard!'
    - service: telegram_bot.edit_replymarkup
      data_template:
        message_id: 'last'
        chat_id: '{{ trigger.event.data.chat_id }}'
        inline_keyboard:
          - "Edit message:/edit_msg, Don't:/do_nothing"
```
{% endraw %}

Only acknowledges the 'NO' answer:

{% raw %}
```yaml
- alias: 'Telegram bot that simply acknowledges'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_callback
    event_data:
      data: '/do_nothing'
  action:
    - service: telegram_bot.answer_callback_query
      data_template:
        callback_query_id: '{{ trigger.event.data.id }}'
        message: 'OK, you said no!'
```
{% endraw %}

For a more complex usage of the `telegram_bot` capabilities, using [AppDaemon](/docs/ecosystem/appdaemon/tutorial/) is advised.

This is how the previous 4 automations would be through a simple AppDaemon app:

```python
import appdaemon.appapi as appapi

class TelegramBotEventListener(appapi.AppDaemon):
    """Event listener for Telegram bot events."""

    def initialize(self):
        """Listen to Telegram Bot events of interest."""
        self.listen_event(self.receive_telegram_text, 'telegram_text')
        self.listen_event(self.receive_telegram_callback, 'telegram_callback')

    def receive_telegram_text(self, event_id, payload_event, *args):
        """Text repeater."""
        assert event_id == 'telegram_text'
        user_id = payload_event['user_id']
        msg = 'You said: ``` %s ```' % payload_event['text']
        keyboard = [[("Edit message", "/edit_msg"),
                     ("Don't", "/do_nothing")],
                    [("Remove this button", "/remove button")]]
        self.call_service('telegram_bot/send_message',
                          title='*Dumb automation*',
                          target=user_id,
                          message=msg,
                          disable_notification=True,
                          inline_keyboard=keyboard)

    def receive_telegram_callback(self, event_id, payload_event, *args):
        """Event listener for Telegram callback queries."""
        assert event_id == 'telegram_callback'
        data_callback = payload_event['data']
        callback_id = payload_event['id']
        chat_id = payload_event['chat_id']
        # keyboard = ["Edit message:/edit_msg, Don't:/do_nothing",
        #             "Remove this button:/remove button"]
        keyboard = [[("Edit message", "/edit_msg"),
                     ("Don't", "/do_nothing")],
                    [("Remove this button", "/remove button")]]

        if data_callback == '/edit_msg':  # Message editor:
            # Answer callback query
            self.call_service('telegram_bot/answer_callback_query',
                              message='Editing the message!',
                              callback_query_id=callback_id,
                              show_alert=True)

            # Edit the message origin of the callback query
            msg_id = payload_event['message']['message_id']
            user = payload_event['from_first']
            title = '*Message edit*'
            msg = 'Callback received from %s. Message id: %s. Data: ``` %s ```'
            self.call_service('telegram_bot/edit_message',
                              chat_id=chat_id,
                              message_id=msg_id,
                              title=title,
                              message=msg % (user, msg_id, data_callback),
                              inline_keyboard=keyboard)

        elif data_callback == '/remove button':  # Keyboard editor:
            # Answer callback query
            self.call_service('telegram_bot/answer_callback_query',
                              message='Callback received for editing the '
                                      'inline keyboard!',
                              callback_query_id=callback_id)

            # Edit the keyboard
            new_keyboard = keyboard[:1]
            self.call_service('telegram_bot/edit_replymarkup',
                              chat_id=chat_id,
                              message_id='last',
                              inline_keyboard=new_keyboard)

        elif data_callback == '/do_nothing':  # Only Answer to callback query
            self.call_service('telegram_bot/answer_callback_query',
                              message='OK, you said no!',
                              callback_query_id=callback_id)
```
