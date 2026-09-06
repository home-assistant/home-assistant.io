---
title: "Download"
action: androidtv.download
domain: androidtv
description: "Downloads a file from an Android or Fire TV device to your Home Assistant instance."
related_actions:
  - androidtv.upload
  - androidtv.adb_command
---

Use this action to download a file from your Android or Fire TV device to your Home Assistant instance.

{% include actions/ui_header.md %}

To download a file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Android or Fire TV device you want to control.
6. From the actions shown for that target, select **Download**.
7. Enter the **Device path** and the **Local path**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device path:
  description: The file path on the Android or Fire TV device.
Local path:
  description: The file path on your Home Assistant instance.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `androidtv.download`. A basic example looks like this:

{% example %}
action: |
  action: androidtv.download
  target:
    entity_id: media_player.fire_tv_living_room
  data:
    device_path: "/storage/emulated/0/Download/example.txt"
    local_path: "/config/www/example.txt"
{% endexample %}

This downloads `example.txt` from the device to your Home Assistant instance.

### Options in YAML

{% options_yaml %}
device_path:
  description: The file path on the Android or Fire TV device.
  required: true
  type: string
local_path:
  description: The file path on your Home Assistant instance.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The local path must be in a directory that Home Assistant is [allowed to access](/integrations/homeassistant/#allowlist_external_dirs). Otherwise, the download is skipped and a warning is logged.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
