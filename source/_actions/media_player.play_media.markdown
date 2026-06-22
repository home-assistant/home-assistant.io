---
title: "Play media"
action: media_player.play_media
domain: media_player
description: "Plays specific media on a media player."
related_actions:
  - media_player.browse_media
  - media_player.search_media
  - media_player.select_source
---

Use this action to play specific media on a media player, such as a song, a playlist, or a video.

{% include actions/ui_header.md %}

To play media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Play media**.
7. Select the **Media** you want to play, and set the other options if you need them.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media:
  description: The media to play. Use the media picker to browse the content available on the media player.
Enqueue:
  description: How the new media interacts with the current queue, such as playing now or adding to the queue. Only available on media players that support a queue.
  required: false
Announce:
  description: Turn on to play the media as an announcement, temporarily interrupting current playback. Only available on media players that support announcements.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.living_room
  data:
    media_content_id: "https://example.com/stream/aac"
    media_content_type: music
{% endexample %}

This plays the given stream on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
media_content_id:
  description: A media identifier. The format depends on the media player. For example, you can provide a URL to Sonos and Cast, but only a playlist ID to iTunes.
  required: true
  type: string
media_content_type:
  description: "The type of media, such as music, tvshow, video, episode, channel, or playlist."
  required: true
  type: string
enqueue:
  description: "How the new media interacts with the current queue, one of add, next, play, or replace. If the media player does not support this, the new media plays and this option is ignored."
  required: false
  type: string
announce:
  description: Set to true to play the media as an announcement, temporarily interrupting current playback and resuming afterward. If the media player does not support this, the announcement plays but the interrupted media does not resume.
  required: false
  type: boolean
  default: false
extra:
  description: Extra data to send to the media player, such as a title or thumbnail. The supported values depend on the media player.
  required: false
  type: map
{% endoptions_yaml %}

#### Extra dictionary data

The `extra` option accepts the following values. Support depends on the media player, and most of these apply to Cast devices.

{% configuration %}
title:
  type: string
  description: Title of the media.
  required: false
thumb:
  type: string
  description: Thumbnail image URL.
  required: false
current_time:
  type: float
  description: Seconds since the beginning of the content. For live content with no position specified, the stream starts at the live position.
  required: false
autoplay:
  type: boolean
  description: Whether the media plays automatically.
  default: true
  required: false
stream_type:
  type: string
  description: "Describes the type of media artifact, one of NONE, BUFFERED, or LIVE."
  required: false
subtitles:
  type: string
  description: URL of the subtitle file to show on Cast.
  required: false
subtitles_lang:
  type: string
  description: Language for the subtitles.
  required: false
subtitles_mime:
  type: string
  description: Mimetype of the subtitles.
  required: false
subtitle_id:
  type: integer
  description: ID of the subtitle to load.
  required: false
enqueue:
  type: boolean
  description: If true, enqueue the media instead of playing it.
  default: false
  required: false
media_info:
  type: map
  description: Additional MediaInformation attributes not explicitly listed.
  required: false
metadata:
  type: map
  description: "Media metadata object, one of GenericMediaMetadata, MovieMediaMetadata, TvShowMediaMetadata, MusicTrackMediaMetadata, or PhotoMediaMetadata."
  required: false
{% endconfiguration %}

For more details on the Cast values, see the [Google Cast MediaData](https://developers.google.com/cast/docs/reference/messages#MediaData) and [MediaInformation](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.MediaInformation) documentation.

{% include actions/targets.md %}

## Good to know

- The format of `media_content_id` and the supported `extra` values depend on the media player.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Example: play a stream with a title and thumbnail

This example plays an audio stream on a Cast device and sets a title and thumbnail image:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.chromecast
  data:
    media_content_type: music
    media_content_id: "https://example.com/stream/aac"
    extra:
      thumb: "https://brands.home-assistant.io/_/homeassistant/logo.png"
      title: Home Assistant Radio
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
