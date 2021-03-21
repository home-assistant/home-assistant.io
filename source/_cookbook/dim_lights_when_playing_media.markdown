---
title: "Dim lights when playing media"
description: "Dim lights up or down when playing media"
ha_category: Automation Examples
---

Like it how the lights dim up/down at the movies? Do it at home as well!

This example uses the [media player](/integrations/media_player/), [lights](/integrations/light/) (transitions) and the [sun](/integrations/sun/) integration. We'll use actions to detect media player state changes and [scenes](/integrations/scene/) to control multiple lights and transition between scenes.

#### Scenes
One scene for normal light, one for when movies are on. A 2 second transition gives a nice 'feel' to the switch.

```yaml
scene:
  - name: Livingroom normal
    entities:
        light.light1:
            state: on
            transition: 2
            brightness_pct: 60
        light.light2:
            state: on
            transition: 2
            brightness_pct: 85
  - name: Livingroom dim
    entities:
        light.light1:
            state: on
            transition: 2
            brightness_pct: 30
        light.light2:
            state: on
            transition: 2
            brightness_pct: 55
```


#### Automation 
The paused/stopped state is best matched using "from: 'playing'". Adding in the sun condition as we only want this when it's dark.

```yaml
automation:
  - alias: "Media player paused/stopped"
    trigger:
      - platform: state
        entity_id: media_player.htpc
        from: "playing"
        to: "idle"
    condition:
      - condition: state
        entity_id: sun.sun
        state: "below_horizon"
    action:
        service: scene.turn_on
        target:
          entity_id: scene.livingroom_normal

  - alias: "Media player playing"
    trigger:
      - platform: state
        entity_id: media_player.htpc
        to: "playing"
        from: "idle"
    condition:
      - condition: state
        entity_id: sun.sun
        state: "below_horizon"
    action:
        service: scene.turn_on
        target:
          entity_id: scene.livingroom_dim
```

