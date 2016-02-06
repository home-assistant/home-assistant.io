---
layout: component
title: "Hyperion"
description: "Instructions how to integrate Hyperion into Home Assistant."
date: 2015-10-25 22:43
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
---

This platform allows you to integrate your [Hyperion](https://github.com/tvdzwan/hyperion/wiki) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  platform: hyperion
  host: 192.168.1.98
  # Optional
  port: 19444
```
