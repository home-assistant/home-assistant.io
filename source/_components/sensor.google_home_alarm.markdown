---
layout: page
title: "Google Home Alarm"
description: "Instructions on how to integrate a BH1750 light sensor into Home Assistant."
date: 2018-11-19 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_home.png
ha_category: Calendar
ha_release: 0.83.0
ha_iot_class: "Local Polling"
---

The `google_home_alarm` sensor platform allows you to show the next alarm and timer from a Google Home on the network.
It uses the [GHLocalApi](https://github.com/rithvikvibhu/GHLocalApi) to retrieve the data.

To use the Google Home Alarm sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: google_home_alarm
    monitored_conditions:
      - 'alarm'
      - 'timer'
    display_options: 'time_date'
    host: 192.168.0.xxx
```

{% configuration %}
host:
  description: The IP address of the Google Home.
  required: true
  type: string
monitored_conditions:
  description: The conditions to monitor.
  required: false
  type: map
  keys:
    alarm:
      description: The next alarm.
    timer:
      description: The next timer.
display_options:
  description: The display mode of the reported state.
  required: false
  type: string
  default: 'time'

{% endconfiguration %}

Please note that ```display_options``` can only accept:

```
'time'
'date'
'date_time'
'time_date'
'time_utc'
'beat'
```
