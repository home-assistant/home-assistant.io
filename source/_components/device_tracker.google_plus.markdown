---
layout: page
title: "Google Plus"
description: "Instructions how to use Google Plus to track Android devices in Home Assistant."
date: 2016-11-1 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: locative.png
ha_category: Presence Detection
---
If you share your Android's location with Google, this component fetches those locations from Google's servers to your Home Assistant. This component does NOT directly communicate with your phone, thus using this component does not cause any  additional battery drain.
This component can be used in 2 modes: 
- 

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: locative
```
