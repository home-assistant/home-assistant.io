---
title: Scenes
description: Instructions on how to set up scenes within Home Assistant.
ha_category:
  - Organization
ha_release: 0.15
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: scene
ha_integration_type: entity
---

A scene entity can restore the state of a group of entities.
You can define scenes yourself, or they can be provided by an integration.

{% include integrations/building_block_integration.md %}

## The state of a scene

The scene entity is stateless. Unlike a normal switch entity, it does not have an `on` or `off` state.

Every scene entity keeps track of the timestamp of when it was last called, either via the Home Assistant UI or via an action.

<p class='img'>
<img src='/images/integrations/scene/state_scene.png' alt='Screenshot showing the state of a scene entity in the developer tools' />
Screenshot showing the state of a scene entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Scenes created by integrations

Some integrations such as [Philips Hue](/integrations/hue/), [MQTT](/integrations/mqtt/), and [KNX](/integrations/knx/) provide scenes. You can activate them from the Home Assistant UI or via an action. In this case, the integration provides the preferred states to restore.

## Creating a scene

You can create scenes that capture the states you want for certain entities. For example, a scene can specify that light A should be turned on and light B should be bright red.

You can create and manage scenes via the user interface using the [scene editor](/docs/scene/editor/). You can also configure them manually via {% term "`configuration.yaml`" %}. Note that entity data is not an action parameter; it's a representation of the desired state:

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    icon: "mdi:flower-tulip"
    entities:
      light.tv_back_light: "on"
      light.ceiling:
        state: "on"
        brightness: 200
        color_mode: "xy"
        xy_color: [0.33, 0.66]
  - name: Movies
    entities:
      light.tv_back_light:
        state: "on"
        brightness: 125
      light.ceiling: "off"
      media_player.sony_bravia_tv:
        state: "on"
        source: "HDMI 1"
  - name: Standard
    entities:
      light.tv_back_light:
        state: "off"
      light.ceiling:
        state: "on"
        brightness: 125
        color_mode: "white"
```

{% configuration %}
name:
  description: Friendly name of the scene.
  required: true
  type: string
icon:
  description: Icon for the scene.
  required: false
  type: string
entities:
  description: Entities to control and their desired states.
  required: true
  type: list
{% endconfiguration %}

There are two ways to define the states of each `entity_id`:

- Define the `state` directly with the entity. The `state` is required.
- Define a complex state with its attributes. You can see all attributes available for a particular entity under **Developer tools** > **States**.

Scenes can be activated using the `scene.turn_on` action (there is no `scene.turn_off` action).

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

With the `scene.apply` action, you can apply a scene without first defining it via configuration. Instead, you pass the states as part of the action data. The format of the data is the same as the `entities` field in a configuration.

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
          light.ceiling: "off"
          media_player.sony_bravia_tv:
            state: "on"
            source: "HDMI 1"
```

## Using scene transitions

Both the `scene.apply` and `scene.turn_on` actions support setting a transition to smooth the change into the scene.

Here's an example automation that activates a romantic scene with a 2.5 second transition.

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

Transitions are currently only supported by lights, and the lights themselves must also support them. However, the scene does not need to consist only of lights to have a transition set.

## Reloading scenes

Whenever you make a change to your scene configuration, you can call the `scene.reload` action to reload the scenes.

## Creating scenes on the fly

Create a new scene without having to configure it by calling the `scene.create` action. This scene will be discarded after reloading the configuration.

You need to pass a `scene_id` in lowercase and with underscores instead of spaces. You may also want to specify the entities in the same format as when configuring the scene. You can also take a snapshot of the current state by using the `snapshot_entities` parameter. In this case, you have to specify the `entity_id` of all entities you want to take a snapshot of. `entities` and `snapshot_entities` can be combined, but you have to use at least one of them.

If the scene was previously created by `scene.create`, it will be overwritten. If the scene was created by YAML, nothing happens and a warning appears in your log files.

### Video tutorial

This video tutorial explains how scenes work and how you can use scenes on the fly.

<lite-youtube videoid="JW9PC6ptXcM" videotitle="Scenes on Steroids in Home Assistant - How To - Tutorial" posterquality="maxresdefault"></lite-youtube>

```yaml
# Example automation using entities
automation:
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: scene.create
      data:
        scene_id: my_scene
        entities:
          light.tv_back_light:
            state: "on"
            brightness: 100
          light.ceiling: "off"
          media_player.sony_bravia_tv:
            state: "on"
            source: "HDMI 1"
```

## Deleting dynamically created scenes

Any scene that you have created with the `scene.create` action can also be deleted on demand with the `scene.delete` action.

You will need to pass in the `entity_id` of such a scene. As opposed to the `scene_id` used for creation, the `entity_id` must also include the `scene` domain.

If the scene was not previously created by `scene.create`, the action will fail and an error will appear in the logs.

```yaml
# Example automation
automation:
  triggers:
    - trigger: state
      entity_id: sun.sun
      to: "below_horizon"
  actions:
    - action: scene.delete
      data:
        entity_id: scene.my_scene
```

The following example turns off some entities as soon as a window opens. The states of the entities are restored after the window is closed again.

```yaml
# Example automation using snapshot
- alias: "Window opened"
  triggers:
  - trigger: state
    entity_id: binary_sensor.window
    from: "off"
    to: "on"
  actions:
  - action: scene.create
    data:
      scene_id: before
      snapshot_entities:
      - climate.ecobee
      - light.ceiling_lights
  - action: light.turn_off
    target:
      entity_id: light.ceiling_lights
  - action: climate.set_hvac_mode
    target:
      entity_id: climate.ecobee
    data:
      hvac_mode: "off"
- alias: "Window closed"
  triggers:
  - trigger: state
    entity_id: binary_sensor.window
    from: "on"
    to: "off"
  actions:
  - action: scene.turn_on
    target:
      entity_id: scene.before
```
