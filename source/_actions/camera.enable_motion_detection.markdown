---
title: "Enable camera motion detection"
action: camera.enable_motion_detection
domain: camera
description: "Enables the motion detection of a camera."
related_actions:
  - camera.disable_motion_detection
  - camera.turn_on
  - camera.turn_off
  - camera.snapshot
  - camera.record
  - camera.play_stream
---

Use this action to enable motion detection on a camera, for example to start watching for movement when you leave home. Not all cameras support this action. Check the documentation of the integration that provides your camera.

{% include actions/ui_header.md %}

To enable motion detection from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to set.
6. From the actions shown for that target, select **Enable camera motion detection**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.enable_motion_detection`. A basic example looks like this:

{% example %}
action: |
  action: camera.enable_motion_detection
  target:
    entity_id: camera.living_room_camera
{% endexample %}

This enables motion detection on `camera.living_room_camera`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with camera entities, and only with cameras that support motion detection.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable motion detection when everyone leaves

Turn on a camera's motion detection when the last person leaves home.

- **Trigger**: State: Person changes to not_home
- **Action**: Enable camera motion detection
  - **Target**: Living room camera

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Enable camera motion detection when everyone leaves"
    triggers:
      - trigger: state
        entity_id: person.alex
        to: "not_home"
    actions:
      - action: camera.enable_motion_detection
        target:
          entity_id: camera.living_room_camera
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
