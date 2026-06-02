---
title: "Scene activated"
trigger: scene.activated
domain: scene
description: "Runs when a scene is activated."
---

Use this trigger when you want an automation to run every time a scene is activated. This is useful when activating a scene should also kick off follow-up actions, such as sending a notification, starting media playback, or adjusting devices that are not part of the scene itself.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or scene entity you want to monitor.
5. From the triggers shown for that target, select **Scene activated**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `scene.activated`. A basic example looks like this:

{% example %}
trigger: |
  trigger: scene.activated
  target:
    entity_id: scene.movie_night
{% endexample %}

This fires every time `scene.movie_night` is activated.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- This trigger fires every time the scene is activated. For example, from the UI, a dashboard, a voice command, another automation, or the **Activate scene** action.
- A scene entity is stateless. It does not have an `on` or `off` state, but it does track the timestamp of when it was last activated. This trigger fires when that timestamp updates.
- Changes to `unavailable` or `unknown` do not count as scene activations.
- If you only need to activate a scene from an automation, use the related [**Activate scene**](/actions/scene.turn_on/) action instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: switch the TV to the movie source when the movie night scene is activated

When you activate the movie night scene, also switch the living room TV to the HDMI input your media player is on. TV inputs are not typically captured in a scene, so a trigger-based automation is a good way to handle them.

- **Trigger**: Scene activated
  - **Target**: Movie night scene
- **Action**: Select source on the living room TV

{% details "YAML example for switching TV input with a scene" %}

{% example %}
automation: |
  - alias: "Switch TV to movie source on movie night"
    triggers:
      - trigger: scene.activated
        target:
          entity_id: scene.movie_night
    actions:
      - action: media_player.select_source
        target:
          entity_id: media_player.living_room_tv
        data:
          source: "HDMI 1"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
