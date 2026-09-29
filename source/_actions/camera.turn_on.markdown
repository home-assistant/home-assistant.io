---
title: "Turn on camera"
action: camera.turn_on
domain: camera
description: "Turns on a camera."
related_actions:
  - camera.turn_off
  - camera.enable_motion_detection
  - camera.disable_motion_detection
  - camera.snapshot
  - camera.record
  - camera.play_stream
---

Use this action to turn on a camera, for example to start a camera again after it was turned off. Not all cameras support this action. Check the documentation of the integration that provides your camera.

{% include actions/ui_header.md %}

To turn on a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to turn on.
6. From the actions shown for that target, select **Turn on camera**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: camera.turn_on
  target:
    entity_id: camera.living_room_camera
{% endexample %}

This turns on `camera.living_room_camera`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with camera entities, and only with cameras that support being turned on.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on a camera when you leave home

Turn on a camera when the last person leaves home.

- **Trigger**: State: Person changes to not_home
- **Action**: Turn on camera
  - **Target**: Living room camera

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn on the camera when everyone leaves"
    triggers:
      - trigger: state
        entity_id: person.alex
        to: "not_home"
    actions:
      - action: camera.turn_on
        target:
          entity_id: camera.living_room_camera
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
