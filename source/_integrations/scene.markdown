---
title: Scenes
description: Instructions on how to setup scenes within Home Assistant.
logo: home-assistant.png
ha_category:
  - Organization
ha_release: 0.15
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
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
        brightness: 125
      light.ceiling: off
      media_player.sony_bravia_tv:
        state: on
        source: HDMI 1
        state: on
```

{% configuration %}
name:
  description: Friendly name of scene.
  required: true
  type: string
entities:
  description: Entities to control and their desired state.
  required: true
  type: list
{% endconfiguration %}

As you can see, there are two ways to define the states of each `entity_id`:

- Define the `state` directly with the entity. Be aware, that `state` needs to be defined.
- Define a complex state with its attributes. You can see all attributes available for a particular entity under `developer-tools -> state`.

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
          state: on
          source: HDMI 1
```

## Reloading scenes

Whenever you make a change to your scene configuration, you can call the `scene.reload` service to reload the scenes.

## Creating scenes on the fly

Create a new scene without having to configure it by calling the `scene.create` service. This scene will be discarded after reloading the configuration.

You need to pass a `scene_id` in lowercase and with underscores instead of spaces. You also may want to specify the entities in the same format as when configuring the scene. You can also take a snapshot of the current state by using the `snapshot_entities` parameter. In this case, you have to specify the `entity_id` of all entities you want to take a snapshot of. `entities` and `snapshot_entities` can be combined but you have to use at least one of them.

If the scene was previously created by `scene.create`, it will be overwritten. If the scene was created by YAML, nothing happens but a warning in your log files.

```yaml
# Example automation using entities
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

The following example turns off some entities as soon as a window opens. The states of the entities are restored after the window is closed again.

```yaml
# Example automation using snapshot
- alias: Window opened
  trigger:
  - platform: state
    entity_id: binary_sensor.window
    from: 'off'
    to: 'on'
  condition: []
  action:
  - service: scene.create
    data:
      scene_id: before
      snapshot_entities:
      - climate.ecobee
      - light.ceiling_lights
  - service: light.turn_off
    data:
      entity_id: light.ceiling_lights
  - service: climate.set_hvac_mode
    data:
      entity_id: climate.ecobee
      hvac_mode: 'off'
- alias: Window closed
  trigger:
  - platform: state
    entity_id: binary_sensor.window
    from: 'on'
    to: 'off'
  condition: []
  action:
  - service: scene.turn_on
    data:
      entity_id: scene.before
```
