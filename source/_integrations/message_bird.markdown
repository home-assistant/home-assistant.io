---
title: MessageBird
description: Instructions on how to add user notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.16
ha_domain: message_bird
ha_platforms:
  - notify
---

The `MessageBird` notification platform sends notifications as SMS messages using [MessageBird](https://www.messagebird.com/) to your mobile phone.

## Setup

Go to https://www.messagebird.com/ to retrieve your API key.

## Configuration

To enable MessageBird notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: message_bird
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your MessageBird API key.
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
sender:
  description: Setting the optional parameter `sender`. This will be the sender of the SMS. It may be either a telephone number (e.g., `+4915112345678`) or a text with a maximum length of 11 characters.
  required: false
  default: HA
  type: string
{% endconfiguration %}

### Usage

MessageBird is a notify platform and thus can be controlled by calling the notify service [as described here](/integrations/notify/). It will send a notification to the specified mobile phone number(s).

#### Example service payload

```json
{
  "message": "A message for many people",
  "target": [ "+49123456789", "+43123456789" ]
}
```
