---
title: "Scenes"
description: "Instructions on how to setup scenes within Home Assistant."
logo: home-assistant.png
ha_category:
  - Organization
ha_qa_scale: internal
ha_release: 0.15
---

You can create scenes that capture the states you want certain entities to be. For example, a scene can specify that light A should be turned on and light B should be bright red.

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
      media_player.sony_bravia_tv:
        source: HDMI 1
```

{% configuration %}
name:
  description: Friendly name of scene.
  required: true
  type: string
entities:
  description: Entities to control.
  required: true
  type: list
{% endconfiguration %}

As you can see, there are two ways to define the states of each `entity_id`:

- Define the `state` directly with the entity.
- Define a complex state with its attributes.

Scenes can be activated using the service `scene.turn_on` (there is no 'scene.turn_off' service).

```yaml
# Example automation
automation:
  trigger:
    platform: state
    entity_id: device_tracker.sweetheart
    from: "not_home"
    to: "home"
  action:
    service: scene.turn_on
    entity_id: scene.romantic
```

## Applying a scene without defining it

With the `scene.apply` service you are able to apply a scene without first defining it via configuration. Instead, you pass the states as part of the service data. The format of the data is the same as the `entities` field in a configuration.

```yaml
# Example automation
automation:
  trigger:
    platform: state
    entity_id: device_tracker.sweetheart
    from: "not_home"
    to: "home"
  action:
    service: scene.apply
    data:
      entities:
        light.tv_back_light:
          state: on
          brightness: 100
        light.ceiling: off
        media_player.sony_bravia_tv:
          source: HDMI 1
```

## Reloading scenes

Whenever you make a change to your scene configuration, you can call the `scene.reload` service to reload the scenes.

## Creating scenes on the fly

Create a new scene without having to configure it by calling the `scene.create` service. This scene will be discarded after reloading the configuration.

You need to pass a scene_id in lowercase and with underscores instead of spaces. You also need to specify the entities in the same format as when configuring the scene.

```yaml
# Example automation
automation:
  trigger:
    platform: homeassistant
    event: start
  action:
    service: scene.create
    data:
      scene_id: my_scene
      entities:
        light.tv_back_light:
          state: on
          brightness: 100
        light.ceiling: off
        media_player.sony_bravia_tv:
          state: on
          source: HDMI 1
```
