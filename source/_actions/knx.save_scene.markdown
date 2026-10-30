---
title: "Save scene"
action: knx.save_scene
domain: knx
description: "Tells KNX actuators to store their current state in a KNX scene."
related_actions:
  - scene.turn_on
  - knx.send
---

The **Save scene** action tells KNX actuators to store their current state in the scene of a KNX scene {% term entity %}. The next time the scene is activated, the actuators restore that state.

This is useful when you want to adjust a scene without changing the device parameters in ETS. For example, dim the lights and move the blinds until the room looks the way you like, then save that state as your evening scene.

The action sends a DPT 18.001 scene control telegram with the learn bit set to the scene's group address. Every actuator assigned to that group address stores its current state under the scene number of the entity. Saving a scene does not activate it, and does not change the state of the scene entity.

{% important %}

The actuators must support scene learning. Some actuators only accept it when it is enabled in their ETS parameters. Check the documentation of your devices.

{% endimportant %}

{% include actions/ui_header.md %}

To save a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your KNX scene.
6. From the actions shown for that target, select **Save scene**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.save_scene`. A basic example looks like this:

{% example %}
action: |
  action: knx.save_scene
  target:
    entity_id: scene.living_room_evening
{% endexample %}

This tells the actuators of the living room evening scene to store their current state in it.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="scene" %}

Only KNX scene entities are affected. Other scenes behind a targeted device, area, floor, or label are skipped.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
