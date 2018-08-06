---
layout: page
title: "PowerView Scenes"
description: "Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant."
date: 2016-03-11 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hunter-douglas-powerview.png
ha_category: Scene
ha_release: 0.15
---

Implements the [Hunter Douglas PowerView](http://www.hunterdouglas.com/operating-systems/powerview-motorization/support) platform scene control. It queries the PowerView Hub and Home Assistant displays them as scenes.

Scenes can be activated using the service `scene.turn_on`.

```yaml
# Example configuration.yaml entry
scene:
  platform: hunterdouglas_powerview
  address: IP_ADDRESS
```

Configuration variables:

- **address** (*Required*): IP address of the PowerView Hub, eg. 192.168.1.10.
