---
layout: page
title: "MessageBird"
description: "Instructions how to add user notifications to Home Assistant."
date: 2016-03-15 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: message_bird.png
ha_category: Notifications
ha_release: 0.16
---

The `MessageBird` notification platform sends notifications as SMS messages using [MessageBird](https://www.messagebird.com/) to your mobile phone.

To enable MessageBird notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: message_bird
    api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): Enter the API key for MessageBird. Go to https://www.messagebird.com/ to retrieve your API key.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **sender** (*Optional*): Setting the optional parameter `sender`. This will be the sender of the SMS. It may be either a telephone number (e.g., `+4915112345678`) or a text with a maximum length of 11 characters. Defaults to `HA`.

### {% linkable_title Usage %}

MessageBird is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will send a notification to the specified mobile phone number(s).

#### {% linkable_title Example service payload %}

```json
{
  "message": "A message for many people",
  "target": [ "+49123456789", "+43123456789" ]
}
```
