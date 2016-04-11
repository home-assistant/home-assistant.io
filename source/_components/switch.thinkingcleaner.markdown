---
layout: page
title: "ThinkingCleaner"
description: "Instructions how to integrate a ThinkingCleaner within Home Assistant."
date: 2016-04-10 17:24
sidebar: true
comments: false
sharing: true
footer: true
logo: thinkingcleaner.png
ha_category: Switch
ha_iot_class: "Local Poll"
--------------------------


The `ThinkingCleaner` switch platform simple displays information about your [ThinkingCleaner](http://www.thinkingcleaner.com) addon.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: thinkingcleaner
```

This will automatically add switches for each Thinking Cleaner in your network.