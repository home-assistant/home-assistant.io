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
ha_category: Telegram chatbot
ha_release: 0.42
---

Telegram chatbot webhooks implementation as described in the Telegram [documentation](https://core.telegram.org/bots/webhooks).

This is one of two bot implementations supported by Telegram. Described by Telegram as the preferred implementation but requires your Home Assistant instance to be exposed to the internet.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
http:
  base_url: <public_url> # the hass https url which is exposed to the internet.

telegram_bot:
  platform: webhooks
  api_key: telegram api key
  allowed_chat_ids:
    - 12345
    - 67890
```

Configuration variables:

- **allowed_chat_ids** (*Required*): A list of user in the `user_id` Telegram format enabled to interact to webhook
- **api_key** (*Required*): The API token of your bot.
- **trusted_networks** (*Optional*): Telegram server access ACL as list. Defaults to `149.154.167.197-233`.

To get your `chat_id` and `api_key` follow the instructions [here](/components.notify.telegram) .

Full configuration sample:

```yaml
# Example configuration.yaml entry
http:
  base_url: <public_url>

telegram_bot:
  platform: webhooks
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
