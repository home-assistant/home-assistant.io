---
title: Telegram
description: Instructions on how to add Telegram notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.7.5
ha_iot_class: Cloud Polling
ha_domain: telegram
ha_platforms:
  - notify
---

The `telegram` platform uses [Telegram](https://www.telegram.org) to deliver notifications from Home Assistant to your Telegram application(s).

## Setup

The requirements are:

- You need a [Telegram bot](https://core.telegram.org/bots). Please follow those [instructions](https://core.telegram.org/bots#6-botfather) to create one and get the token for your bot. Keep in mind that bots are not allowed to contact users. You need to make the first contact with your user. Meaning that you need to send a message to the bot from your user.
- You need to configure a [Telegram bot in Home Assistant](/integrations/telegram_bot) and define there your API key and the allowed chat ids to interact with.
- The `chat_id` of an allowed user or group to which the bot is added.

**Method 1:** You can get your `chat_id` by sending any message to the [GetIDs bot](https://t.me/getidsbot).

**Method 2:** To retrieve your `chat_id` you can visit `https://api.telegram.org/botYOUR_API_TOKEN/getUpdates` or to use `$ curl -X GET https://api.telegram.org/botYOUR_API_TOKEN/getUpdates` **after** you have sent the bot a message. Replace `YOUR_API_TOKEN` with your actual token.

The result set will include your chat ID as `id` in the `chat` section:

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

**Method 3:** Another way to get your chat ID directly is described below. Start your Python interpreter from the command-line:

```shell
$ python3
>>> import telegram
>>> bot = telegram.Bot(token='YOUR_API_TOKEN')
>>> chat_id = bot.getUpdates()[-1].message.chat_id
>>> print(chat_id)
123456789
```

<div class='note'>
If you want to add new chat IDs then you will need to disable the active configuration to actually see the result with the IDs, otherwise you may only get empty results array.
</div>

## Configuration

To enable Telegram notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for the Telegram Bot
telegram_bot:
  - platform: polling
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - CHAT_ID_1 # example: 123456789 for the chat_id of a user
      - CHAT_ID_2 # example: -987654321 for the chat_id of a group
      - CHAT_ID_3

# Example configuration.yaml entry for the notifier
notify:
  - platform: telegram
    name: NOTIFIER_NAME
    chat_id: CHAT_ID_1
    
  # It is possible to add multiple notifiers by using another chat_id
  # the example belows shows an additional notifier which sends messages to the bot which is added to a group
  - platform: telegram
    name: NOTIFIER_NAME_OF_GROUP
    chat_id: CHAT_ID_2
```

Refer to the platforms mentioned in the
[Telegram chatbot page](/integrations/telegram_bot/) for
`telegram_bot` configuration.

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
chat_id:
  description: The chat ID of the users or group
  required: true
  type: integer
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Text message

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: "*Send a message*"
    message: "That's an example that _sends_ a *formatted* message with a custom inline keyboard."
    data:
      inline_keyboard:
        - 'Task 1:/command1, Task 2:/command2'
        - 'Task 3:/command3, Task 4:/command4'
```

{% configuration %}
title:
  description: Will be composed as '%title\n%message'.
  required: false
  type: string
message:
  description: Message text.
  required: true
  type: string
keyboard:
  description: List of rows of commands, comma-separated, to make a custom keyboard.
  required: false
  type: list
inline_keyboard:
  description: List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.
  required: false
  type: list
{% endconfiguration %}

### Photo support

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send an images
    message: "That's an example that sends an image."
    data:
      photo:
        - url: http://192.168.1.28/camera.jpg
          username: admin
          password: secret
        - file: /tmp/picture.jpg
          caption: Picture Title xy
        - url: http://somebla.ie/video.png
          caption: i.e., for a Title
```

{% configuration %}
url:
  description: A remote path to an image. Either this or the `file` configuration option is required.
  required: true
  type: string
file:
  description: A local path to an image. Either this or the `url` configuration option is required.
  required: true
  type: string
caption:
  description: The title of the image.
  required: false
  type: string
username:
  description: Username for a URL which require HTTP authentication.
  required: false
  type: string
password:
  description: Password for a URL which require HTTP authentication.
  required: false
  type: string
authentication:
  description: Set to 'digest' to use HTTP digest authentication.
  required: false
  default: basic
  type: string
verify_ssl:
  description: Set to false to skip the validation of the server's SSL certificate.
  required: false
  default: true
  type: boolean
keyboard:
  description: List of rows of commands, comma-separated, to make a custom keyboard.
  required: false
  type: list
inline_keyboard:
  description: List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.
  required: false
  type: list
{% endconfiguration %}

<div class='note'>

Since Home Assistant version 0.48 you have to [whitelist the source folder](/docs/configuration/basic/) of the file you want to include in the notification.

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - /tmp
    - /home/kenji/data
```

</div>

### Video support

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send a video
    message: "That's an example that sends a video."
    data:
      video:
        - url: http://192.168.1.28/camera.mp4
          username: admin
          password: secret
        - file: /tmp/video.mp4
          caption: Video Title xy
        - url: http://somebla.ie/video.mp4
          caption: i.e., for a Title
```

{% configuration %}
url:
  description: A remote path to an video. Either this or the `file` configuration option is required.
  required: true
  type: string
file:
  description: A local path to an video. Either this or the `url` configuration option is required.
  required: true
  type: string
caption:
  description: The title of the video.
  required: false
  type: string
username:
  description: Username for a URL which require HTTP authentication.
  required: false
  type: string
password:
  description: Password for a URL which require HTTP authentication.
  required: false
  type: string
authentication:
  description: Set to 'digest' to use HTTP digest authentication.
  required: false
  default: basic
  type: string
verify_ssl:
  description: Set to false to skip the validation of the server's SSL certificate.
  required: false
  default: true
  type: boolean
keyboard:
  description: List of rows of commands, comma-separated, to make a custom keyboard.
  required: false
  type: list
inline_keyboard:
  description: List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.
  required: false
  type: list
{% endconfiguration %}

### Document support

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send a document
    message: "That's an example that sends a document and a custom keyboard."
    data:
      document:
        file: /tmp/whatever.odf
        caption: Document Title xy
      keyboard:
        - '/command1, /command2'
        - '/command3, /command4'
```

{% configuration %}
url:
  description: A remote path to a document. Either this or the `file` configuration option is required.
  required: true
  type: string
file:
  description: A local path to a document. Either this or the `url` configuration option is required.
  required: true
  type: string
caption:
  description: The title of the document.
  required: false
  type: string
username:
  description: Username for a URL which require HTTP authentication.
  required: false
  type: string
password:
  description: Password for a URL which require HTTP authentication.
  required: false
  type: string
authentication:
  description: Set to 'digest' to use HTTP digest authentication.
  required: false
  default: basic
  type: string
verify_ssl:
  description: Set to false to skip the validation of the server's SSL certificate.
  required: false
  default: true
  type: boolean
keyboard:
  description: List of rows of commands, comma-separated, to make a custom keyboard.
  required: false
  type: list
inline_keyboard:
  description: List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.
  required: false
  type: list
{% endconfiguration %}

### Location support

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

{% configuration %}
latitude:
  description: The latitude to send.
  required: true
  type: float
longitude:
  description: The longitude to send.
  required: true
  type: float
keyboard:
  description: List of rows of commands, comma-separated, to make a custom keyboard.
  required: false
  type: list
inline_keyboard:
  description: List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with associated callback data.
  required: false
  type: list
{% endconfiguration %}
