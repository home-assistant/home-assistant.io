---
title: "PTZ move to preset"
action: foscam.ptz_preset
domain: foscam
description: "Moves a Foscam camera to a saved preset position."
related_actions:
  - foscam.ptz
---

Use this action to move a Foscam camera to a saved preset position from an automation or a script. This action is available for cameras that support pan, tilt, and zoom (PTZ) presets.

{% include actions/ui_header.md %}

To move a camera to a preset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Foscam camera you want to move.
6. From the actions shown for that target, select **Foscam: PTZ move to preset**.
7. Set the **Preset name** to move to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset name:
  description: The name of the preset to move to. Presets can be created in the official Foscam apps.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foscam.ptz_preset`. A basic example looks like this:

{% example %}
action: |
  action: foscam.ptz_preset
  target:
    entity_id: camera.bedroom
  data:
    preset_name: TopMost
{% endexample %}

This moves the camera to the `TopMost` preset.

### Options in YAML

{% options_yaml %}
preset_name:
  description: The name of the preset to move to. Presets can be created in the official Foscam apps.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- This action only works with Foscam cameras that support pan, tilt, and zoom (PTZ) presets.
- Create presets in the official Foscam apps before using this action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
