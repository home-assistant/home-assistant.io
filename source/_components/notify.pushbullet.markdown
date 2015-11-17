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

PushBullet is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). An optional **target** parameter can be given to PushBullet to specify one or many account's devices, contacts or channels to notify.

Type | Prefix | Suffix | Example
---- | ------ | ------ | -------
All devices | `device` | -- | `device`
Device | `device/` | Device nickname | `device/iphone`
Contact | `contact/` | Contact e-mail (lowercase) | `contact/email@example.com`
Channel | `channel/` | Channel tag | `channel/my_home`

#### Example service payload

```json
{
  "message": "A message for many people",
  "target": [
    "device",
    "contact/hello@example.com",
    "channel/my_home"
  ]
}
```
