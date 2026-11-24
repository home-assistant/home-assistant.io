---
title: "Start device recording"
action: recamera_pro.start_device_recording
domain: recamera_pro
description: "Records an MP4 video clip directly to the reCamera Pro `/mnt` storage."
related_actions:
  - recamera_pro.stop_device_capture
  - recamera_pro.capture_device_snapshot
  - camera.record
---

Use this action to record an MP4 clip directly on the reCamera Pro hardware and save it to `/mnt` storage.

{% include actions/ui_header.md %}

To start a device recording from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. In the **Then do** section, select **Add action**.
4. Under **By target** (see [Targets](#targets)), select your reCamera Pro camera entity.
5. Select **Start device recording**.
6. Optionally set **Output path** and **Duration**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Output path:
  description: Absolute `/mnt/` directory or `.mp4` file path on the device. Leave empty to use the active storage directory.
  required: false
Duration:
  description: Recording length in seconds (`1`–`3600`, default `30`).
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recamera_pro.start_device_recording`. A basic example looks like this:

{% example %}
action: |
  action: recamera_pro.start_device_recording
  target:
    entity_id: camera.recamera_pro_sub_stream
  data:
    output: "/mnt/sdcard/clip.mp4"
    duration: 30
{% endexample %}

### Options in YAML

{% options_yaml %}
output:
  description: Absolute `/mnt/` directory or `.mp4` file path on the device. Leave empty to use the active storage directory.
  required: false
  type: string
duration:
  description: Recording length in seconds (`1`–`3600`, default `30`).
  required: false
  type: integer
  default: 30
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The target must be a `camera` entity provided by the **reCamera Pro** integration.
- Device capture actions are independent of the main/sub RTSP stream state and share a single hardware capture slot (concurrent capture requests return `device_capture_busy`).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
