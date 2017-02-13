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
- The `chat_id` of an user.

To retrieve your `chat_id`, contact any of the Telegram bots created for this purpose (@myidbot, @get_id_bot)

To enable Telegram notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: telegram
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    chat_id: YOUR_CHAT_ID
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): The API token of your bot.
- **chat_id** (*Required*): The chat ID of your user.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

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

