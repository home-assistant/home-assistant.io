---
layout: page
title: "Google Home Alarm"
description: "Instructions on how to integrate a Google Home alarm sensor into Home Assistant."
date: 2018-11-19 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_home.png
ha_category: Calendar
ha_release: 0.87
ha_iot_class: "Local Polling"
---

The `googlehome` sensor platform allows you to show the next alarm and timer from a Google Home on the network.
It uses the [GHLocalApi](https://github.com/rithvikvibhu/GHLocalApi) to retrieve the data.

To use the Google Home Alarm sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: google_home_alarm
    host: 192.168.0.xxx
```

{% configuration %}
host:
  description: The IP address of the Google Home.
  required: true
  type: string

{% endconfiguration %}
