---
layout: page
title: "Pushsafer"
description: "Instructions how to add Pushsafer notifications to Home Assistant."
date: 2017-02-17 20:46
sidebar: true
comments: false
sharing: true
footer: true
logo: pushsafer.png
ha_category: Notifications
ha_release: 0.39
---


The [Pushsafer service](https://www.pushsafer.com/) is a platform for the notify component. This allows you to send messages to the user using Pushsafer.

In order to get an private or alias key you need to go to the [Pushsafer website](https://www.pushsafer.com) and register.

To use Pushsafer notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushsafer
    private_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **private_key** (*Required*): Your private or alias key. Private key = send the notification to all devices with standard params, alias key send the notification to the devices stored in the alias with predefined params.

Examples:
**Message to 2 devices with formated text**
```yaml
{
  "title": "Test to 2 devices",
  "message": "Attention [b]bold[/b] text[br][url=https://www.pushsafer.com]Link to Pushsafer[/url]",
  "target": ["1111", "2222"],
  "data": {
    "icon": "2", 
    "iconcolor": "#FF0000",
    "sound": "2",
    "vibration": "1",
    "url": "https://home-assistant.io/",
    "urltitle": "Open Home Assistant",
    "time2live": "0"
  }
}
```

To customize your push-notification you can take a look at the [Pushsafer API description](https://www.pushsafer.com/en/pushapi).

When setting up the application you can use this [icon](https://home-assistant.io/images/favicon-192x192.png).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
