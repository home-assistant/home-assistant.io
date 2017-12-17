---
layout: page
title: "Thinking Cleaner Switch"
description: "Instructions how to integrate a ThinkingCleaner switches within Home Assistant."
date: 2016-04-10 17:24
sidebar: true
comments: false
sharing: true
footer: true
logo: thinkingcleaner.png
ha_category: Switch
ha_iot_class: "Local Poll"
ha_release: 0.18
---

The `thinkingcleaner` switch platform allows you to control your [Thinking Cleaner](http://www.thinkingcleaner.com) add-on.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: thinkingcleaner
```

This will automatically add switches for each Thinking Cleaner in your network.
