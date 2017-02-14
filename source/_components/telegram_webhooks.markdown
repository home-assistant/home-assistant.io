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
ha_category: Notifications
ha_release: 0.39
---

Telegram webhooks support as described in [docs](https://core.telegram.org/bots/webhooks).

With new component `telegram_webhooks` it is possible to send commands to Home Assistant via a Telegram bot. It works well with Telegram notification: webhooks receive commands from user and notify send messages to user.

Webhook responds only to:

- users listed in configuration, in telegram user_id format.
- telegram servers (listed in webhooks [docs](https://core.telegram.org/bots/webhooks)) specified in trusted_networks


To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
http:
  base_url: <public_url>

telegram_webhooks:
  user_id:
    user1: USER_ID
```

Configuration variables:

- **user_id** (*Required*): A list of user in the `user_id` Telegram format enabled to interact to webhook
- **api_key** (*Optional*): The API token of your bot. If present, the webhook of bot is automatically registered to `public_url/api/telegram_webhooks`. If not present, manual registration is required.
- **trusted_networks** (*Optional*): Telegram server access ACL as list. Defaults to `149.154.167.197-233`.

Full configuration sample:

```yaml
# Example configuration.yaml entry
http:
  base_url: <public_url>

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

### {% linkable_title Configuration samples %}

Telegram webhooks raise an event `telegram.command` with a payload.

```json{
 'command': '/thecommand'
 'args': 'strings after command'
 'user_id': 12345
}

Automation example that realize simple test to command/notify interaction.

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

Example that show keyboard interaction with `notify.telegram`

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

and an automation to trigger a related command "/siren".

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
      seconds: 10
  - service: homeassistant.turn_off
    entity_id: switch.vision_zm1601eu5_battery_operated_siren_switch_9_0
```
