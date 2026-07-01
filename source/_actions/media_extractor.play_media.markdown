---
title: "Play media"
action: media_extractor.play_media
domain: media_extractor
description: "Extracts a media URL and plays it on a media player."
---

Use this action to extract a playable stream URL from a supported media page and send it to a media player.

{% include actions/ui_header.md %}

To extract and play media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player.
6. From the actions shown for that target, select **Play media**.
7. Enter the media URL and content type.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media content ID:
  description: The URL of the media to extract and play.
Media content type:
  description: The content type. Must be one of `CHANNEL`, `EPISODE`, `PLAYLIST MUSIC`, `MUSIC`, `TVSHOW`, or `VIDEO`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_extractor.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_extractor.play_media
  target:
    entity_id: media_player.living_room
  data:
    media_content_id: "https://example.com/video"
    media_content_type: VIDEO
{% endexample %}

This extracts the media URL and plays it on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
media_content_id:
  description: The URL of the media to extract and play.
  required: true
  type: string
media_content_type:
  description: The content type. Must be one of `CHANNEL`, `EPISODE`, `PLAYLIST MUSIC`, `MUSIC`, `TVSHOW`, or `VIDEO`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Media extractor does not transcode streams. It selects a stream that matches the requested query.
- Some media services work better if you provide a cookie file, as described on the Media extractor integration page.

{% include actions/stuck.md %}

{% include actions/related.md %}
