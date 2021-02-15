---
title: Scenes
description: Instructions on how to setup scenes within Home Assistant.
ha_category:
  - Organization
ha_release: 0.15
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: scene
ha_iot_class:
---

You can create scenes that capture the states you want certain entities to be. For example, a scene can specify that light A should be turned on and light B should be bright red.

Scenes can be created and managed via the user interface using the [Scene Editor](/docs/scene/editor/). They can also be configured via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    icon: "mdi:flower-tulip"
    entities:
      light.tv_back_light: "on"
      light.ceiling:
        state: "on"
        xy_color: [0.33, 0.66]
        brightness: 200
  - name: Movies
    entities:
      light.tv_back_light:
        state: "on"
        brightness: 125
      light.ceiling: off
      media_player.sony_bravia_tv:
        state: "on"
        source: HDMI 1
```

{% configuration %}
name:
  description: Friendly name of scene.
  required: true
  type: string
icon:
  description: Icon for the scene.
  required: false
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
    target:
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
          state: "on"
          brightness: 100
        light.ceiling: off
        media_player.sony_bravia_tv:
          state: "on"
          source: HDMI 1
```

## Using scene transitions

Both the `scene.apply` and `scene.turn_on` services support setting a transition,
which enables you to smoothen the transition to the scene.

This is an example of an automation that sets a romantic scene, in which the
light will transition to the scene in 2.5 seconds.

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
    target:
      entity_id: scene.romantic
    data:
      transition: 2.5
```

Transitions are currently only support by lights, which in their turn, have
to support it as well. However, the scene itself does not have to consist of
only lights to have a transition set.

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
          state: "on"
          brightness: 100
        light.ceiling: off
        media_player.sony_bravia_tv:
          state: "on"
          source: HDMI 1
```

The following example turns off some entities as soon as a window opens. The states of the entities are restored after the window is closed again.

```yaml
# Example automation using snapshot
- alias: "Window opened"
  trigger:
  - platform: state
    entity_id: binary_sensor.window
    from: "off"
    to: "on"
  condition: []
  action:
  - service: scene.create
    data:
      scene_id: before
      snapshot_entities:
      - climate.ecobee
      - light.ceiling_lights
  - service: light.turn_off
    target:
      entity_id: light.ceiling_lights
  - service: climate.set_hvac_mode
    target:
      entity_id: climate.ecobee
    data:
      hvac_mode: "off"
- alias: "Window closed"
  trigger:
  - platform: state
    entity_id: binary_sensor.window
    from: "on"
    to: "off"
  condition: []
  action:
  - service: scene.turn_on
    target:
      entity_id: scene.before
```
