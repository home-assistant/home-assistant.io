---
title: "Save video"
action: blink.save_video
domain: blink
description: "Saves the last recorded video clip of a Blink camera to a local file."
related_actions:
  - blink.save_recent_clips
  - blink.record
  - blink.trigger_camera
---

The **Save video** action saves the last recorded video clip of a Blink camera to a local file.

This is handy when you want to keep a copy of a clip on your own system instead of relying on Blink's servers, for example to save the latest recording when motion is detected.

{% include actions/ui_header.md %}

To save a video from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Blink camera whose last clip you want to save.
6. From the actions shown for that target, select **Blink: Save video**.
7. Enter the **File name** where the clip is saved.
8. Select **Save**.

### Options in the UI

{% options_ui %}
File name:
  description: The full path to the file where the clip is saved.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `blink.save_video`. A basic example looks like this:

{% example %}
action: |
  action: blink.save_video
  target:
    entity_id: camera.blink_front_door
  data:
    filename: "/config/www/blink_front_door.mp4"
{% endexample %}

This saves the last recorded clip of `camera.blink_front_door` to `/config/www/blink_front_door.mp4`.

### Options in YAML

{% options_yaml %}
filename:
  description: The full path to the file where the clip is saved.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- The path in `filename` must be inside a directory that Home Assistant is allowed to write to. By default, the `www` folder in your configuration directory and each configured [media directory](/integrations/homeassistant/#media_dirs) are allowed, so a path like `/config/www/blink.mp4` or `/media/blink.mp4` works without extra setup. To save somewhere else, such as `/tmp`, add that directory to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in the [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.
- Keep a minimum of 5 seconds between sequential Blink actions. Calls made too quickly after each other can be throttled and ignored.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: save the latest clip when motion is detected

When motion is detected, save the last recorded clip locally with the date and time in the filename, so each recording is kept as a separate file.

- **Trigger**: Motion is detected
- **Action**: Blink: Save video
  - **Target**: Front door camera
  - **File name**: a path that includes the current date and time

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Save Blink video on motion"
    triggers:
      - trigger: state
        entity_id: binary_sensor.blink_front_door_motion_detected
        to: "on"
    actions:
      - action: blink.save_video
        target:
          entity_id: camera.blink_front_door
        data:
          filename: "/config/www/blink_{{ now().strftime('%Y%m%d_%H%M%S') }}.mp4"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
