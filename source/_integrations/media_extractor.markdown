---
title: Media Extractor
description: Instructions on how to integrate the Media Extractor into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.49
ha_quality_scale: internal
ha_domain: media_extractor
---

The `media_extractor` integration gets a stream URL and sends it to a media player entity. This integration can extract entity specific streams if configured accordingly.

<div class='note'>
Media extractor doesn't transcode streams, it just tries to find stream that match requested query.
</div>

To use the media extractor service in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_extractor:
```

{% configuration %}
default_query:
  description: Set default stream query for all devices.
  required: false
  default: best
  type: string
customize:
  description: Set entity specific values.
  required: false
  type: list
{% endconfiguration %}

```yaml
# Example configuration.yaml entry
media_extractor:
  default_query: worst
  customize:
    media_player.my_sonos:
      video: bestvideo
      music: bestaudio[ext=mp3]
```

This configuration sets query for all service calls like to 'bestaudio' with the mp3 extension:

```json
{
  "entity_id": "media_player.my_sonos",
  "media_content_id": "https://soundcloud.com/bruttoband/brutto-11",
  "media_content_type": "music"
}
```

Query examples with explanations:

 * **bestvideo**: Best video only stream
 * **best**: Best video + audio stream
 * **bestaudio[ext=m4a]**: Best audio stream with m4a extension
 * **worst**: Worst video + audio stream
 * **bestaudio[ext=m4a]/bestaudio[ext=ogg]/bestaudio**: Best m4a audio, otherwise best ogg audio and only then any best audio

More info about queries [here](https://github.com/rg3/youtube-dl#format-selection)

### Use the service

Use <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose `media_extractor` from the dropdown menu **Domain** and `play_media` from **Service**, enter something like the JSON sample from above into the **Service Data** field, and hit **CALL SERVICE**.

This will download the file from the given URL.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to seek media on, e.g., `media_player.living_room_chromecast`. Defaults to all.
| `media_content_id`     |       no | The ID of the content to play. Platform dependent.
| `media_content_type`   |       no | The type of the content to play. Must be one of MUSIC, TVSHOW, VIDEO, EPISODE, CHANNEL or PLAYLIST MUSIC.
