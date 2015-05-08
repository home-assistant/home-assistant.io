---
layout: page
title: "Time & Date support"
description: "Instructions how to integrate the time and the date within Home Assistant."
date: 2015-05-08 17:15
sidebar: false
comments: false
sharing: true
footer: true
---

The time and date platform simple displays the time, the date, or both.

```yaml
# Example configuration.yaml entry
sensor:
  platform: time_date
  monitored_variables:
    - type: 'time'
    - type: 'date'
    - type: 'datetime'
```

The type *datetime* shows the date and the time. The other two types just the time or the date. 

<p class='img'>
  <img src='{{site_root}}/images/screenshots/time_date.png' />
</p>

