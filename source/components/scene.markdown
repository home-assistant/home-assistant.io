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

A user can create scenes that capture the states you want certain entities to be. For example a scene
can contain that light A should be turned on and light B should be bright red.

A scene is active if all states of the scene match the actual states. An optional `fuzzy_match` option
can be given to allow entities to match if attributes are not exact but are in range of the preferred
state.

If a scene is manually activated it will store the previous state of the entities. These will be
restored when the state is deactivated manually. If one of the enties that are being tracked change
state on its own, the old state will not be restored when it is being deactivated.

Scenes can be activated using the service `scene.turn_on` and deactivated using the service `scene.turn_off`.

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    # Optional, allow fuzzy matching number atttributes to check if scene is on
    fuzzy_match: 0.2
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
