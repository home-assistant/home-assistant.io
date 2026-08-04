---
title: "Record camera feed"
action: camera.record
domain: camera
description: "Creates a recording of a live camera feed."
related_actions:
  - camera.snapshot
  - camera.play_stream
  - camera.turn_on
  - camera.turn_off
  - camera.enable_motion_detection
  - camera.disable_motion_detection
---

Use this action to record a live camera feed to an `.mp4` file, for example to keep a short clip when motion is detected. This action needs the [stream](/integrations/stream/) integration to be set up.

{% include actions/ui_header.md %}

To record a camera feed from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to record.
6. From the actions shown for that target, select **Record camera feed**.
7. Set the **Filename** where the recording is saved. Optionally, set a **Duration** and a **Lookback** period.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Filename:
  description: The full path to the file where the recording is saved. It must be an `.mp4` file.
  required: true
Duration:
  description: The planned length of the recording, in seconds. The actual length can vary.
  required: false
Lookback:
  description: The planned period before the recording starts to include, in seconds. This is added on top of the duration and is only available if there is currently an active HLS stream. The actual length can vary.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.record`. A basic example looks like this:

{% example %}
action: |
  action: camera.record
  target:
    entity_id: camera.living_room_camera
  data:
    filename: "/config/www/recording.mp4"
{% endexample %}

This records `camera.living_room_camera` to `/config/www/recording.mp4`.

### Options in YAML

{% options_yaml %}
filename:
  description: The full path to the file where the recording is saved. It must be an `.mp4` file.
  required: true
  type: string
duration:
  description: The planned length of the recording, in seconds. The actual length can vary.
  required: false
  type: integer
  default: 30
lookback:
  description: The planned period before the recording starts to include, in seconds. This is added on top of the duration and is only available if there is currently an active HLS stream. The actual length can vary.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with camera entities, and needs the [stream](/integrations/stream/) integration to be set up.
- The `duration` and `lookback` values are suggestions. The actual length can vary, but it stays consistent per camera, so adjust them to fit your needs.
- The path in `filename` must be inside a directory that Home Assistant is allowed to write to. By default, the `www` folder in your configuration directory and each configured [media directory](/integrations/homeassistant/#media_dirs) are allowed, so a path like `/config/www/recording.mp4` or `/media/recording.mp4` works without extra setup. To save somewhere else, such as `/tmp`, add that directory to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in the [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: record a clip with a timestamped filename

Record a short clip when motion is detected and save it with the date and time in the filename, so each recording is kept as a separate file.

- **Trigger**: Motion is detected
- **Action**: Record camera feed
  - **Target**: Front door camera
  - **Filename**: a path that includes the current date and time
  - **Lookback**: 5

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Record a clip when motion is detected"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_motion
        to: "on"
    actions:
      - action: camera.record
        target:
          entity_id: camera.front_door
        data:
          filename: "/config/www/front_door_{{ now().strftime('%Y%m%d-%H%M%S') }}.mp4"
          lookback: 5
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
