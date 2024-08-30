---
title: "Telegram webhooks"
description: "Telegram webhooks support"
ha_category:
  - Notifications
ha_release: 0.42
ha_iot_class: Cloud Push
ha_domain: telegram_bot
---

Telegram chatbot webhooks implementation as described in the Telegram [documentation](https://core.telegram.org/bots/webhooks).

By default this integration sets your bot's webhook URL automatically to `https://<external_url>/api/telegram_webhooks` with the external_url of your Home Assistant [configuration](/integrations/homeassistant/#external_url) using Telegrams `setWebhook` method.

This is one of two bot implementations supported by Telegram. Described by Telegram as the preferred implementation but requires your Home Assistant instance to be exposed to the internet.
The other implementation method is [Telegram polling](/integrations/telegram_polling/), for which your Home Assistant instance does not have to be exposed to the internet.

## Configuration

To integrate this into Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
telegram_bot:
  - platform: webhooks
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
  default: "`markdown`"
  type: string
proxy_url:
  description: Proxy URL if working behind one, optionally including username and password. (`socks5://username:password@proxy_ip:proxy_port`).
  required: false
  type: string
url:
  description: Allow to overwrite the external URL from the Home Assistant [configuration](/integrations/homeassistant/#editing-the-general-settings-in-yaml) for different setups (`https://<public_url>:<port>`).
  required: false
  type: string
trusted_networks:
  description: Telegram server access ACL as list.
  required: false
  type: string
  default: 149.154.160.0/20, 91.108.4.0/22
{% endconfiguration %}

To get your `chat_id` and `api_key` follow the instructions [here](/integrations/telegram). As well as authorizing the chat, if you have added your bot to a group you will also need to authorize any user that will be interacting with the webhook. When an unauthorized user tries to interact with the webhook Home Assistant will raise an error ("Incoming message is not allowed"), you can easily obtain the users id by looking in the "from" section of this error message.

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
telegram_bot:
  - platform: webhooks
    api_key: YOUR_API_KEY
    parse_mode: html
    trusted_networks:
      - 149.154.160.0/20
      - 91.108.4.0/22
    allowed_chat_ids:
      - 123456789 # example id of a user
      - -987654321  # example id of a group, starts with a -
```
