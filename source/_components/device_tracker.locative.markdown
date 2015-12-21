---
layout: component
title: "Locative"
description: "Instructions how to use Locative to track devices in Home Assistant."
date: 2015-10-13 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: locative.png
ha_category: Presence Detection
---


This platform allows you to detect presence using [Locative](https://my.locative.io/). Locative allows users to track their location on iOS devices.

To integrate Locative in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: locative
```
