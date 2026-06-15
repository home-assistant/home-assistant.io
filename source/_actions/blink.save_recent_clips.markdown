---
title: "Save recent clips"
action: blink.save_recent_clips
domain: blink
description: "Saves all recent video clips of a Blink camera to a local directory."
related_actions:
  - blink.save_video
  - blink.record
  - blink.trigger_camera
---

The **Save recent clips** action saves all recent video clips of a Blink camera to a local directory.

This is handy when you want to keep your own copies of recent recordings. Blink keeps recent clips available for download for up to an hour, and a clip is removed from the list once it has been downloaded. Each clip is saved with the file pattern `%Y%m%d_%H%M%S_[camera name].mp4`.

{% include actions/ui_header.md %}

To save recent clips from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Blink camera whose clips you want to save.
6. From the actions shown for that target, select **Blink: Save recent clips**.
7. Enter the **Output directory** where the clips are saved.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Output directory:
  description: The path to the directory where the clips are saved.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `blink.save_recent_clips`. A basic example looks like this:

{% example %}
action: |
  action: blink.save_recent_clips
  target:
    entity_id: camera.blink_front_door
  data:
    file_path: "/config/www/blink"
{% endexample %}

This saves the recent clips of `camera.blink_front_door` to the `/config/www/blink` directory.

### Options in YAML

{% options_yaml %}
file_path:
  description: The path to the directory where the clips are saved.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- The directory in `file_path` must be one that Home Assistant is allowed to write to. By default, the `www` folder in your configuration directory and each configured [media directory](/integrations/homeassistant/#media_dirs) are allowed. To save somewhere else, such as `/tmp`, add that directory to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in the [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.
- The filename of each saved clip follows the pattern `%Y%m%d_%H%M%S_[camera name].mp4` and is not configurable.
- Keep a minimum of 5 seconds between sequential Blink actions. Calls made too quickly after each other can be throttled and ignored.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: save recent clips on a schedule

Save the recent clips of a camera every few minutes, so new recordings are downloaded before they expire.

- **Trigger**: every 3 minutes
- **Action**: Blink: Save recent clips
  - **Target**: Front door camera
  - **Output directory**: the directory where the clips are saved

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Save recent Blink clips"
    triggers:
      - trigger: time_pattern
        minutes: "/3"
    actions:
      - action: blink.save_recent_clips
        target:
          entity_id: camera.blink_front_door
        data:
          file_path: "/config/www/blink"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
