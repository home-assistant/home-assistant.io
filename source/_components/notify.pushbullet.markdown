---
layout: page
title: "Pushbullet"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: pushbullet.png
ha_category: Notifications
featured: true
---

The `pushbullet` notification platform sends messages to [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends.

To enable Pushbullet notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushbullet
    api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): Enter the API key for Pushbullet. Go to https://www.pushbullet.com/ to retrieve your API key.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

### {% linkable_title Usage %}

Pushbullet is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will send a notification to all devices registered in the Pushbullet account. An optional **target** parameter can be given to Pushbullet to specify specific account's devices, contacts or channels.

Type | Prefix | Suffix | Example
---- | ------ | ------ | -------
Device | `device/` | Device nickname | `device/iphone`
Channel | `channel/` | Channel tag | `channel/my_home`
Email | `email/` | Contact's email address | `email/email@example.com`

If using targets, your own account's email address functions as 'send to all devices'. All targets are verified (if exists) before sending, except email.

#### {% linkable_title Example service payload %}

```json
{
  "message": "A message for many people",
  "target": [
    "device/telephone",
    "email/hello@example.com",
    "channel/my_home"
  ]
}
```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### {% linkable_title URL support %}

```yaml
...

action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send URL
    message: This is an url
    data:
      url: google.com
```

- **url** (*Required*): Page URL to send with pushbullet.

