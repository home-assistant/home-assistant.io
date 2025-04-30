---
title: "Scenes"
description: "Instructions on how to setup scenes within Home Assistant."
---

You can create scenes that capture the states you want certain entities to be. For example, a scene can specify that light A should be turned on and light B should be bright red.

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
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

## How to configure your scene

In the scene you define in your {% term YAML %} files, please ensure you use
all required parameters as listed below.

{% configuration %}
name: 
  description: Friendly name of the scene.
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

Scenes can be activated using the action `scene.turn_on` (there is no 'scene.turn_off' action).

```yaml
# Example automation
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.sweetheart
      from: "not_home"
      to: "home"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.romantic
```

## Applying a scene without defining it

With the `scene.apply` action you are able to apply a scene without first defining it via configuration. Instead, you pass the states as part of the data. The format of the data is the same as the `entities` field in a configuration.

```yaml
# Example automation
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.sweetheart
      from: "not_home"
      to: "home"
  actions:
    - action: scene.apply
      data:
        entities:
          light.tv_back_light:
            state: "on"
            brightness: 100
          light.ceiling: off
          media_player.sony_bravia_tv:
            state: "on"
            source: "HDMI 1"
```

## Using scene transitions

Both the `scene.apply` and `scene.turn_on` actions support setting a transition,
which enables you to smoothen the transition to the scene.

This is an example of an automation that sets a romantic scene, in which the
light will transition to the scene in 2.5 seconds.

```yaml
# Example automation
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.sweetheart
      from: "not_home"
      to: "home"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.romantic
      data:
        transition: 2.5
```

Transitions are currently only support by lights, which in their turn, have
to support it as well. However, the scene itself does not have to consist of
only lights to have a transition set.

## Reloading scenes

Whenever you make a change to your scene configuration, you can call the `scene.reload` action to reload the scenes.
