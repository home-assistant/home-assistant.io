---
title: "Telegram polling"
description: "Telegram polling support"
ha_category:
  - Notifications
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_domain: telegram_bot
---

Telegram chatbot polling implementation.

This is one of two bot implementations supported by Telegram. Your Home Assistant instance does not have to be exposed to the internet.
The other implementation method is [Telegram webhooks](/integrations/telegram_webhooks/), described by Telegram as the preferred implementation but requires your Home Assistant instance to be exposed to the internet.

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
telegram_bot:
  - platform: polling
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - chat_id: 123456789 # example id of a user
        user_id: 3328b4936eccd805bd65063c0562dcd2
      - chat_id: -987654321  # example id of a group, starts with a -
```

{% configuration %}
allowed_chat_ids:
  description: A list of ids representing the users and group chats that are authorized to interact with the bot.
  required: true
  type: list
chat_id:
  description: Telegram chat id. Users would have a positive id and groups would have a negative id.
  required: true
  type: integer
user_id:
  description: Home Assistant user id to use as part of the event context.
  required: false
  type: string
api_key:
  description: The API token of your bot.
  required: true
  type: string
parse_mode:
  description: Default parser for messages if not explicit in message data, either `html` or `markdown`.
  required: false
  type: string
  default: "`markdown`"
proxy_url:
  description: Proxy URL if working behind one (`socks5://proxy_ip:proxy_port`).
  required: false
  type: string
proxy_params:
  description: Proxy configuration parameters, as dict, if working behind a proxy (`username`, `password`, etc.).
  required: false
  type: string
{% endconfiguration %}

To get your `chat_id` and `api_key` follow the instructions [here](/integrations/telegram).
