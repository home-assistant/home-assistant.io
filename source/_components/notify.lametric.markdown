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

This component allows to send notification to a LaMetric device. It need the LaMetric platform to be configured first.

```yaml
notify:
  name: lametric1
  platform: lametric
  display_time: 20
  icon: i555
```

- **name** (*Optional*): The name of the LaMetric device. Usually it is "My Lametric"
- **display_time** (*Optional*): Defines how long the message should be displayed (in seconds).
- **icon** (*Optional*): An icon or animation. Check out the list of all icons her: https://developer.lametric.com/icons 
Note that icons always begin with "i" while animations begin with "a". This is part of the name, you can't just use the number.
