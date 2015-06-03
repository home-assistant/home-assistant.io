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

The time and date platform simple displays the time in various formats, the date, or both.

```yaml
# Example configuration.yaml entry
sensor:
  platform: time_date
  display_options:
    - type: 'time'
    - type: 'date'
    - type: 'date_time'
    - type: 'time_date'
    - type: 'time_utc'
    - type: 'beat'
```

The types *date_time* and *time_date* shows the date and the time. The other types just the time or the date. *beat* shows the [Swatch Internet Time](http://www.swatch.com/en_us/internet-time).

<p class='img'>
  <img src='{{site_root}}/images/screenshots/time_date.png' />
</p>

