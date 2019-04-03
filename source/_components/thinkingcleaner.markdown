---
layout: page
title: "Thinking Cleaner"
description: "Instructions on how to integrate a ThinkingCleaner within Home Assistant."
date: 2016-04-10 17:24
sidebar: true
comments: false
sharing: true
footer: true
logo: thinkingcleaner.png
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.18
redirect_from:
 - /components/sensor.thinkingcleaner/
 - /components/switch.thinkingcleaner/
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## {% linkable_title Sensor %}

The `thinkingcleaner` sensor platform simple displays information about your [Thinking Cleaner](http://www.thinkingcleaner.com) add-on.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thinkingcleaner
```

This will automatically add sensors for each Thinking Cleaner in your network.

## {% linkable_title switch %}

The `thinkingcleaner` switch platform allows you to control your [Thinking Cleaner](http://www.thinkingcleaner.com) add-on.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: thinkingcleaner
```

This will automatically add switches for each Thinking Cleaner in your network.
