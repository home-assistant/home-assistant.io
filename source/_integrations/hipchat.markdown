---
title: "HipChat"
description: "Instructions on how to add HipChat notifications to Home Assistant."
logo: hipchat.png
ha_category:
  - Notifications
ha_release: 0.52
---

<div class='note'>
Hipchat was discontinued on February 15th, 2019. Slack has taken over Hipchat and Stride, and have therefore stopped these platforms. As a consequence, this integration will be removed from Home Assistant in the future. For more information: <a href="https://www.atlassian.com/blog/announcements/new-atlassian-slack-partnership">announcement</a>.
</div>

The `hipchat` platform allows you to send notifications from Home Assistant to [HipChat](https://hipchat.com/).

You need to obtain a [HipChat API token](https://developer.atlassian.com/hipchat/guide/hipchat-rest-api/api-access-tokens#APIaccesstokens-Usergeneratedtokens) to be able to send notifications.

To enable the HipChat notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: hipchat
    token: YOUR_TOKEN
    room: 1234567
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
token:
  description: The HipChat API token to use for sending HipChat notifications.
  required: true
  type: string
room:
  description: The default room to post to if no room is explicitly specified when sending the notification.
  required: true
  type: integer
color:
  description: Setting color will override the default color for the notification. Valid options are 'yellow', 'green', 'red', 'purple', 'gray', 'random'.
  required: false
  default: yellow
  type: string
notify:
  description: Setting notify will override the default notify (blink application icon, chime, or otherwise call attention) setting for the notification. Valid options are 'true' and 'false'.
  required: false
  default: false
  type: boolean
format:
  description: Setting format will override the default message format. Valid options are 'text' and 'html'.
  required: false
  default: text
  type: string
host:
  description: Setting the host will override the default HipChat server host.
  required: false
  default: "https://api.hipchat.com/"
  type: string
{% endconfiguration %}

### HipChat service data

The following attributes can be placed `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room`                 |      yes | (int) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `color`                |      yes | (str) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `notify`                  |      yes | (bool) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `format`             |      yes | (str) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
