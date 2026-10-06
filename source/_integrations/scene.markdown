---
title: Scenes
description: Scenes set a group of entities to saved states in one step. Learn what the Scenes integration provides, how to define scenes in YAML, and how to use scenes in automations.
ha_category:
  - Organization
ha_release: 0.15
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: scene
ha_integration_type: entity
related:
  - docs: /docs/scene/
    title: Scenes
---

The **Scenes** {% term integration %} lets you use {% term scenes %} in Home Assistant. A scene stores the states that you want for a group of {% term entities %}, and sets them again in one step when you activate it. For example, a "Movie night" scene can dim the TV backlight, turn off the ceiling light, and switch the TV to the right input.

Each scene is an {% term entity %}, for example, `scene.movie_night`. You can activate it from a dashboard, an automation, or a script, and start an automation when it's activated.

To create a scene, use the [scene editor](/docs/scene/editor/). To learn what scenes are and when to use them, refer to [Scenes](/docs/scene/).

{% my scenes badge %}

## Scenes from other integrations

Some integrations, such as [Philips Hue](/integrations/hue/), [MQTT](/integrations/mqtt/), and [KNX](/integrations/knx/), provide their own scenes. These scenes are also scene entities, and you activate them in the same way. When you activate one, Home Assistant tells the integration to activate it, and the integration or the device decides what changes. That's why you can't change these scenes in the scene editor. You manage them where the integration manages its scenes. For example, you create [Hue scenes](/integrations/hue/#scenes) in the Hue app, [KNX scenes](/integrations/knx/#scene) in the KNX panel or in YAML, and [MQTT scenes](/integrations/scene.mqtt/) in YAML or with MQTT discovery.

## The state of a scene

A scene doesn't have an on or off state. Activating a scene sets the states of its entities, but there is nothing to turn off afterwards. To go back to the earlier states, activate another scene, or save the current states first with [**Create scene**](/actions/scene.create/).

The state of a scene entity is the date and time when the scene was last activated. Home Assistant keeps it after a restart.

<p class='img'>
<img src='/images/integrations/scene/state_scene.png' alt='Screenshot showing the state of a scene entity in the States tab of Tools.' />
Screenshot showing the state of a scene entity in {% my tools_states title="**Settings** > **Tools** > **States**" %}
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Scenes from the scene editor, from YAML, or from the **Create scene** action have these attributes:

- `entity_id`: The entities in the scene.
- `id`: The unique ID of the scene, if it has one.

## Defining scenes in YAML

Scenes that you create in the scene editor are stored in the `scenes.yaml` file. You can also write scenes in YAML yourself, for example, directly in your {% term "`configuration.yaml`" %} file. Only the scenes in `scenes.yaml` can be edited in the scene editor.

Under `entities`, you list the states that the entities should have, not the actions to get there:

```yaml
# Example configuration.yaml entry
scene:
  - name: "Romantic"
    icon: "mdi:flower-tulip"
    entities:
      light.tv_back_light: "on"
      light.ceiling:
        state: "on"
        brightness: 200
        color_mode: "xy"
        xy_color:
          - 0.33
          - 0.66
  - name: "Movies"
    entities:
      light.tv_back_light:
        state: "on"
        brightness: 125
      light.ceiling: "off"
      media_player.sony_bravia_tv:
        state: "on"
        source: "HDMI 1"
  - name: "Standard"
    entities:
      light.tv_back_light:
        state: "off"
      light.ceiling:
        state: "on"
        brightness: 125
        color_mode: "white"
```

{% configuration %}
id:
  description: A unique ID for the scene. Scenes that you create in the scene editor get one automatically. Without an ID, you can't edit the scene in the scene editor, or change the settings of the scene entity in the UI, for example, its area or category.
  required: false
  type: string
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
  type: map
{% endconfiguration %}

There are two ways to define the state of an entity:

- Only the state
  - For example, `light.tv_back_light: "on"`.
- The state with attributes
  - For example, the brightness and color of a light. Add `state` and the attributes below the entity. To find the attributes of an entity, go to {% my tools_states title="**Settings** > **Tools** > **States**" %}.

### Editing a YAML scene in the scene editor

If you wrote a scene in another YAML file, for example, directly in your {% term "`configuration.yaml`" %} file, you can move it to `scenes.yaml`, so you can edit it in the scene editor. Your `configuration.yaml` file loads `scenes.yaml` with `scene: !include scenes.yaml`. This line is there by default. Check that your `configuration.yaml` file has it, and if it's missing, add it. If your `configuration.yaml` file already has a `scene:` section for other scenes, give that section a label, for example, `scene manual:`, because each key can only be used once.

1. Copy the scene from its old file to `scenes.yaml`.
   - `scenes.yaml` is a list, so each scene starts with `-`.
2. Give the scene an `id`. The `id` can be any text, as long as no other scene uses it:

   ```yaml
   # Example scenes.yaml entry
   - id: "romantic"
     name: "Romantic"
     entities:
       light.tv_back_light: "on"
       light.ceiling:
         state: "on"
         brightness: 200
         color_mode: "xy"
         xy_color:
           - 0.33
           - 0.66
   ```

3. Remove the scene from its old file.
   - If you leave it there, Home Assistant loads both copies, and you have the scene twice.
4. [Reload the scenes](#reloading-scenes).
   - Result: The scene shows up in the scene editor, and you can edit it there.

{% note %}
When you save a scene in the editor, the comments in `scenes.yaml` are lost.
{% endnote %}

## Reloading scenes

After you change scenes in YAML, you can apply the changes without restarting Home Assistant:

- Go to {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %}, and under **YAML configuration reloading**, select **Scenes**.
- In an automation or a script, use the [**Reload scenes**](/actions/scene.reload/) action.

Reloading also removes the scenes that you created with the **Create scene** action.

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Scene automation examples

The following examples show how you can use scenes in automations.

{% include docs/paste_yaml_tip.md %}

### Automation: activate a scene slowly when someone comes home

When Sweetheart comes home, this automation activates the Romantic scene. The lights change to their new states over 2.5 seconds, instead of all at once. Transitions only work for lights that support them. Other entities in the scene change right away.

- **Trigger**: Zone entered
  - **Target**: Sweetheart
  - **Zone**: Home
- **Action**: Activate scene
  - **Target**: Romantic
  - **Transition**: 2.5

{% details "YAML example for activating a scene with a transition" %}

{% example %}
automation: |
  - alias: "Activate the romantic scene when Sweetheart comes home"
    triggers:
      - trigger: zone.entered
        target:
          entity_id: device_tracker.sweetheart
        options:
          zone: zone.home
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.romantic
        data:
          transition: 2.5
{% endexample %}

{% enddetails %}

### Automation: turn things off while a window is open, and restore them afterwards

These two automations work together. When the window opens, the first one saves the current states of the thermostat and the ceiling lights in a new scene, and then turns them off. When the window closes, the second one activates that scene, so everything goes back to how it was.

- Automation 1
  - **Trigger**: Window opened
    - **Target**: Window
  - **Action**: Create scene
    - **Scene entity ID**: `before`
    - **Entities snapshot**: Thermostat and ceiling lights
  - **Action**: Turn off light
    - **Target**: Ceiling lights
  - **Action**: Set thermostat HVAC mode
    - **Target**: Thermostat
    - **HVAC mode**: Off
- Automation 2
  - **Trigger**: Window closed
    - **Target**: Window
  - **Action**: Activate scene
    - **Target**: `scene.before`

{% details "YAML example for saving and restoring states with a window" %}

{% example %}
automation: |
  - alias: "Window opened"
    triggers:
      - trigger: window.opened
        target:
          entity_id: binary_sensor.window
    actions:
      - action: scene.create
        data:
          scene_id: "before"
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
      - trigger: window.closed
        target:
          entity_id: binary_sensor.window
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.before
{% endexample %}

{% enddetails %}
