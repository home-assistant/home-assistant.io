---
layout: page
title: "Google Voice SMS"
description: "Instructions how to add user notifications to Home Assistant."
date: 2016-01-29
sidebar: true
comments: false
sharing: true
footer: true
logo: google_voice.png
ha_category: Notifications
---

[Google Voice](https://www.google.com/voice) is a free service, that allows sending of SMS messages to mobile phones.

### Configuration

```yaml
# Example configuration.yaml entry
notify:
  platform: googlevoice
  username: YOUR_GOOGLE_EMAIL
  password: YOUR_GOOGLE_PASSWORD
  # Optional
  name: NOTIFIER_NAME
```

Configuration variables:

- **username** (*Required*): Enter your the Google email address you have signed up for Google Voice with. Go to https://www.google.com/voice to setup your Google Voice account.
- **password** (*Required*): Enter the password associated with the above email. Go to https://www.pushbullet.com/ to retrieve your API key.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

### Usage

Google Voice is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will send a notification to all devices listed in the notification **target**.

```yaml
# Example automation notification entry
automation:
  - alias: The sun has set
    trigger:
      platform: sun
      event: sunset
    action:
      service: notify.googlevoice
      data:
        message: 'The sun has set'
        target:
          - 5555555555
          - 5555555556
```
