---
layout: page
title: "Customize polling interval for any component"
description: "Shows how to customize polling interval for any component via configuration.yaml."
date: 2016-02-12 23:17 -0800
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Customize Defaults
---

Platforms that require polling will be polled in an interval specified by the main component. For example a light will check every 30 seconds for a changed state. It is possible to overwrite this scan interval for any platform that is being polled by specifying a `scan_interval` config key. In the example below we setup the Philips Hue lights but tell Home Assistant to poll the devices every 10 seconds instead of the default 30 seconds.

```yaml
# Example configuration.yaml entry to poll Hue lights every 10 seconds.
light:
  platform: hue
  scan_interval: 10
```
