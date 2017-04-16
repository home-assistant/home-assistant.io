---
layout: page
title: "Notifications Introduction"
description: "Getting started with iOS notifications"
date: 2016-10-25 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /ecosystem/ios/notifications/
---

The `ios` notify platform enables sending push notifications to the Home Assistant iOS app.

The 'ios' component will automatically load the notify service. 
The service component can be called using `service: notify.ios.<your_device_name>`.
Your device name can be found in the `ios.conf` file in the homeassistant configuration folder:
`{"devices": {"iphone": {"deviceId": "iphone", "pushToken": "", "permissions": ["location"], "battery": {"state": "Unplugged", "level": 100}, "pushSounds": [], "pushId": "", "app": {"buildNumber": 1, "bundleIdentifer": "io.robbie.HomeAssistant"}, "device": {"systemName": "iOS", "name": "iPhone", "systemVersion": "10.2.1", "localizedModel": "iPhone", "type": "iPhone 7", "model": "iPhone", "permanentID": ""}}}}


Configuration variables:
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **message** (*Required*): Your message to show up in the notification

Example Automation:
```yaml
- service: notify.ios.<your_device_name>
    data_template: 
      message: "This is the message"
```
