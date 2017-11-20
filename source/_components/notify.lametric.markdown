---
layout: page
title: "LaMetric Notify"
description: "Instructions on how to setup the LaMetric notify platform with Home Assistant."
date: 2017-04-02 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: lametric.png
ha_category: Notifications
ha_release: 0.49
---

This component allows to send notification to a LaMetric device. It needs the LaMetric platform to be configured first.

```yaml
notify:
  name: lametric1
  platform: lametric
```

- **name** (*Optional*): The name of the LaMetric device. Usually it is "My Lametric".
- **lifetime** (*Optional*): Defines how long the message remains in LaMetric notification queue (in seconds). Defaults to 10.
- **icon** (*Optional*): An icon or animation. Check out the list of all icons here: https://developer.lametric.com/icons 
Note that icons always begin with "i" while animations begin with "a". This is part of the name, you can't just use the number!
- **cycles** (*Optional*): Defines how often the notification is displayed. Defaults to 1.

Extended functionality:

To add a notification sound or an icon override, it has to be done via service data.

Example:

```
...
- alias: 'Send notification on arrival at school'
  trigger:
    platform: state
    entity_id: device_tracker.son_mobile
    from: 'not_home'
    to: 'school'
  action:
    service: notify.lametric1
    data:
      message: 'Son has arrived at school!'
      data:
        sound: 'notification'
        icon: 'i51'
 ```
