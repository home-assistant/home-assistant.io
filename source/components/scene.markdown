---
layout: page
title: "Scenes"
description: "Instructions how to setup scenes within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

A user can create scenes that capture the states you want certain entities to be. For example a scene can contain that light A should be turned on and light B should be bright red. Deactivating a scene will restore the previous state from before the scene was activated. Just like scripts, scenes have their own separate page to see which scenes are on.

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    entities:
      light.tv_back_light: on
      light.ceiling:
        state: on
        color: [0.33, 0.66]
        brightness: 200
       
 - name: all_lights_on
   entities:
      group.all_lights:
        state: on

 - name: all_lights_off
   entities:
      group.all_lights:
        state: off

```
