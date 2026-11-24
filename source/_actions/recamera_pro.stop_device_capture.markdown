---
title: "Stop device recording"
action: recamera_pro.stop_device_capture
domain: recamera_pro
description: "Stops the active device recording started by Home Assistant and waits for the MP4 file to finalize."
related_actions:
  - recamera_pro.start_device_recording
  - recamera_pro.capture_device_snapshot
---

Use this action to stop an active MP4 recording started by Home Assistant on the reCamera Pro hardware and wait until the file is finalized on `/mnt` storage.

{% include actions/ui_header.md %}

To stop a device recording from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. In the **Then do** section, select **Add action**.
4. Under **By target** (see [Targets](#targets)), select your reCamera Pro camera entity.
5. Select **Stop device recording**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recamera_pro.stop_device_capture`. A basic example looks like this:

{% example %}
action: |
  action: recamera_pro.stop_device_capture
  target:
    entity_id: camera.recamera_pro_sub_stream
{% endexample %}

{% include actions/targets.md %}

## Good to know

- The target must be a `camera` entity provided by the **reCamera Pro** integration.
- This action only stops an active video recording started by this integration.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
