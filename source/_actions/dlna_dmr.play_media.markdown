---
title: "Play specified media"
action: media_player.play_media
domain: dlna_dmr
description: "Plays media on a DLNA Digital Media Renderer device."
---

Use this action to play media on a DLNA Digital Media Renderer device, such as a TV or radio.

{% include actions/ui_header.md %}

To play media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the DLNA media player.
6. From the actions shown for that target, select **Play specified media**.
7. Select the media to play, or enter the media content ID and media content type.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media:
  description: The media to play. The supported media depends on the DLNA device.
Enqueue:
  description: How the new media interacts with the current queue, if supported by the device.
  required: false
Announce:
  description: Play the media as an announcement, if supported by the device.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.dlna_speaker
  data:
    media_content_id: "http://192.168.1.10:8080/song.mp3"
    media_content_type: music
{% endexample %}

This plays the given URL on `media_player.dlna_speaker`.

### Options in YAML

{% options_yaml %}
media_content_id:
  description: The media identifier. For many DLNA devices, this is an HTTP URL.
  required: true
  type: string
media_content_type:
  description: The type of media, such as `music` or `video`.
  required: true
  type: string
enqueue:
  description: How the new media interacts with the current queue, if supported by the device.
  required: false
  type: string
announce:
  description: Set to true to play the media as an announcement, if supported by the device.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Most DLNA DMR devices can play media from local HTTP servers. HTTP and an IP address often work better than HTTPS and a hostname.
- Supported media player actions depend on the device. A device may also support volume, playback, seek, shuffle, repeat, and sound mode actions.

{% include actions/stuck.md %}

{% include actions/related.md %}
