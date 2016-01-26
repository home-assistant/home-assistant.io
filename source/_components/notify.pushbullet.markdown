---
layout: component
title: "PushBullet"
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

[PushBullet](https://www.pushbullet.com/) is a free service to send information between your phones, browsers and friends.

### Configuration

```yaml
# Example configuration.yaml entry
notify:
  platform: pushbullet
  api_key: YOUR_API_KEY
  # Optional
  name: NOTIFIER_NAME
```

Configuration variables:

- **api_key** (*Required*): Enter the API key for PushBullet. Go to https://www.pushbullet.com/ to retrieve your API key.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

### Usage

PushBullet is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will send a notification to all devices registered in the PushBullet account.  An optional **target** parameter can be given to PushBullet to specify specific account's devices, contacts or channels.

Type | Prefix | Suffix | Example
---- | ------ | ------ | -------
Device | `device/` | Device nickname | `device/iphone`
Channel | `channel/` | Channel tag | `channel/my_home`
Email | `email/` | Contact's email address | `email/email@example.com`

If using targets, your own account's email address functions as 'send to all devices'. All targets are verified (if exists) before sending, except email.

#### Example service payload

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
