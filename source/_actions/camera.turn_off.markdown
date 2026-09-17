---
title: "Turn off camera"
action: camera.turn_off
domain: camera
description: "Turns off a camera."
related_actions:
  - camera.turn_on
  - camera.enable_motion_detection
  - camera.disable_motion_detection
  - camera.snapshot
  - camera.record
  - camera.play_stream
---

Use this action to turn off a camera, for example to stop a camera while you are home. Not all cameras support this action. Check the documentation of the integration that provides your camera.

{% include actions/ui_header.md %}

To turn off a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to turn off.
6. From the actions shown for that target, select **Turn off camera**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: camera.turn_off
  target:
    entity_id: camera.living_room_camera
{% endexample %}

This turns off `camera.living_room_camera`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with camera entities, and only with cameras that support being turned off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off a camera when you arrive home

Turn off a camera when someone arrives home.

- **Trigger**: State: Person changes to home
- **Action**: Turn off camera
  - **Target**: Living room camera

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn off the camera when someone arrives home"
    triggers:
      - trigger: state
        entity_id: person.alex
        to: "home"
    actions:
      - action: camera.turn_off
        target:
          entity_id: camera.living_room_camera
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
