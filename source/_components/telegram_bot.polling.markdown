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
ha_category: Notifications
ha_release: 0.42
---

Telegram chatbot polling implementation.

One of two bot implementations supported by Telegram. Your Home Assistant does not have to be exposed to the internet.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

telegram_bot:
  - platform: polling
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - 12345
      - 67890
```

{% configuration %}
allowed_chat_ids:
  description: A list of user in the `user_id` Telegram format enabled to interact to webhook
  required: true
  type: list
api_key:
  description: The API token of your bot.
  required: true
  type: string
parse_mode:
  description: "Default parser for messages if not explicit in message data: 'html' or 'markdown'."
  required: false
  default: markdown
  type: string
proxy_url:
  description: Proxy url if working behind one (`socks5://proxy_ip:proxy_port`)
  required: false
  type: string
proxy_params:
  description: Proxy configuration parameters, as dict, if working behind a proxy (`username`, `password`, etc.)
  required: false
  type: string
{% endconfiguration %}

To get your `chat_id` and `api_key` follow the instructions [here](/components/notify.telegram/).
