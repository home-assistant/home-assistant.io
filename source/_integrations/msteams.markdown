---
title: Microsoft Teams
description: Instructions on how to send a notification to a Microsoft Teams channel.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.101
ha_codeowners:
  - '@peroyvind'
ha_domain: msteams
ha_platforms:
  - notify
ha_integration_type: integration
---

The `Microsoft Teams` platform allows you to send notifications from Home Assistant to a team channel in [Microsoft Teams](https://products.office.com/en-us/microsoft-teams/group-chat-software).

## Setup

To send a notification to teams, you need to add the Incoming Webhook app to your team channel. When the app is added, you will receive a webhook URL that needs to be added to your `configuration.yaml`.


## Configuration

To add the Microsoft Teams platform to your installation, add the following to your `configuration.yaml` file:

```yaml
notify:
  - platform: msteams
    url: https://outlook.office.com/webhook/<ID>
```

{% configuration %}
name:
  description: Setting this parameter allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
  default: "notify"
url:
  description: The webhook URL created in the setup step.
  required: true
  type: string
{% endconfiguration %}

### Microsoft Teams service data

The following attributes can be placed inside `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `image_url`            |      yes | Attach an image to the message.

Example for posting file from URL:

```yaml
title: Title of the message.
message: Message that will be added.
data:
  image_url: URL_OF_IMAGE
```
