---
title: Twilio Call
description: Instructions on how to add user notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.37
ha_domain: twilio_call
ha_iot_class: Cloud Push
ha_platforms:
  - notify
---

The `twilio_call` notification platform enables sending notifications via Voice, powered by [Twilio](https://twilio.com).
Passed message will be read by Text-To-Speech service.

The requirement is that you have setup [Twilio](/integrations/twilio/).

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

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
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### Usage

Twilio is a notify platform and thus can be controlled by calling the notify service [as described here](/integrations/notify/). It will send a notification to all E.164 phone numbers in the notification **target**. See the notes above regarding the `from_number` configuration variable for information about formatting phone numbers.

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    trigger:
      platform: sun
      event: sunset
    action:
      service: notify.twilio_call
      data:
        message: "The sun has set"
        target:
          - +14151234567
          - +15105555555
```
