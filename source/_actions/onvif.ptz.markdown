---
title: "PTZ"
action: onvif.ptz
domain: onvif
description: "Pans, tilts, or zooms an ONVIF camera."
---

Use this action to pan, tilt, or zoom an ONVIF camera that supports <abbr title="pan, tilt, and zoom">PTZ</abbr>. You can also move the camera to a saved preset position.

{% include actions/ui_header.md %}

To move a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ONVIF camera you want to move.
6. From the actions shown for that target, select **PTZ**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Pan:
  description: "The pan direction. One of: `LEFT` or `RIGHT`."
Tilt:
  description: "The tilt direction. One of: `UP` or `DOWN`."
Zoom:
  description: "The zoom direction. One of: `ZOOM_IN` or `ZOOM_OUT`."
Distance:
  description: The distance coefficient. Sets how much the camera moves in one request, from 0 to 1.
Speed:
  description: The speed coefficient. Sets how fast the camera moves, from 0 to 1.
Move Mode:
  description: "The move mode. One of: `ContinuousMove`, `RelativeMove`, `AbsoluteMove`, `GotoPreset`, or `Stop`."
Continuous duration:
  description: For `ContinuousMove`, the delay in seconds before the move stops.
Preset:
  description: The PTZ preset profile token to move to. Used with the `GotoPreset` move mode.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `onvif.ptz`. A basic example looks like this:

{% example %}
action: |
  action: onvif.ptz
  target:
    entity_id: camera.front_door
  data:
    pan: RIGHT
    tilt: UP
{% endexample %}

This pans the camera right and tilts it up.

### Options in YAML

{% options_yaml %}
pan:
  description: "The pan direction. One of: `LEFT` or `RIGHT`."
  required: false
  type: string
tilt:
  description: "The tilt direction. One of: `UP` or `DOWN`."
  required: false
  type: string
zoom:
  description: "The zoom direction. One of: `ZOOM_IN` or `ZOOM_OUT`."
  required: false
  type: string
distance:
  description: The distance coefficient. Sets how much the camera moves in one request, from 0 to 1.
  required: false
  type: float
  default: 0.1
speed:
  description: The speed coefficient. Sets how fast the camera moves, from 0 to 1.
  required: false
  type: float
move_mode:
  description: "The move mode. One of: `ContinuousMove`, `RelativeMove`, `AbsoluteMove`, `GotoPreset`, or `Stop`."
  required: false
  type: string
  default: RelativeMove
continuous_duration:
  description: For the `ContinuousMove` mode, the delay in seconds before the move stops.
  required: false
  type: float
  default: 0.5
preset:
  description: The PTZ preset profile token to move to. Used with the `GotoPreset` move mode.
  required: false
  type: string
  default: "0"
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- Your camera must support PTZ for this action to have any effect.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
