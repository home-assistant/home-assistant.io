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


A command looks like `/thecommand`

When received by hass it will fire a `telegram_command` event on the event bus with the following `event_data`:

```yaml
command: "/thecommand"
args: "<any other text following the command>"
from_first: "<first name of the sender>"
from_last: "<last name of the sender>"
user_id: "<id of the sender>"
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
