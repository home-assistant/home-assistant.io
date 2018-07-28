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

The `lametric` notification platform allows to send notification to a LaMetric device. It needs the LaMetric platform to be configured first.

To enable LaMetric notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: lametric
```

{% configuration %}
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
  default: notify
lifetime:
  description: Defines how long the message remains in LaMetric notification queue (in seconds).
  required: false
  type: int
  default: 10
icon:
  description: An icon or animation.
  required: false
  type: string
cycles:
  description: Defines how often the notification is displayed.
  required: false
  type: int
  default: 1
priority:
  description: Defines the priority of the notification.
  required: false
  type: string
  default: warning
{% endconfiguration %}

Check out the list of all icons at [https://developer.lametric.com/icons](https://developer.lametric.com/icons). Note that icons always begin with "i" while animations begin with "a". This is part of the name, you can't just use the number!

## {% linkable_title Examples %}

### {% linkable_title Full configuration example %}

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: lametric
  lifetime: 20
  icon: a7956
  cycles: 3
  priority: info
```

### {% linkable_title Changing sounds and icons %}

To add a notification sound, icon, cycles, or priority override, it has to be done via service data.

```yaml
- alias: "Send notification on arrival at school"
  trigger:
    platform: state
    entity_id: device_tracker.son_mobile
    from: 'not_home'
    to: 'school'
  action:
    service: notify.lametric
    data:
      message: "Son has arrived at school!"
      data:
        sound: 'notification'
        icon: 'i51'
        cycles: 0
        priority: 'critical'
```

### {% linkable_title Only notify specific device %}

If you have more than one La Metric device, you can specify which will receive the message by adding `target:` to the service data:

```yaml
  action:
    service: notify.lametric
    data:
      message: "Son has arrived at school!"
      target: "Office LaMetric"
      data:
        sound: 'notification'
        icon: 'i51'
 ```

 If target is not specified, all LaMetric devices will be notified.
