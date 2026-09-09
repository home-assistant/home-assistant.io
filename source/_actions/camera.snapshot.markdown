---
title: "Take camera snapshot"
action: camera.snapshot
domain: camera
description: "Takes a snapshot from a camera."
related_actions:
  - camera.record
  - camera.play_stream
  - camera.turn_on
  - camera.turn_off
  - camera.enable_motion_detection
  - camera.disable_motion_detection
---

Use this action to take a still image from a camera and save it to a file, for example to capture who is at the front door when motion is detected.

{% include actions/ui_header.md %}

To take a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to capture.
6. From the actions shown for that target, select **Take camera snapshot**.
7. Set the **Filename** where the snapshot is saved.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Filename:
  description: The full path to the file where the snapshot is saved.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: camera.snapshot
  target:
    entity_id: camera.living_room_camera
  data:
    filename: "/config/www/snapshot.jpg"
{% endexample %}

This saves a snapshot from `camera.living_room_camera` to `/config/www/snapshot.jpg`.

### Options in YAML

{% options_yaml %}
filename:
  description: The full path to the file where the snapshot is saved.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The target must be a camera entity.
- The path in **Filename** must be inside a directory that Home Assistant is allowed to write to.
- By default, the `www` folder in your configuration directory and each configured [media directory](/integrations/homeassistant/#media_dirs) are allowed, so a path like `/config/www/snapshot.jpg` or `/media/snapshot.jpg` works without extra setup. To save somewhere else, such as `/tmp`, add that directory to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in the [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: save a snapshot with a timestamped filename

Take a snapshot when motion is detected and save it with the date and time in the filename, so each capture is kept as a separate file.

- **Trigger**: Motion is detected
- **Action**: Take camera snapshot
  - **Target**: Front door camera
  - **Filename**: a path that includes the current date and time

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Save a snapshot when motion is detected"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_motion
        to: "on"
    actions:
      - action: camera.snapshot
        target:
          entity_id: camera.front_door
        data:
          filename: "/config/www/front_door_{{ now().strftime('%Y%m%d-%H%M%S') }}.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
