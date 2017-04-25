---
layout: page
title: "Telegram"
description: "Instructions how to add Telegram notifications to Home Assistant."
date: 2015-10-09 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telegram.png
ha_category: Notifications
ha_release: 0.7.5
---


The `telegram` platform uses [Telegram](https://web.telegram.org) to delivery notifications from Home Assistant to your Android device, your Windows phone, or your iOS device.

The requirements are:

- You need a [Telegram bot](https://core.telegram.org/bots). Please follow those [instructions](https://core.telegram.org/bots#6-botfather) to create one and get the token for your bot. Keep in mind that bots are not allowed to contact users. You need to make the first contact with your user. Meaning that you need to send a message to the bot from your user.
- The `chat_id` of an user, or a list of `user_id`s for sending messages to multiple users.

To retrieve your `chat_id`, contact any of the Telegram bots created for this purpose (@myidbot, @get_id_bot)

The quickest way to retrieve your `chat_id` is visiting [https://api.telegram.org/botYOUR_API_TOKEN/getUpdates](https://api.telegram.org/botYOUR_API_TOKEN/getUpdates) or to use `$ curl -X GET https:/api.telegram.org/botYOUR_API_TOKEN/getUpdates`. Replace `YOUR_API_TOKEN` with your actual token.

The result set will include your chat ID as `id` in the `from` section:

```json
{"ok":true,"result":[{"update_id":254199982,
"message":{"message_id":27,"from":{"id":123456789,"first_name":"YOUR_FIRST_NAME YOUR_NICK_NAME","last_name":"YOUR_LAST_NAME","username":"YOUR_NICK_NAME"},"chat":{"id":123456789,"first_name":"YOUR_FIRST_NAME YOUR_NICK_NAME","last_name":"YOUR_LAST_NAME","username":"YOUR_NICK_NAME","type":"private"},"date":1678292650,"text":"test"}}]}
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
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: telegram
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    chat_id: YOUR_CHAT_ID

# With more than one authorized target:
notify:
  - name: NOTIFIER_NAME
    platform: telegram
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    user_id:
      User_name_1: CHAT_ID_USER_1
      User_name_2: CHAT_ID_USER_2
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): The API token of your bot.
- **chat_id** (*Optional*): The chat ID of your user.
- **user_id** (*Optional*): Multiple chat IDs for multiple users.
- **parse_mode** (*Optional*): Default parser for messages if not explicit in message data: 'html' or 'markdown'. Default is 'markdown'.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### {% linkable_title Common message data parameters %}

- **message** (*Required*): Message text.
- **title** (*Optional*): Will be composed as '%title\n%message'.
- **parse_mode** (*Optional*): Parser for the message text: 'html' or 'markdown'.
- **timeout** (*Optional*): If this value is specified, use it as the definitive timeout (in seconds) for urlopen() operations.
- **disable_notification** (*Optional*): Sends the message silently. iOS users will not receive a notification, Android users will receive a notification with no sound.
- **disable_web_page_preview** (*Optional*): Disables link previews for links in the message.
- **reply_to_message_id** (*Optional*): If the message is a reply, ID of the original message.
- **keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom keyboard.
- **inline_keyboard** (*Optional*): List of rows of commands, comma-separated, to make a custom inline keyboard with buttons with asociated callback data.

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

- **url** or **file** (*Required*): For local or remote path to an image.
- **caption** (*Optional*): The title of the image.
- **username** (*Optional*): Username for a URL which require HTTP basic authentication.
- **password** (*Optional*): Username for a URL which require HTTP basic authentication.


### {% linkable_title Document support %}

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send a document
    message: That's an example that sends a document.
    data:
      document:
        file: /tmp/whatever.odf
        caption: Document Title xy
        
```

- **url** or **file** (*Required*): For local or remote path to a document.
- **caption** (*Optional*): The title of the document.
- **username** (*Optional*): Username for a URL which require HTTP basic authentication.
- **password** (*Optional*): Username for a URL which require HTTP basic authentication.

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

- **location** (*Required*): For local or remote path to an image.
- **latitude** (*Required*): The latitude to send.
- **longitude** (*Required*): The longitude to send.

### {% linkable_title Answering callback queries %}

To send a quick answer when receiving a [callback query event](/_components/telegram_bot.markdown/) sent from an inline keyboard. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.

```yaml
...
trigger:
  platform: event
  event_type: telegram_callback
action:
- service: notify.NOTIFIER_NAME
  data:
    message: "OK, I'm listening"
    data:
      callback_query:
        callback_query_id: '{{ trigger.event.data.id }}'
        show_alert: false
```

- **callback_query** (*Required*):
    - **callback_query_id** (*Required*): Unique id of the callback response.
    - **show_alert** (*Optional*): Show a permanent notification.

### {% linkable_title Editing messages sent previously %}

You can edit a message (`edit_message`) or a image caption (`edit_caption`) from a previusly sent message:

```yaml
...
action:
- service: notify.NOTIFIER_NAME
  data_template:
    title: '*Message edit*'
    message: 'This is the new text of the message'
    data:
      edit_message:
        message_id: '{{ trigger.event.data.message.message_id }}'
      disable_notification: true
      inline_keyboard:
        - '/edit,/NO'
        - '/remove button'
...
```

- **edit_message** or **edit_caption** (*Required*):
    - **message_id** or **inline_message_id** (*Required*): id of the message to be edited.

or change the keyboard or the inline keyboard of the message of origin (`edit_replymarkup`):

```yaml
...
action:
- service: notify.NOTIFIER_NAME
  data:
    message: ''
    edit_replymarkup:
      message_id: 'last'
    disable_notification: true
    inline_keyboard:
      - '/edit,/NO'
...
```

- **edit_replymarkup** (*Required*):
    - **message_id** or **inline_message_id** (*Required*): id of the message to be edited.
- **keyboard** or **inline_keyboard** (*Required*): New keyboard.
