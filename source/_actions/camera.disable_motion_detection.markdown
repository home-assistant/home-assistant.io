---
title: "Disable camera motion detection"
action: camera.disable_motion_detection
domain: camera
description: "Disables the motion detection of a camera."
related_actions:
  - camera.enable_motion_detection
  - camera.turn_on
  - camera.turn_off
  - camera.snapshot
  - camera.record
  - camera.play_stream
---

Use this action to disable motion detection on a camera, for example to stop watching for movement when you are home. Not all cameras support this action. Check the documentation of the integration that provides your camera.

{% include actions/ui_header.md %}

To disable motion detection from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to set.
6. From the actions shown for that target, select **Disable camera motion detection**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.disable_motion_detection`. A basic example looks like this:

{% example %}
action: |
  action: camera.disable_motion_detection
  target:
    entity_id: camera.living_room_camera
{% endexample %}

This disables motion detection on `camera.living_room_camera`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with camera entities, and only with cameras that support motion detection.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: disable motion detection when someone arrives home

Turn off a camera's motion detection when someone arrives home.

- **Trigger**: State: Person changes to home
- **Action**: Disable camera motion detection
  - **Target**: Living room camera

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Disable camera motion detection when someone arrives home"
    triggers:
      - trigger: state
        entity_id: person.alex
        to: "home"
    actions:
      - action: camera.disable_motion_detection
        target:
          entity_id: camera.living_room_camera
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
