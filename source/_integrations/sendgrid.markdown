---
title: SendGrid
description: Instructions on how to add email notifications via SendGrid to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.14
ha_domain: sendgrid
ha_iot_class: Cloud Push
ha_platforms:
  - notify
---

The `sendgrid` notification platform sends email notifications via [SendGrid](https://sendgrid.com/), a proven cloud-based email platform.

## Setup

You need an [API key](https://app.sendgrid.com/settings/api_keys) from SendGrid.

## Configuration

To enable notification emails via SendGrid in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: sendgrid
    api_key: YOUR_API_KEY
    sender: SENDER_EMAIL_ADDRESS
    recipient: YOUR_RECIPIENT
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
api_key:
  description: Your SendGrid API key.
  required: true
  type: string
sender:
  description: The e-mail address of the sender.
  required: true
  type: string
sender_name:
  description: The name of the sender. Defaults to "Home Assistant" if not set.
  required: false
  type: string
recipient:
  description: The recipient of the notification.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
