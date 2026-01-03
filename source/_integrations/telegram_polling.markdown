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

To integrate this into Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
telegram_bot:
  - platform: polling
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - 123456789 # example id of a user
      - -987654321  # example id of a group, starts with a -
```

{% configuration %}
allowed_chat_ids:
  description: A list of ids representing the users and group chats that are authorized to interact with the bot.
  required: true
  type: list
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
  description: Proxy URL if working behind one, optionally including username and password. (`socks5://username:password@proxy_ip:proxy_port`).
  required: false
  type: string
{% endconfiguration %}

To get your `chat_id` and `api_key` follow the instructions [here](/integrations/telegram).
