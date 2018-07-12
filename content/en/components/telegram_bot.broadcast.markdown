---
layout: page
title: "Telegram broadcast"
description: "Telegram support to send messages only"
date: 2017-06-24 11:20
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: Notifications
ha_release: 0.48
---

Telegram implementation to support **sending messages only**. Your Home Assistant instance does not have to be exposed to the Internet and there is no polling to receive messages sent to the bot.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

telegram_bot:
  - platform: broadcast
    api_key: <telegram api key>
    allowed_chat_ids:
      - 12345
      - 67890
```

Configuration variables:

- **allowed_chat_ids** (*Required*): A list of user in the `user_id` Telegram format enabled to interact to webhook
- **api_key** (*Required*): The API token of your bot.
- **parse_mode** (*Optional*): Default parser for messages if not explicit in message data: 'html' or 'markdown'. Default is 'markdown'.
- **proxy_url** (*Optional*): Proxy url if working behind one (`socks5://proxy_ip:proxy_port`)
- **proxy_params** (*Optional*): Proxy configuration parameters, as dict, if working behind a proxy (`username`, `password`, etc.)

To get your `chat_id` and `api_key` follow the instructions [here](/components/notify.telegram/).

