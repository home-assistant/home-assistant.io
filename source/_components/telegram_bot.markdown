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
ha_release: 0.42
---

Use Telegram on your mobile device to send messages or commands to your Home Assistant.


A command looks like `/thecommand`, or `/othercommand with some args`.

When received by hass it will fire a `telegram_command` event on the event bus with the following `event_data`:

```yaml
command: "/thecommand"
args: "<any other text following the command>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
```

Any other message not starting with `/` will be processed as simple text, firing a `telegram_text` event on the event bus with the following `event_data`:

```yaml
text: "some text received"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
```

if the message is sent from a [press in a inline button](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), for example, a callback query is received, and hass will fire a `telegram_callback` event with:

```yaml
data: "<data associated to action callback>"
message: <message origin of the action callback>
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
id: "<unique id of the callback>"
chat_instance: "<chat instance>"
```

### {% linkable_title Configuration samples %}


Simple ping pong example.

```yaml
alias: 'telegram bot that reply pong to ping'
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

Example that show keyboard interaction with `notify.telegram`

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

### {% linkable_title Sample automations with callback queries and inline keyboards %}

Quick example to show some of the callback capabilities of inline keyboards with a dumb automation consisting in a simple repeater of normal text that presents an inline keyboard with 3 buttons: 'EDIT', 'NO' and 'REMOVE BUTTON':
- Pressing 'EDIT' changes the sended message.
- Pressing 'NO' only shows a brief notification (answering the callback query).
- Pressing 'REMOVE BUTTON' changes the inline keyboard removing that button.

Text repeater:
```yaml
- alias: 'telegram bot that repeats text'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_text
  action:
    - service: notify.telegram
      data_template:
        title: '*Dumb automation*'
        target: '{{ trigger.event.data.user_id }}'
        message: 'You said: ``` {{ trigger.event.data.text }} ```'
        data:
          disable_notification: true
          inline_keyboard:
            - '/edit,/NO'
            - '/remove button'
```

Message editor:
```yaml
- alias: 'telegram bot last sended msg edit'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_callback
    event_data:
      data: '/edit'
  action:
    - service: notify.telegram
      data_template:
        target: '{{ trigger.event.data.user_id }}'
        message: 'Editing the message!'
        data:
          callback_query:
            callback_query_id: '{{ trigger.event.data.id }}'
            show_alert: true
    - service: notify.telegram
      data_template:
        title: '*Message edit*'
        target: '{{ trigger.event.data.user_id }}'
        message: >
          Callback received from {{ trigger.event.data.from_first }}.
          Message id: {{ trigger.event.data.message.message_id }}.
          Data: ``` {{ trigger.event.data.data }} ```
        data:
          edit_message:
            message_id: '{{ trigger.event.data.message.message_id }}'
          disable_notification: true
          inline_keyboard:
            - '/edit,/NO'
            - '/remove button'
```

Keyboard editor:
```yaml
- alias: 'telegram bot keyboard edit'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_callback
    event_data:
      data: '/remove button'
  action:
    - service: notify.telegram
      data_template:
        target: '{{ trigger.event.data.user_id }}'
        message: 'Callback received for editing the inline keyboard!'
        data:
          callback_query:
            callback_query_id: '{{ trigger.event.data.id }}'
            show_alert: false
    - service: notify.telegram
      data_template:
        target: '{{ trigger.event.data.user_id }}'
        message: ''  # this is needed for the general hass notify service
        data:
          edit_replymarkup:
            message_id: 'last'
          disable_notification: true
          inline_keyboard:
            - '/edit,/NO'

```

Only acknowledges the 'NO' answer:
```yaml
- alias: 'telegram bot simply acknowledges'
  hide_entity: true
  trigger:
    platform: event
    event_type: telegram_callback
    event_data:
      data: '/NO'
  action:
    - service: notify.telegram
      data_template:
        target: '{{ trigger.event.data.user_id }}'
        message: 'OK, you said no!'
        data:
          callback_query:
            callback_query_id: '{{ trigger.event.data.id }}'
            show_alert: false
```

For a more complex usage of the `telegram_bot` capabilities, using [AppDaemon](https://home-assistant.io/docs/ecosystem/appdaemon/tutorial/) is advised.