---
layout: page
title: "Telegram"
description: "Instructions on how to add Telegram notifications to Home Assistant."
date: 2015-10-09 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: Notifications
ha_release: 0.7.5
---


The `telegram` platform uses [Telegram](https://web.telegram.org) to deliver notifications from Home Assistant to your Android device, your Windows phone, or your iOS device.

The requirements are:

- You need a [Telegram bot](https://core.telegram.org/bots). Please follow those [instructions](https://core.telegram.org/bots#6-botfather) to create one and get the token for your bot. Keep in mind that bots are not allowed to contact users. You need to make the first contact with your user. Meaning that you need to send a message to the bot from your user.
- You need to configure a [Telegram bot in Home Assistant](/components/telegram_bot) and define there your API key and the allowed chat ids to interact with.
- The `chat_id` of an allowed user.

To retrieve your `chat_id`, contact any of the Telegram bots created for this purpose (@myidbot, @get_id_bot)

The quickest way to retrieve your `chat_id` is visiting [https://api.telegram.org/botYOUR_API_TOKEN/getUpdates](https://api.telegram.org/botYOUR_API_TOKEN/getUpdates) or to use `$ curl -X GET https://api.telegram.org/botYOUR_API_TOKEN/getUpdates`. Replace `YOUR_API_TOKEN` with your actual token.

The result set will include your chat ID as `id` in the `from` section:

```json
{
	"ok": true,
	"result": [{
		"update_id": 254199982,
		"message": {
			"message_id": 27,
			"from": {
				"id": 123456789,
				"first_name": "YOUR_FIRST_NAME YOUR_NICK_NAME",
				"last_name": "YOUR_LAST_NAME",
				"username": "YOUR_NICK_NAME"
			},
			"chat": {
				"id": 123456789,
				"first_name": "YOUR_FIRST_NAME YOUR_NICK_NAME",
				"last_name": "YOUR_LAST_NAME",
				"username": "YOUR_NICK_NAME",
				"type": "private"
			},
			"date": 1678292650,
			"text": "test"
		}
	}]
}
```

Another way to get your chat ID directly is described below. Start your Python interpreter from the command-line:

```python
$ python3
>>> import telegram
>>> bot = telegram.Bot(token='YOUR_API_TOKEN')
>>> chat_id = bot.getUpdates()[-1].message.chat_id
>>> print(chat_id)
123456789
```

To enable Telegram notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for the Telegram Bot
telegram_bot:
  - platform: polling
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    allowed_chat_ids:
      - CHAT_ID_1
      - CHAT_ID_2
      - CHAT_ID_3

# Example configuration.yaml entry for the notifier
notify:
  - name: NOTIFIER_NAME
    platform: telegram
    chat_id: CHAT_ID_2
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **chat_id** (*Required*): The chat ID of your user.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### {% linkable_title Text message %}

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: '*Send a message*'
    message: 'That's an example that _sends_ a *formatted* message with a custom inline keyboard.'
    data:
      inline_keyboard:
        - 'Task 1:/command1, Task 2:/command2'
        - 'Task 3:/command3, Task 4:/command4'
```

Configuration variables:

- **message** (*Required*): Message text.
- **title** (*Optional*): Will be composed as '%title\n%message'.
- **keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom keyboard.
- **inline_keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.

### {% linkable_title Photo support %}

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send an images
    message: That's an example that sends an image.
    data:
      photo:
        - url: http://192.168.1.28/camera.jpg
          username: admin
          password: secrete
        - file: /tmp/picture.jpg
          caption: Picture Title xy
        - url: http://somebla.ie/video.png
          caption: I.e. for a Title
```

Configuration variables:

- **url** or **file** (*Required*): For local or remote path to an image.
- **caption** (*Optional*): The title of the image.
- **username** (*Optional*): Username for a URL which require HTTP authentication.
- **password** (*Optional*): Username for a URL which require HTTP authentication.
- **authentication** (*Optional*): Set to 'digest' to use HTTP digest authentication, defaults to 'basic'.
- **keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom keyboard.
- **inline_keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.

<p class='note'>
Since Home Assistant version 0.48 you have to [whitelist the source folder](/docs/configuration/basic/) of the file you want to include in the notification.

```yaml
configuration.yaml
...
homeassistant:
  whitelist_external_dirs:
    - /tmp
    - /home/kenji/data
```
</p>

### {% linkable_title Video support %}

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send a video
    message: That's an example that sends a video.
    data:
      video:
        - url: http://192.168.1.28/camera.mp4
          username: admin
          password: secrete
        - file: /tmp/video.mp4
          caption: Video Title xy
        - url: http://somebla.ie/video.mp4
          caption: I.e. for a Title
```

Configuration variables:

- **url** or **file** (*Required*): For local or remote path to a video.
- **caption** (*Optional*): The title of the video.
- **username** (*Optional*): Username for a URL which require HTTP authentication.
- **password** (*Optional*): Username for a URL which require HTTP authentication.
- **authentication** (*Optional*): Set to 'digest' to use HTTP digest authentication, defaults to 'basic'.
- **keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom keyboard.
- **inline_keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.

### {% linkable_title Document support %}

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send a document
    message: That's an example that sends a document and a custom keyboard.
    data:
      document:
        file: /tmp/whatever.odf
        caption: Document Title xy
    keyboard:
      - '/command1, /command2'
      - '/command3, /command4'
```

Configuration variables:

- **url** or **file** (*Required*): For local or remote path to a document.
- **caption** (*Optional*): The title of the document.
- **username** (*Optional*): Username for a URL which require HTTP authentication.
- **password** (*Optional*): Username for a URL which require HTTP authentication.
- **authentication** (*Optional*): Set to 'digest' to use HTTP digest authentication, defaults to 'basic'.
- **keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom keyboard.
- **inline_keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.

### {% linkable_title Location support %}

```yaml
...

action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send location
    message: Location updated.
    data:
      location:
        latitude: 32.87336
        longitude: 117.22743
```

Configuration variables:

- **latitude** (*Required*): The latitude to send.
- **longitude** (*Required*): The longitude to send.
- **keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom keyboard.
- **inline_keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.
