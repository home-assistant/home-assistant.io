---
layout: page
title: "Date Countdown Sensor"
description: "Instructions how to integrate countdowns into Home Assistant."
date: 2017-05-26 20:53:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.46
---


The `date_countdown` sensor platform reports the time in days hours and minutes until the specified end date and time

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: date_countdown
    name: Wedding Countdown
    date: "20-05-2018 18:00"
```

Configuration variables:

- **name** (*Optional*): Name of the countdown sensor.
- **date** (*Required*): Defines the date and time to count down to.

<p class='note warning'>
Make sure that the date format matches exactly to the above.
</p>
