---
layout: component
title: "Scenes"
description: "Instructions how to setup scenes within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Organization
---

A user can create scenes that capture the states you want certain entities to be. For example a scene can contain that light A should be turned on and light B should be bright red.

Scenes can be activated using the service `scene.turn_on`.

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    entities:
      light.tv_back_light: on
      light.ceiling:
        state: on
        xy_color: [0.33, 0.66]
        brightness: 200

  - name: Movies
    entities:
      light.tv_back_light:
        state: on
        brightness: 100
      light.ceiling: off
```
