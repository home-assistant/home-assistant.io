---
title: Telegram
description: Instructions on how to add Telegram notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.7.5
ha_iot_class: Cloud Polling
ha_domain: telegram
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `telegram` {% term integration %} uses [Telegram](https://www.telegram.org) to deliver notifications from Home Assistant to your Telegram application(s).

## Setup example

To create your first [Telegram bot](https://core.telegram.org/bots#how-do-i-create-a-bot), follow these steps:

  - Bots are not allowed to contact users. You need to make the first contact from the user for which you want to set up the bot.

1. Tell Telegram to create a bot for you:
   - In Telegram, open a chat with @BotFather and enter `/newbot`.
   - Follow the instructions on screen and give your bot a name.
   - BotFather will give you a link to your new bot and an HTTP API token.
     - Store the token somewhere safe.
2. To get a chat ID, send any message to the [GetIDs bot](https://t.me/getidsbot).
   - Then, enter `/start`. 
   - The bot will return your chat ID and the username.
3. Create a [Telegram bot in Home Assistant](/integrations/telegram_bot):
   - Paste this into your [configuration file](/docs/configuration/):
   - Replace the `api_key` and the `allowed_chat_ids` with your data.
  
      ```yaml
      # Telegram Bot
      telegram_bot:
        - platform: polling
          api_key: "1117774004:EABQulCACdgkQOTN3hS_5HZwSwxDlekCixr"
          allowed_chat_ids:
            - 44441111
      ```

4. Create a notifier:
   - Paste this into your configuration file: 
   - Replace the `name` and the `chat_id` with your data.
  
      ```yaml
      # Notifier
      notify:
        - platform: telegram
          name: "sarah"
          chat_id: 44441111
      ```
   - Restart Home Assistant.

5. From the conversation with BotFather, select the link to open a chat with your new bot.
6. In the chat with the new bot, enter `/start`.
7. Test the action:
   - Go to [**Developer tools** > **Actions** > **YAML mode**](https://my.home-assistant.io/redirect/developer_call_service/?service=homeassistant.turn_on).
   - Paste this into the YAML file:
   - Replace the `service` and the `message` with your data.
  
      ```yaml
      action: notify.sarah
      data:
        message: "Yay! A message from Home Assistant."
      ```
   - Select **Perform action**. You should now get a message.

8. You can do more with this. Check out the configuration descriptions and examples below.

## Methods to retrieve a `chat_id`

**Method 1:** You can get your `chat_id` by sending any message to the [GetIDs bot](https://t.me/getidsbot).

**Method 2:** To retrieve your `chat_id` you can visit `https://api.telegram.org/bot<YOUR_API_TOKEN>/getUpdates` or to use `$ curl -X GET https://api.telegram.org/bot<YOUR_API_TOKEN>/getUpdates` **after** you have sent the bot a message. Replace `<YOUR_API_TOKEN>` with your actual token.

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

{% tip %}
If you want to add new chat IDs then you will need to disable the active configuration to actually see the result with the IDs, otherwise you may only get empty results array.
{% endtip %}


**Method 4:** You can also get the chat ID from the Home Assistant logs. If you have set up the bot already, you can send a message to your bot from an unauthorized ID and you will see an error entry in the log containing the ID.  
[![Open your Home Assistant instance and show your Home Assistant logs.](https://my.home-assistant.io/badges/logs.svg)](https://my.home-assistant.io/redirect/logs/?)

## Configuration

To enable Telegram notifications in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
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
actions:
  - action: notify.NOTIFIER_NAME
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
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send an images"
      message: "That's an example that sends an image."
      data:
        photo:
          - url: http://192.168.1.28/camera.jpg
            username: "admin"
            password: "secret"
          - file: /tmp/picture.jpg
            caption: "Picture Title xy"
          - url: http://somebla.ie/video.png
            caption: "i.e., for a Title"
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

{% important %}

Since Home Assistant version 0.48 you have to [whitelist the source folder](/integrations/homeassistant/#allowlist_external_dirs) of the file you want to include in the notification.

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - /tmp
    - /home/kenji/data
```

{% endimportant %}

### Video support

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send a video"
      message: "That's an example that sends a video."
      data:
        video:
          - url: http://192.168.1.28/camera.mp4
            username: "admin"
            password: "secret"
          - file: /tmp/video.mp4
            caption: "Video Title xy"
          - url: http://somebla.ie/video.mp4
            caption: "i.e., for a Title"
```

{% configuration %}
url:
  description: A remote path to a video. Either this or the `file` configuration option is required.
  required: true
  type: string
file:
  description: A local path to a video. Either this or the `url` configuration option is required.
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
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send a document"
      message: "That's an example that sends a document and a custom keyboard."
      data:
        document:
          file: /tmp/whatever.odf
          caption: "Document Title xy"
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

actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send location"
      message: "Location updated."
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

### Extra data attributes support

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "*Send a message*"
      message: |-
        That's an example that sends a message with message_tag, disable_notification and disable_web_page_preview.
        <a href="https://www.home-assistant.io/">HA site</a>
      data:
        parse_mode: html
        message_tag: "example_tag"
        disable_notification: True
        disable_web_page_preview: True
        message_thread_id: 123
```

{% configuration %}
parse_mode:
  description: "Parser for the message text: `markdownv2`, `html` or `markdown`."
  required: false
  type: string
disable_notification:
  description: True/false to send the message silently. iOS users and web users will not receive a notification. Android users will receive a notification with no sound.
  required: false
  default: false
  type: boolean
disable_web_page_preview:
  description: True/false to display a webpage preview.
  required: false
  default: false
  type: boolean
message_tag:
  description: Tag for sent message.
  required: false
  type: string
message_thread_id:
  description: Send the message to a specific topic or thread.
  required: false
  type: integer
{% endconfiguration %}
