---
layout: page
title: "Hyperion"
description: "Instructions how to integrate Hyperion into Home Assistant."
date: 2015-10-25 22:43
sidebar: true
comments: false
sharing: true
footer: true
logo: hyperion.png
ha_category: Light
ha_release: 0.7.6
---

This platform allows you to integrate your [Hyperion](https://hyperion-project.org/wiki) into Home Assistant.

Hyperion is an open source Ambilight implementation which runs on many platforms.

```yaml
# Example configuration.yaml entry
light:
  - platform: hyperion
```

Configuration variables:

- **host** (*Optional*): IP Address of the device the Hyperion service is running on.
- **port** (*Optional*): The Port used to comunicate with the Hyperion service (defualt is 19444).
