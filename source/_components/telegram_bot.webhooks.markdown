---
layout: page
title: "Telegram webhooks"
description: "Telegram webhooks support"
date: 2017-04-05 18:50
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: Notifications
ha_release: 0.42
---

Telegram chatbot webhooks implementation as described in the Telegram [documentation](https://core.telegram.org/bots/webhooks).

Using Telegrams `setWebhook` method your bot's webhook URL should be set to `https://<public_url>:<port>/api/telegram_webhooks`.

This is one of two bot implementations supported by Telegram. Described by Telegram as the preferred implementation but requires your Home Assistant instance to be exposed to the internet.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
http:
  base_url: <public_url> # the Home Assistant https url which is exposed to the internet.

telegram_bot:
  - platform: webhooks
    api_key: telegram api key
    parse_mode: html
    allowed_chat_ids:
      - 12345
      - 67890
```

Configuration variables:

- **allowed_chat_ids** (*Required*): A list of ids representing the users and group chats that are authorized to interact with the webhook.
- **api_key** (*Required*): The API token of your bot.
- **trusted_networks** (*Optional*): Telegram server access ACL as list. Defaults to `149.154.167.197-233`.
- **parse_mode** (*Optional*): Default parser for messages if not explicit in message data: 'html' or 'markdown'. Default is 'markdown'.
- **proxy_url** (*Optional*): Proxy url if working behind one (`socks5://proxy_ip:proxy_port`)
- **proxy_params** (*Optional*): Proxy configuration parameters, as dict, if working behind a proxy (`username`, `password`, etc.)
- **url** (*Optional*): Allow to overwrite the `base_url` from the [`http`](/components/http/) component for different configurations (`https://<public_url>:<port>`).

To get your `chat_id` and `api_key` follow the instructions [here](/components/notify.telegram). As well as authorizing the chat, if you have added your bot to a group you will also need to authorize any user that will be interacting with the webhook. When an unauthorized user tries to interact with the webhook Home Assistant will raise an error ("Incoming message is not allowed"), you can easily obtain the users id by looking in the "from" section of this error message.

Full configuration sample:

```yaml
# Example configuration.yaml entry
http:
  base_url: <public_url>

telegram_bot:
  - platform: webhooks
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    trusted_networks:
      - 149.154.167.197/32
      - 149.154.167.198/31
      - 149.154.167.200/29
      - 149.154.167.208/28
      - 149.154.167.224/29
      - 149.154.167.232/31
    allowed_chat_ids:
      - 12345
      - 67890
```
