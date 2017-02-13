---
layout: page
title: "Telegram webhooks"
description: "Telegram webhooks support"
date: 2017-02-13 18:50
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: "Other"
ha_release: 0.39
---

Telegram webhooks support as described in [docs](https://core.telegram.org/bots/webhooks).

With new component `telegram_webhooks` it is possible to send commands to home assistant via telegram bot. It works well with telegram notification: webhooks receive commands from user and notify send messages to user.
Webhook responds only to:
  * users listed in configuration, in telegram user_id format.
  * telegram servers (listed in webhooks [docs](https://core.telegram.org/bots/webhooks)) specified in trusted_networks


To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:
```yaml
telegram_webhooks:
  api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  trusted_networks:
    - 149.154.167.197/32
    - 149.154.167.198/31
    - 149.154.167.200/29
    - 149.154.167.208/28
    - 149.154.167.224/29
    - 149.154.167.232/31
  user_id:
    user1: USER_ID
    user2: USER_ID
```

Telegram webhooks raise an event `telegram.command` with a payload
```json
{
 'command': '/thecommand'
 'args': 'strings after command'
 'user_id': 12345
}
```

Automation example that realize simple test to command/notify interaction
```yaml
alias: 'telegram bot that reply pong to ping'
hide_entity: true
trigger:
  platform: event
  event_type: telegram.command
  event_data:
    command: '/ping'
action:
  - service: notify.telegram
    data:
      message: 'pong'
```

Example that show keyboard interaction with notify.telegram
```yaml
trigger:
  platform: event
  event_type: telegram.command
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

... and an automation to trigger a related command "/siren"
```yaml
trigger:
  platform: event
  event_type: telegram.command
  event_data:
    command: '/siren'
action:
  - service: homeassistant.turn_on
    entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
  - delay: 
      seconds: "{{ trigger.event.data.args }}"
  - service: homeassistant.turn_off
    entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
```
