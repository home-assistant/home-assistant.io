---
layout: page
title: "Basic Notifications"
description: "Basic notes about iOS notifications"
date: 2016-10-25 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

The iOS notify platform accepts the standard `title`, `message` and `target` parameters.

Notes:

* `title` only displays on Apple Watch and iOS 10 devices.

* `target` can be used to specific a single device using its PushID, found in `ios.conf`. The preferred way of providing a target is through a target specific notify service.

### {% linkable_title Enhancing basic notifications %}

#### Badge
You can set the icon badge in the payload:

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.iOSApp
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
      service: notify.iOSApp
      data:
        message: "Something happened at home!"
        data:
          subtitle: "Subtitle goes here"
```
