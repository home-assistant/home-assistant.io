---
layout: page
title: "ClickSend text-to-speech"
description: "Instructions on how to add ClickSend text-to-speech (TTS) notifications to Home Assistant."
date: 2017-10-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: clicksend.png
ha_category: Notifications
ha_release: 0.55
redirect_from: /components/notify.clicksendaudio/
---

The `clicksend_tts` platform uses [ClickSend](https://clicksend.com) to deliver text-to-speech (TTS) notifications from Home Assistant.

Go to your [ClickSend Dashboard](https://dashboard.clicksend.com) section and create your new project. After creating your project, you should now be able to obtain your `username` and `api_key`.

To add ClickSend to your installation, add the following to your Home Assistant `configuration.yaml` file:

```yaml
notify:
  - platform: clicksend_tts
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
```

{% configuration %}
name:
  description: Setting the optional parameter name allows multiple notifiers to be created. The notifier will bind to the service notify.NOTIFIER_NAME.
  required: false
  default: ClickSend
  type: string
username:
  description: Your username.
  required: true
  type: string
api_key:
  description: Your API Key.
  required: true
  type: string
recipient:
  description: Your phone number. This is where you want to send your notification SMS messages (e.g., `09171234567`).
  required: true
  type: string
language:
  description: The language you want to use to convert the message to audio. Accepted values are found in the [ClickSend Documentation](http://docs.clicksend.apiary.io/#reference/voice/voice-languages).
  required: false
  default: en-us
  type: string
voice:
  description: The voice that needs to be used to play the message to the recipient. Allowed values are `female` or `male`.
  required: false
  default: female
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
