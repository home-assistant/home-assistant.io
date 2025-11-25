---
title: Twilio Call
description: Instructions on how to add Twilio Call notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.37
ha_domain: twilio_call
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---

The `twilio_call` notification platform enables sending notifications via Voice, powered by [Twilio](https://twilio.com).
Passed message will be read by Text-to-speech service.

The requirement is that you have setup [Twilio](/integrations/twilio/).

## Configuration

To use this notification platform in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twilio_call
    from_number: E164_PHONE_NUMBER
```

{% configuration %}
from_number:
  description: "An [E.164](https://en.wikipedia.org/wiki/E.164) formatted phone number, like +14151234567. See [Twilio's guide to formatting phone numbers](https://www.twilio.com/help/faq/phone-numbers/how-do-i-format-phone-numbers-to-work-internationally) for more information."
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### Usage

Twilio is a notification platform and thus can be controlled by calling the notify action [as described here](/integrations/notify/). It will send a notification to all E.164 phone numbers in the notification **target**. See the notes above regarding the `from_number` configuration variable for information about formatting phone numbers.

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.twilio_call
        data:
          message: "The sun has set"
          target:
            - +14151234567
            - +15105555555
```
