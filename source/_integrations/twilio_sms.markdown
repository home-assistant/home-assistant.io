---
title: Twilio SMS
description: Instructions on how to add Twilio SMS notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: '0.20'
ha_domain: twilio_sms
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---

The `twilio_sms` notification platform enables sending notifications via SMS, powered by [Twilio](https://twilio.com).

The requirement is that you have setup [Twilio](/integrations/twilio/).

## Configuration

To use this notification platform in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twilio_sms
    from_number: E164_PHONE_NUMBER or SENDER_ID
```

{% configuration %}
from_number:
  description: An [E.164](https://en.wikipedia.org/wiki/E.164) formatted phone number, like +14151234567. See [Twilio's guide to formatting phone numbers](https://help.twilio.com/articles/223183008) for more information. Alternatively, a sender ID can be used instead of a phone number. The sender ID must be formatted according to Twilio's guidelines. See [Twilio's guide to sender ID](https://help.twilio.com/articles/223181348-Getting-started-with-Alphanumeric-Sender-ID) for more information. Do keep in mind that not all countries support sender ID. See [Twilio's page of supported countries](https://help.twilio.com/articles/223133767-International-support-for-Alphanumeric-Sender-ID) for more information.
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### Usage

Twilio is a notification platform and thus can be controlled by calling the notify action [as described here](/integrations/notify/). It will send a notification to all E.164 phone numbers in the notification **target**. See the notes above regarding the `from_number` configuration variable for information about formatting phone numbers. It's also possible to use `whatsapp:+123456789` for sending notifications to a Whatsapp user.

Media can be included with messages by setting the optional `media_url` variable. Only `.gif`, `.png`, or `.jpeg` content are supported, according to the Twilio documentation and this feature is [only supported in the US and Canada.][mms]

[mms]: https://www.twilio.com/docs/sms/send-messages#include-media-in-your-messages

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.twilio_sms
        data:
          message: "The sun has set"
          target:
            - '+14151234567'
            - '+15105555555'
          data:
            media_url:
              - "https://www.home-assistant.io/images/supported_brands/home-assistant.png"
```
