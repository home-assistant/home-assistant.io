---
layout: page
title: "Dim lights when playing media"
description: "Dim lights up or down when playing media"
date: 2015-10-15 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

Like it how the lights dim up/down at the movies? Do it at home as well!

This example uses the media player, Philips Hue (transitions) and the sun component. We'll use actions to detect media player state changes and scenes to control multiple lights, color settings and transition between scenes.

#### {% linkable_title Scenes %}
One scene for normal light, one for when movies are on. A 2 second transition gives a nice 'feel' to the switch.

```yaml
scene:
  - name: Livingroom normal
    entities:
        light.light1:
            state: on
            transition: 2
            brightness: 150
            xy_color: [ 0.4448, 0.4066 ]
        light.light2:
            state: on
            transition: 2
            brightness: 215
            xy_color: [ 0.4448, 0.4066 ]
  - name: Livingroom dim
    entities:
        light.light1:
            state: on
            transition: 2
            brightness: 75
            xy_color: [ 0.5926, 0.3814 ]
        light.light2:
            state: on
            transition: 2
            brightness: 145
            xy_color: [ 0.5529, 0.4107 ]
```


#### {% linkable_title Automation  %}
The paused/stopped state is best matched using "from: 'playing'". Adding in the sun condition as we only want this when it's dark.

```yaml
automation:
  - alias: "Media player paused/stopped"
    trigger:
      - platform: state
        entity_id: media_player.htpc
        from: 'playing'
    condition:
      - condition: state
        entity_id: sun.sun
        state: 'below_horizon'
    action:
        service: scene.turn_on
        entity_id: scene.livingroom_normal

  - alias: "Media player playing"
    trigger:
      - platform: state
        entity_id: media_player.htpc
        to: 'playing'
    condition:
      - condition: state
        entity_id: sun.sun
        state: 'below_horizon'
    action:
        service: scene.turn_on
        entity_id: scene.livingroom_dim
```

