---
layout: page
title: "HipChat"
description: "Instructions how to add HipChat notifications to Home Assistant."
date: 2017-08-10 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hipchat.png
ha_category: Notifications
ha_release: "0.52"
---


The `hipchat` platform allows you to send notifications from Home Assistant to [HipChat](https://hipchat.com/).

You need to obtain a [HipChat API token](https://developer.atlassian.com/hipchat/guide/hipchat-rest-api/api-access-tokens#APIaccesstokens-Usergeneratedtokens) to be able to send notifications.

To enable the HipChat notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: hipchat
    token: ABCDEFGHJKLMNOPQRSTUVXYZ
    room: 1234567
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **token** (*Required*): The HipChat API token to use for sending HipChat notifications.
- **room** (*Required*): The default room to post to if no room is explicitly specified when sending the notification.
- **color** (*Optional*): Setting color will override the default color for the notification. By default not setting this will post to HipChat using the default color yellow. Valid options are 'yellow', 'green', 'red', 'purple', 'gray', 'random'.
- **notify** (*Optional*): Setting notify will override the default notify (blink application icon, chime, or otherwise call attention) setting for the notification. By default this is 'false'. Valid options are 'true' and 'false'.
- **format** (*Optional*): Setting format will override the default message format. Default is 'text'. Valid options are 'text' and 'html'.
- **host** (*Optional*): Setting the host will override the default HipChat server host. Default is 'https://api.hipchat.com/'.

### {% linkable_title HipChat service data %}

The following attributes can be placed `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room`                 |      yes | (int) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `color`                |      yes | (str) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `notify`                  |      yes | (bool) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.
| `format`             |      yes | (str) Same usage as in configuration.yaml. Overrides any setting set in configuration.yaml.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

