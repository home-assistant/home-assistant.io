---
title: "Update file path"
action: local_file.update_file_path
domain: local_file
description: "Changes the image file that a local file camera displays."
---

Use this action to change which image file a local file camera shows. This is useful when another process saves a new image, for example a snapshot from another camera or a graph you render periodically, and you want the camera to start displaying that file.

## Prerequisites

- The new file path must be added to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs). Without this, Home Assistant cannot read the file and the action returns an error.

{% include actions/ui_header.md %}

To change the displayed file from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the local file camera entity you want to update.
6. From the actions shown for that target, select **Local file: Update file path**.
7. In the **File path** field, enter the full path to the new image file.
8. Select **Save**.

### Options in the UI

{% options_ui %}
File path:
  description: The full path to the new image file to display. The path must be allowed in `allowlist_external_dirs`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `local_file.update_file_path`. A basic example looks like this:

{% example %}
action: |
  action: local_file.update_file_path
  target:
    entity_id: camera.front_door
  data:
    file_path: /config/www/images/front_door.jpg
{% endexample %}

This makes the `camera.front_door` local file camera display the image at the given path.

### Options in YAML

{% options_yaml %}
file_path:
  description: >
    The full path to the new image file to display. The path must be allowed
    in `allowlist_external_dirs`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
