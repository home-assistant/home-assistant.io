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
ha_integration_type: integration
ha_quality_scale: legacy
---

The `clicksend_tts` platform uses [ClickSend](https://clicksend.com) to deliver text-to-speech (TTS) notifications from Home Assistant.

After creating your account, you should now be able to obtain your `username` and `api_key` [here](https://dashboard.clicksend.com/account/subaccounts).

To add ClickSend to your installation, add the following to your Home Assistant {% term "`configuration.yaml`" %} file:

```yaml
notify:
  - platform: clicksend_tts
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
```

{% configuration %}
name:
  description: "Setting the optional parameter name allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  default: clicksend_tts
  type: string
username:
  description: Your username (probably your email address).
  required: true
  type: string
api_key:
  description: Your API Key.
  required: true
  type: string
recipient:
  description: An [E.164](https://en.wikipedia.org/wiki/E.164) formatted phone number, like `+14151234567`. This is the phone number that you want to call and notify via TTS, see [ClickSend Documentation](https://developers.clicksend.com/docs/rest/v3/#Send-Voice-Message) for more info.
  required: true
  type: string
language:
  description: The language you want to use to convert the message to audio. Accepted values are found in the [ClickSend Documentation](https://developers.clicksend.com/docs/rest/v3/#Send-Voice-Message).
  required: false
  default: en-us
  type: string
voice:
  description: The voice that needs to be used to play the message to the recipient. Allowed values are `female` or `male`.
  required: false
  default: female
  type: string
{% endconfiguration %}

### Usage

ClickSend is a notify platform and thus can be controlled by calling the notify action [as described here](/integrations/notify/). It will send a notification to the E.164 phone number you configured as **recipient**.

```yaml
alias: "The sun has set"
triggers:
  - trigger: sun
    event: sunset
actions:
  - action: notify.clicksend_tts
    data:
      message: "The sun has set"
```
