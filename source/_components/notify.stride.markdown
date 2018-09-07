---
layout: page
title: "Stride"
description: "Instructions how to add Stride notifications to Home Assistant."
date: 2018-03-14 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: stride.png
ha_category: Notifications
ha_release: 0.66
---

The `stride` platform allows you to send notifications from Home Assistant to [Stride](https://stride.com/).

You need to obtain a [Stride API token](https://developer.atlassian.com/cloud/stride/security/authentication/#using-room-tokens) to be able to send notifications. When creating the token, you'll see a section labeled "Use this conversation URL to post messages" - it will look something like "https://api.atlassian.com/site/55872e9f-047e-a619-b32c-19d37fbc6038/conversation/26c98c26-0ffd-a11e-3a55-1b397cb71fe0/message". The first set of numbers and letters (`55872e9f-047e-a619-b32c-19d37fbc6038`) is the Cloud ID, and the second set (`26c98c26-0ffd-a11e-3a55-1b397cb71fe0`) is the Room ID.

To enable the Stride notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: stride
    cloudid: CLOUD-ID
    token: TOKEN
    room: ROOM-ID
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
cloudid:
  description: The Stride Cloud ID to use for sending Stride notification.
  required: true
  type: string
token:
  description: The Stride API token to use for sending Stride notifications.
  required: true
  type: string
room:
  description: The default room to post to if no room is explicitly specified when sending the notification.
  required: true
  type: string
panel:
  description: Setting panel will override the default panel type (`None`) for the notification. By default not setting this will post to Stride without using a panel type. Valid options are 'None', 'info', 'note', 'tip', 'warning'.
  required: false
  type: string
{% endconfiguration %}

### {% linkable_title Stride service data %}

The following attributes can be placed `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room`                 |      yes | (int) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `panel`                |      yes | (str) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
