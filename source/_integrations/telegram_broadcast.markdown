---
title: "Telegram broadcast"
description: "Telegram support to send messages only"
ha_category:
  - Notifications
ha_release: 0.48
ha_domain: telegram_bot
---

Telegram implementation to support **sending messages only**. Your Home Assistant instance does not have to be exposed to the internet and there is no polling to receive messages or commands sent to the bot.

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
telegram_bot:
  - platform: broadcast
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - 123456789 # example id of a user or a group
```

{% configuration %}
allowed_chat_ids:
  description: The id representing the user or group to which messages can be send. The message will only be sent to the first id in the list.
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
  description: Proxy URL if working behind one (`socks5://proxy_ip:proxy_port`).
  required: false
  type: string
proxy_params:
  description: Proxy configuration parameters, as dict, if working behind a proxy (`username`, `password`, etc.).
  required: false
  type: string
{% endconfiguration %}

To get your `chat_id` and `api_key` follow the instructions [here](/integrations/telegram).
