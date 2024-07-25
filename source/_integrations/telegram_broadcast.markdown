---
title: "Telegram broadcast"
description: "Telegram support to send messages only"
ha_category:
  - Notifications
ha_release: 0.48
ha_domain: telegram_bot
---

Telegram implementation to support **sending messages only**. Your Home Assistant instance does not have to be exposed to the internet and there is no polling to receive messages or commands sent to the bot.

Information on how to send a message via the `telegram_bot.send_message` action can be found [here](/integrations/telegram_bot/#action-telegram_botsend_message).

## Configuration

To integrate this into Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
telegram_bot:
  - platform: broadcast
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - 123456789 # example id of a user
      - -987654321  # example id of a group, starts with a -
```

{% configuration %}
allowed_chat_ids:
  description: A list of ids representing the users and group chats to which messages can be send. Default the message will be send to the first alllowed chat_id. By using the `target` action data attribute the message can be send to other chat_ids from the list.
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
