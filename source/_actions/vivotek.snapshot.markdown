---
title: "Take snapshot"
action: camera.snapshot
domain: vivotek
description: "Saves a snapshot from a VIVOTEK camera."
related_actions:
  - camera.snapshot
---

Use this action to save a snapshot from a VIVOTEK camera to a file.

{% include actions/ui_header.md %}

To take a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the VIVOTEK camera.
6. From the actions shown for that target, select **Take snapshot**.
7. Enter the **Filename**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Filename:
  description: The file path where the snapshot is saved.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: camera.snapshot
  target:
    entity_id: camera.front_door_camera
  data:
    filename: "/tmp/snapshot_{% raw %}{{ entity_id }}{% endraw %}.jpg"
{% endexample %}

### Options in YAML

{% options_yaml %}
filename:
  description: The file path where the snapshot is saved. The `entity_id` variable is available for templates.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- The path part of `filename` must be in `allowlist_external_dirs` in your [`homeassistant:`](/integrations/homeassistant/#allowlist_external_dirs) configuration.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
