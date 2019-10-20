---
title: "Microsoft Teams"
description: "Instructions on how to send notification to a Microsoft Teams channel."
logo: msteams.png
ha_category:
  - Notifications
ha_release: 0.101
---

The `Microsoft Teams` platform allows you to send notifications from Home Assistant to a channel in [Microsoft Teams](https://products.office.com/en-us/microsoft-teams/group-chat-software).

## Setup

To send notification to teams you need add the Incoming Webhook app to your team channel. When the app is added you will receive a webhook url that needs to be added to your `configuration.yaml`.

## Configuration

To add the Microsoft Teams platform to your installation, add the following to your `configuration.yaml` file:

```yaml
notify:
  - platform: msteams
    name: myteam
    webhook_id: https://outlook.office.com/webhook/<ID>
```

{% configuration %}
name:
  description: Setting this parameter allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
  default: "notify"
webhook_id:
  description: The webhook url created in the setup step.
  required: true
  type: string
{% endconfiguration %}