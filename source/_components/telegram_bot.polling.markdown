---
layout: page
title: "Telegram polling"
description: "Telegram polling support"
date: 2017-04-05 18:50
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: Telegram chatbot
ha_release: 0.42
---

Telegram chatbot polling implementation.

One of two bot implementations supported by Telegram. Your hass does not have to be exposed to the internet.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

telegram_bot:
  platform: polling
  api_key: <telegram api key>
  allowed_chat_ids:
    - 12345
    - 67890
```

Configuration variables:

- **allowed_chat_ids** (*Required*): A list of user in the `user_id` Telegram format enabled to interact to webhook
- **api_key** (*Required*): The API token of your bot.

To get your `chat_id` and `api_key` follow the instructions [here](/components/notify.telegram) .

