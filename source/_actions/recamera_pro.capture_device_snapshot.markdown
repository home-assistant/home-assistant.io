---
title: "Take device snapshot"
action: recamera_pro.capture_device_snapshot
domain: recamera_pro
description: "Captures a JPG snapshot directly to the reCamera Pro `/mnt` storage."
related_actions:
  - recamera_pro.start_device_recording
  - recamera_pro.stop_device_capture
  - camera.snapshot
---

Use this action to capture a still JPG image directly on the reCamera Pro hardware and save it to `/mnt` storage.

{% include actions/ui_header.md %}

To take a device snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. In the **Then do** section, select **Add action**.
4. Under **By target** (see [Targets](#targets)), select your reCamera Pro camera entity.
5. Select **Take device snapshot**.
6. Optionally set **Output path** to a `/mnt/` directory or `.jpg`/`.jpeg` file path on the device.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Output path:
  description: Absolute `/mnt/` directory or `.jpg`/`.jpeg` file path on the device. Leave empty to use the active storage directory.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recamera_pro.capture_device_snapshot`. A basic example looks like this:

{% example %}
action: |
  action: recamera_pro.capture_device_snapshot
  target:
    entity_id: camera.recamera_pro_sub_stream
  data:
    output: "/mnt/sdcard/snapshot.jpg"
{% endexample %}

### Options in YAML

{% options_yaml %}
output:
  description: Absolute `/mnt/` directory or `.jpg`/`.jpeg` file path on the device. Leave empty to use the active storage directory.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The target must be a `camera` entity provided by the **reCamera Pro** integration.
- Device capture actions are independent of the main/sub RTSP stream state and share a single hardware capture slot (concurrent capture requests return `device_capture_busy`).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
