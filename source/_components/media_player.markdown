---
layout: page
title: "Media Player"
description: "Instructions how to setup your media players with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
---

Interacts with media players on your network. Please check the sidebar for a full list of supported devices.

## {% linkable_title Services %}

### {% linkable_title Media control services %}
Available services: `turn_on`, `turn_off`, `toggle`, `volume_up`, `volume_down`, `volume_set`, `media_play_pause`, `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track`, `clear_playlist`, `shuffle_set`

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player/volume_mute` %}

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |
| `is_volume_muted`      |       no | True/false for mute/unmute                       |

#### {% linkable_title Service `media_player/volume_set` %}

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |
| `volume_level`         |       no | Float for volume level                           |

#### {% linkable_title Service `media_player/media_seek` %}

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. Defaults to all.       |
| `seek_position`        |       no | Position to seek to. The format is platform dependent. |

#### {% linkable_title Service `media_player/play_media` %}

| Service data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.                                                                                                                       |
| `media_content_id`     |       no | A media identifier. The format of this is component dependent. For example, you can provide URLs to Sonos and Cast but only a playlist ID to iTunes.                   |
| `media_content_type`   |       no | A media type. Must be one of `music`, `tvshow`, `video`, `episode`, `channel` or `playlist`. For example, to play music you would set `media_content_type` to `music`. |

#### {% linkable_title Service `media_player/select_source` %}

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.     |
| `source`               |       no | Name of the source to switch to. Platform dependent. |

#### {% linkable_title Service `media_player/shuffle_set` %}

Currently only supported on [Spotify](/components/media_player.spotify/), [MPD](/components/media_player.mpd/), [Kodi](/components/media_player.kodi/), [Squeezebox](/components/media_player.squeezebox/) and [Universal](/components/media_player.universal/).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Target a specific media player. For example `media_player.spotify`|
| `shuffle`              |       no | `true`/`false` for enabling/disabling shuffle        |


