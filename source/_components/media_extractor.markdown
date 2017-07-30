---
layout: page
title: "Media Extractor"
description: "Instructions how to integrate the Media Extractor into Home Assistant."
date: 2017-07-12 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Media Player
ha_release: 0.49
---


The `media_extractor` component gets an stream URL and send it to a media player entity. This component can extract entity specific streams if configured accordingly.

<p class='note'>
Media extractor doesn't transcode streams, it just tries to find stream that match requested query.
</p>

To use the media extractor service in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_extractor:
```

Configuration variables:

- **default_query** (*Optional*): Set default stream query for all devices ('best' by default).
- **customize** (*Optional*): Set entity specific values. For example:

```yaml
# Example configuration.yaml entry
media_extractor:
  default_query: worst
  customize:
    media_player.my_sonos:
      video: bestvideo
      music: bestaudio[ext=mp3]
```

This configuration sets query for all service calls like: ```{"entity_id": "media_player.my_sonos", "media_content_id": "https://soundcloud.com/bruttoband/brutto-11", "media_content_type": "music"}``` to 'bestaudio' with mp3 extention.

Query examples with explanations:
 * **bestvideo** - best video only stream
 * **best** - best video + audio stream
 * **bestaudio[ext=m4a]** - best audio stream with m4a extension
 * **worst** - worst video + audio stream
 * **bestaudio[ext=m4a]/bestaudio[ext=ogg]/bestaudio** - best m4a audio, otherwise best ogg audio and only then any best audio

More info about queries [here](https://github.com/rg3/youtube-dl#format-selection)

### {% linkable_title Use the service %}

Go to the "Developer Tools," then to "Call Service," and choose `media_extractor/play_media` from the list of available services. Fill the "Service Data" field as shown in the example below and hit "CALL SERVICE."

This will download the file from the given URL.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to seek media on, e.g., `media_player.living_room_chromecast`. Defaults to all.
| `media_content_id`     |       no | The ID of the content to play. Platform dependent.
| `media_content_type`   |       no | The type of the content to play. Must be one of MUSIC, TVSHOW, VIDEO, EPISODE, CHANNEL or PLAYLIST MUSIC.
