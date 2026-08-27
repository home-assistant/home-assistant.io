---
title: "Create scene"
action: scene.create
domain: scene
description: "Creates a new scene on the fly."
related_actions:
  - scene.turn_on
  - scene.delete
  - scene.apply
---

Use this action to create a scene while Home Assistant is running, without adding it to your configuration. You can list the {% term entities %} and the states you want them to have, take a snapshot of the states they have right now, or combine both.

A scene created this way is temporary. It disappears when you reload the scenes or restart Home Assistant.

Snapshots make this action a good fit for automations that change something for a while and then put everything back the way it was.

{% include actions/ui_header.md %}

To create a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Scene: Create scene**.
6. Enter a **Scene entity ID** for the new scene, in lowercase and with underscores instead of spaces.
7. Fill in **Entity states**, **Entities snapshot**, or both.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Scene entity ID:
  description: The ID of the new scene, in lowercase and with underscores instead of spaces. The scene becomes available as `scene.your_id`.
  required: true
Entity states:
  description: The entities and the state you want each of them to have. Use this when you know the states you want. If the entities are already in the states you want to store, use **Entities snapshot** instead.
  required: false
Entities snapshot:
  description: The entities whose current states you want to store in the scene.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `scene.create`. A basic example looks like this:

{% example %}
action: |
  action: scene.create
  data:
    scene_id: my_scene
    entities:
      light.tv_back_light:
        state: "on"
        brightness: 100
      light.ceiling: "off"
{% endexample %}

This creates `scene.my_scene`, which sets the two lights to those states when you activate it.

To store the states the entities have right now, use a snapshot instead:

{% example %}
action: |
  action: scene.create
  data:
    scene_id: before
    snapshot_entities:
      - climate.ecobee
      - light.ceiling_lights
{% endexample %}

### Options in YAML

{% options_yaml %}
scene_id:
  description: The ID of the new scene, in lowercase and with underscores instead of spaces. The scene becomes available as `scene.your_id`.
  required: true
  type: string
entities:
  description: A mapping of entity IDs to the state you want each of them to have. Use a plain value such as `"on"` for the state only, or a mapping with a `state` key and attributes such as `brightness`.
  required: false
  type: map
snapshot_entities:
  description: The entity IDs whose current states you want to store in the scene.
  required: false
  type: list
{% endoptions_yaml %}

## Good to know

- Set at least one of `entities` or `snapshot_entities`. You can also combine them, for example to store the current state of some entities and pick specific states for others.
- If a scene with the same ID was created with this action before, it is overwritten. If a scene with that ID comes from your YAML configuration, nothing happens and a warning appears in your logs.
- Scenes created with this action are removed again by [Reload scenes](/actions/scene.reload/) or by a restart. To remove one on demand, use [Delete scene](/actions/scene.delete/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: restore the room after a window is closed

Store the current states before turning things off, then activate the stored scene once the window is closed again.

- **Trigger**: Window opened
  - **Target**: Window
- **Action**: Create scene
  - **Scene entity ID**: `before`
  - **Entities snapshot**: thermostat and ceiling lights

{% details "Show example YAML" %}

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
      - trigger: window.closed
        target:
          entity_id: binary_sensor.window
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.before
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
