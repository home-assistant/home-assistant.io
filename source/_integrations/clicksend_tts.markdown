---
title: ClickSend TTS
description: Instructions on how to add ClickSend text-to-speech (TTS) notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.55
ha_domain: clicksend_tts
ha_platforms:
  - notify
---

The `clicksend_tts` platform uses [ClickSend](https://clicksend.com) to deliver text-to-speech (TTS) notifications from Home Assistant.

Go to your [ClickSend Dashboard](https://dashboard.clicksend.com) section and create your new project. After creating your project, you should now be able to obtain your `username` and `api_key`.

To add ClickSend to your installation, add the following to your Home Assistant `configuration.yaml` file:

```yaml
notify:
  - platform: clicksend_tts
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
  description: Recipient phone number. This is the phone number that you want to call and notify via TTS (e.g., `09171234567`).
  required: true
  type: string
caller:
  description: Caller phone number. This is the phone number that you want to be the TTS call originator (e.g., `09181234567`). If not defined the recipient number is used.
  required: false
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
