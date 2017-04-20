---
layout: page
title: "LaMetric"
description: "Instructions how to add LaMetric notifications to Home Assistant."
date: 2016-10-20 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lametric.png
ha_category: Notifications
ha_release: 0.31
---


The `lametric` notification platform allows you to deliver notifications from Home Assistant to you [LaMetric Smart Ticker](http://lametric.com/).

To enable the LaMetric notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  platform: lametric
  host: 192.168.1.15
  api_key: XxxxXXxxXXXxxXxXxxXX
```

Configuration variables:

- **host** (*Required*): The ip address of your LaMetric device, e.g. 192.168.1.15
- **api_key** (*Required*): Your LaMetric's api key. To find your key, create a free [LaMetric Developer account](https://developer.lametric.com/user/devices) and click 'Devices' under your account settigns. Your devices and their API keys will be displayed there.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
