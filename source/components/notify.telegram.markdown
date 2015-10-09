---
layout: page
title: "Telegram notification support"
description: "Instructions how to add Telegram notifications to Home Assistant."
date: 2015-10-09 18:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/telegram.png' class='brand pull-right' />
The telegram platform uses [Telegram](https://web.telegram.org) to delivery notifications from Home Assistant to your Android device, your Windows phone, or your iOS device.

The requirement are:

- You need a [Telegram bot](https://core.telegram.org/bots). Please follow those [instructions](https://core.telegram.org/bots#botfather) to create one and get the token. Keep in mind that bots are not allowed to contact users. You need to make the first contactwith your user. 
- The chat ID of an user

An easy way to get your chat ID is described below:

```python
import telegram
bot = telegram.Bot(token='YOUR_API_TOKEN')
chat_id = bot.getUpdates()[-1].message.chat_id
print(chat_id)
```

To enable Telegram notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: telegram
  # Get those by creating a new application, event, and tracker on https://instapush.im
  api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  chat_id: YOUR_CHAT_ID
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created.
The default value is `notify`. The notifier will bind to the service
`notify.NOTIFIER_NAME`.
- **api_key** (*Required*): The API token of your bot.
- **chat_id** (*Required*: The chat ID of your user.

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
