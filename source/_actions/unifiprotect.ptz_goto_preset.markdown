---
title: PTZ go to preset
action: unifiprotect.ptz_goto_preset
domain: unifiprotect
description: "Moves a UniFi Protect PTZ camera to a saved preset position."
---

With this action, you can move a <abbr title="pan, tilt, and zoom">PTZ</abbr> camera to a position you saved earlier as a preset. Use it to point a camera at a specific area when something happens, like aiming at the driveway when motion is detected.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: PTZ go to preset**.
6. In the **Camera** field, select the PTZ camera you want to move.
7. In the **Preset** field, enter the name of the preset position. Use `Home` for the home position.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Camera:
  description: The PTZ camera you want to move.
Preset:
  description: The name of the preset position to move to. Use `Home` for the home position.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.ptz_goto_preset`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.ptz_goto_preset
  data:
    device_id: 1234567890abcdef1234567890abcdef
    preset: "Home"
{% endexample %}

This moves the selected PTZ camera to its home position.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the PTZ camera you want to move.
  required: true
  type: string
preset:
  description: The name of the preset position to move to. Use `Home` for the home position.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action only works on cameras that support pan, tilt, and zoom. For other cameras, it reports an error.
- The preset name must match a preset saved on the camera. Use `Home` for the built-in home position.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: aim a camera at the driveway on motion

Move a PTZ camera to a driveway preset when a motion sensor detects activity.

- **Trigger**: State: Driveway motion sensor changes to _on_
- **Action**: UniFi Protect: PTZ go to preset

{% details "YAML example for moving a camera to a preset on motion" %}

{% example %}
automation: |
  alias: "Aim camera at driveway on motion"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "on"
  actions:
    - action: unifiprotect.ptz_goto_preset
      data:
        device_id: 1234567890abcdef1234567890abcdef
        preset: "Driveway"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
