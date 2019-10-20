---
title: "Basic Notifications"
description: "Basic notes about iOS notifications"
redirect_from: /ecosystem/ios/notifications/basic/
---

The iOS notify platform accepts the standard `title`, `message` and `target` parameters. The iOS notify platform supports targets as services. Assuming that you did not set a `name` when configuring the platform you should find all your registered and notification-enabled iOS devices available as notify targets as services with names prefixed "notify.ios_" and then the device name you entered at setup.

Notes:

* `title` only displays on Apple Watch and devices with iOS 10 or above.

* `target` can be used to specific a single device using its PushID, found in `ios.conf`. The preferred way of providing a target is through a target specific notify service.

<p class='img'>
  <img src='/images/ios/example.png' />
  A push notification showing all of the basic options `title` and `message` as well as `subtitle` and [actions](/ecosystem/ios/notifications/actions/).
</p>

### Enhancing basic notifications

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
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            badge: 5
```

#### Subtitle
Starting with iOS 10, a subtitle is supported in addition to the title:

```yaml
automation
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          subtitle: "Subtitle goes here"
```

#### Thread-id (grouping notifications)
Starting with iOS 12, grouping of notifications is supported. All notifications with the same thread-id will be grouped together in the notification center. Without a thread-id, all notifications from the app will be placed in a single group.

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            thread-id: "example-notification-group"
```


### Sending notifications to multiple phones
To send notifications to multiple phones, create a [notification group](/integrations/notify.group/):
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
