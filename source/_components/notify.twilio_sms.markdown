---
layout: page
title: "Twilio SMS"
description: "Instructions on how to add user notifications to Home Assistant."
date: 2016-05-14 14:14
sidebar: true
comments: false
sharing: true
footer: true
logo: twilio.png
ha_category: Notifications
ha_release: "0.20"
---

The `twilio` notification platform enables sending notifications via SMS, powered by [Twilio](https://twilio.com).

The requirement is that you have setup [Twilio](/components/twilio/).

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twilio_sms
    from_number: E164_PHONE_NUMBER
```

Configuration variables:

- **from_number** (*Required*): An [E.164](https://en.wikipedia.org/wiki/E.164) formatted phone number, like +14151234567. See [Twilio's guide to formatting phone numbers](https://www.twilio.com/help/faq/phone-numbers/how-do-i-format-phone-numbers-to-work-internationally) for more information.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

### {% linkable_title Usage %}

Twilio is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will send a notification to all E.164 phone numbers in the notification **target**. See the notes above regarding the `from_number` configuration variable for information about formatting phone numbers.

```yaml
# Example automation notification entry
automation:
  - alias: The sun has set
    trigger:
      platform: sun
      event: sunset
    action:
      service: notify.twilio_sms
      data:
        message: 'The sun has set'
        target:
          - '+14151234567'
          - '+15105555555'
```
