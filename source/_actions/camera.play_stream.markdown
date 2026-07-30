---
title: "Play camera stream"
action: camera.play_stream
domain: camera
description: "Plays a camera stream on a supported media player."
related_actions:
  - camera.snapshot
  - camera.record
  - camera.turn_on
  - camera.turn_off
  - camera.enable_motion_detection
  - camera.disable_motion_detection
---

Use this action to send a live camera stream to a media player, for example to show the front door camera on a TV when someone rings the doorbell.

## Prerequisites

- The target must be a camera entity.
- The [stream](/integrations/stream/) integration must be set up.

{% include actions/ui_header.md %}

To play a camera stream from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to stream.
6. From the actions shown for that target, select **Play camera stream**.
7. Set the **Media player** to stream to. Optionally, set a **Format**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media player:
  description: The media player to stream to.
  required: true
Format:
  description: The stream format to use. It must be supported by both the stream integration and the media player.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.play_stream`. A basic example looks like this:

{% example %}
action: |
  action: camera.play_stream
  target:
    entity_id: camera.living_room_camera
  data:
    media_player: media_player.living_room_tv
{% endexample %}

This streams `camera.living_room_camera` to `media_player.living_room_tv`.

### Options in YAML

{% options_yaml %}
media_player:
  description: The media player to stream to.
  required: true
  type: string
format:
  description: The stream format to use. It must be supported by both the stream integration and the media player.
  required: false
  type: string
  default: hls
{% endoptions_yaml %}

{% include actions/targets.md %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show the front door camera when the doorbell rings

Stream the front door camera to a TV when someone presses the doorbell.

- **Trigger**: Doorbell is pressed
- **Action**: Play camera stream
  - **Target**: Front door camera
  - **Media player**: Living room TV

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Show the front door camera when the doorbell rings"
    triggers:
      - trigger: state
        entity_id: binary_sensor.doorbell
        to: "on"
    actions:
      - action: camera.play_stream
        target:
          entity_id: camera.front_door
        data:
          media_player: media_player.living_room_tv
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
