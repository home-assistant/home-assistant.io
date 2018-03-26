---
layout: page
title: "Basic Notifications"
description: "Basic notes about iOS notifications"
date: 2016-10-25 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /ecosystem/ios/notifications/basic/
---

The iOS notify platform accepts the standard `title`, `message` and `target` parameters. The iOS notify platform supports targets as services. Assuming that you did not set a `name` when configuring the platform you should find all your registered and notification-enabled iOS devices available as notify targets as services with names prefixed "notify.ios_" and then the device name you entered at setup.

Notes:

* `title` only displays on Apple Watch and iOS 10 devices.

* `target` can be used to specific a single device using its PushID, found in `ios.conf`. The preferred way of providing a target is through a target specific notify service.

<p class='img'>
  <img src='/images/ios/example.png' />
  A push notification showing all of the basic options `title` and `message` as well as `subtitle` and [actions](/ecosystem/ios/notifications/actions/).
</p>

### {% linkable_title Enhancing basic notifications %}

#### Badge
You can set the icon badge in the payload:

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        message: "Something happened at home!"
        data:
          push:
            badge: 5
```

#### Subtitle
iOS 10 supports a subtitle in addition to the title:

```yaml
automation
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        message: "Something happened at home!"
        data:
          subtitle: "Subtitle goes here"
```

### {% linkable_title Sending notifications to multiple phones %}
To send notifications to multiple phones, create a [notification group](/components/notify.group/):
```yaml
notify:
  - name: NOTIFIER_NAME
    platform: group
    services:
      - service: ios_iphone_one
      - service: ios_iphone_two
```
Now, you can send notifications to everyone in the group using:
```yaml
  automation:
    - alias: Notify iOS app
      trigger:
        ...
      action:
        service: notify.NOTIFIER_NAME
        data:
          message: "Something happened at home!"
          data:
            push:
              badge: 5
```
