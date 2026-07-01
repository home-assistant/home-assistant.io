---
title: "Play camera stream"
action: camera.play_stream
domain: vivotek
description: "Plays a VIVOTEK camera stream on a media player."
related_actions:
  - camera.play_stream
---

Use this action to play a live stream from a VIVOTEK camera on a media player.

{% include actions/ui_header.md %}

To play a camera stream from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the VIVOTEK camera.
6. From the actions shown for that target, select **Play camera stream**.
7. Select the **Media player** to play the stream on.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media player:
  description: The media player to play the stream on.
Format:
  description: The stream format. The default is `hls`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.play_stream`. A basic example looks like this:

{% example %}
action: |
  action: camera.play_stream
  target:
    entity_id: camera.front_door_camera
  data:
    media_player: media_player.living_room_tv
{% endexample %}

### Options in YAML

{% options_yaml %}
media_player:
  description: The media player to play the stream on.
  required: true
  type: string
format:
  description: The stream format supported by the `stream` integration and the selected media player.
  required: false
  type: string
  default: hls
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- This action requires the [`stream`](/integrations/stream/) integration.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
