---
layout: page
title: "Media Player"
description: "Instructions on how to setup your media players with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
---

Interacts with media players on your network. Please check the right sidebar for a full list of supported devices.

 * [Services](#services)
 * [Properties](#properties)

## {% linkable_title Services %}

### {% linkable_title Media control services %}
Available services: [`turn_on`](#service-media_playerturn_on), [`turn_off`](#service-media_playerturn_off), [`toggle`](#service-media_playertoggle), [`volume_up`](#service-media_playervolume_up), [`volume_down`](#service-media_playervolume_down), [`volume_set`](#service-media_playervolume_set), [`volume_mute`](#service-media_playervolume_mute), [`media_play_pause`](#service-media_playermedia_play_pause), [`media_play`](#service-media_playermedia_play), [`media_pause`](#service-media_playermedia_pause), [`media_stop`](#service-media_playermedia_stop), [`media_next_track`](#service-media_playernext_track), [`media_previous_track`](#service-media_playerprevious_track), [`media_seek`](#service-media_playermedia_seek), [`clear_playlist`](#service-media_playerclear_playlist), [`shuffle_set`](#service-media_playershuffle_set), [`select_source`](#service-media_playerselect_source), [`select_sound_mode`](#service-media_playerselect_sound_mode), [`play_media`](#service-media_playerplay_media)

#### {% linkable_title Service `media_player.turn_on` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.turn_off` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.toggle` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.volume_up` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.volume_down` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.volume_set` %}

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |
| `volume_level`         |       no | Float for volume level. Range 0..1               |

#### {% linkable_title Service `media_player.volume_mute` %}

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |
| `is_volume_muted`      |       no | True/false for mute/unmute                       |

#### {% linkable_title Service `media_player.media_play_pause` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.media_play` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.media_pause` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.media_stop` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.next_track` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.previous_track` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.media_seek` %}

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. Defaults to all.       |
| `seek_position`        |       no | Position to seek to. The format is platform dependent. |

#### {% linkable_title Service `media_player.clear_playlist` %}

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. Defaults to all. |

#### {% linkable_title Service `media_player.shuffle_set` %}

Currently only supported on [Spotify](/components/media_player.spotify/), [MPD](/components/media_player.mpd/), [Kodi](/components/media_player.kodi/), [Squeezebox](/components/media_player.squeezebox/) and [Universal](/components/media_player.universal/).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Target a specific media player. For example `media_player.spotify`|
| `shuffle`              |       no | `true`/`false` for enabling/disabling shuffle        |

#### {% linkable_title Service `media_player.select_source` %}

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.     |
| `source`               |       no | Name of the source to switch to. Platform dependent. |

#### {% linkable_title Service `media_player.select_sound_mode` %}

Currently only supported on [Denon AVR](/components/media_player.denonavr/) and [Songpal](/components/media_player.songpal/).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Target a specific media player. For example `media_player.marantz`|
| `sound_mode`           |       no | Name of the sound mode to switch to. Platform dependent.|

#### {% linkable_title Service `media_player.play_media` %}

| Service data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.                                                                                                                       |
| `media_content_id`     |       no | A media identifier. The format of this is component dependent. For example, you can provide URLs to Sonos and Cast but only a playlist ID to iTunes.                   |
| `media_content_type`   |       no | A media type. Must be one of `music`, `tvshow`, `video`, `episode`, `channel` or `playlist`. For example, to play music you would set `media_content_type` to `music`. |

## {% linkable_title Properties %}

### {% linkable_title Media control properties %}
Available properties: [`state`](#properties-media_playerstate), [`access_token`](#properties-media_playeraccess_token), [`volume_level`](#properties-media_playervolume_level), [`is_volume_muted`](#properties-media_playeris_volume_muted), [`media_content_id`](#properties-media_playermedia_content_id), [`media_content_type`](#properties-media_playermedia_content_type), [`media_duration`](#properties-media_playermedia_duration), [`media_position`](#properties-media_playermedia_position), [`media_position_updated_at`](#properties-media_playermedia_position_updated_at), [`media_image_url`](#properties-media_playermedia_image_url), [`media_image_hash`](#properties-media_playermedia_image_hash), [`media_title`](#properties-media_playermedia_title), [`media_artist`](#properties-media_playermedia_artist), [`media_album_name`](#properties-media_playermedia_album_name), [`media_album_artist`](#properties-media_playermedia_album_artist), [`media_track`](#properties-media_playermedia_track), [`media_series_title`](#properties-media_playermedia_series_title), [`media_season`](#properties-media_playermedia_season), [`media_episode`](#properties-media_playermedia_episode), [`media_channel`](#properties-media_playermedia_channel), [`media_playlist`](#properties-media_playermedia_playlist), [`app_id`](#properties-media_playerapp_id), [`app_name`](#properties-media_playerapp_name), [`source`](#properties-media_playersource), [`source_list`](#properties-media_playersource_list), [`sound_mode`](#properties-media_playersound_mode), [`sound_mode_list`](#properties-media_playersound_mode_list), [`shuffle`](#properties-media_playershuffle), [`supported_features`](#properties-media_playersupported_features), [`support_play`](#properties-media_playersupport_play), [`support_pause`](#properties-media_playersupport_pause), [`support_stop`](#properties-media_playersupport_stop), [`support_seek`](#properties-media_playersupport_seek), [`support_volume_set`](#properties-media_playersupport_volume_set), [`support_volume_mute`](#properties-media_playersupport_volume_mute), [`support_previous_track`](#properties-media_playersupport_previous_track), [`support_next_track`](#properties-media_playersupport_next_track), [`support_play_media`](#properties-media_playersupport_play_media), [`support_select_source`](#properties-media_playersupport_select_source), [`support_select_sound_mode`](#properties-media_playersupport_select_sound_mode), [`support_clear_playlist`](#properties-media_playersupport_clear_playlist), [`support_shuffle_set`](#properties-media_playersupport_shuffle_set), [`entity_picture`](#properties-media_playerentity_picture), [`state_attributes`](#properties-media_playerstate_attributes)

#### {% linkable_title Properties `media_player.state` %}

State of the player.

#### {% linkable_title Properties `media_player.access_token` %}

Access token for this media player.

#### {% linkable_title Properties `media_player.volume_level` %}

Volume level of the media player (0 to 1).

#### {% linkable_title Properties `media_player.is_volume_muted` %}

Boolean if volume is currently muted.

#### {% linkable_title Properties `media_player.media_content_id` %}

Content ID of current playing media.

#### {% linkable_title Properties `media_player.media_content_type` %}

Content type of current playing media.

#### {% linkable_title Properties `media_player.media_duration` %}

Duration of current playing media in seconds.

#### {% linkable_title Properties `media_player.media_position` %}

Position of current playing media in seconds.

#### {% linkable_title Properties `media_player.media_position_updated_at` %}

When was the position of the current playing media valid. Returns value from homeassistant.util.dt.utcnow().

#### {% linkable_title Properties `media_player.media_image_url` %}

Image url of current playing media.

#### {% linkable_title Properties `media_player.media_image_hash` %}

Hash value for media image.

#### {% linkable_title Properties `media_player.media_title` %}

Title of current playing media.

#### {% linkable_title Properties `media_player.media_artist` %}

Artist of current playing media, music track only.

#### {% linkable_title Properties `media_player.media_album_name` %}

Album name of current playing media, music track only.

#### {% linkable_title Properties `media_player.media_album_artist` %}

Album artist of current playing media, music track only.

#### {% linkable_title Properties `media_player.media_track` %}

Track number of current playing media, music track only.

#### {% linkable_title Properties `media_player.media_series_title` %}

Title of series of current playing media, TV show only.

#### {% linkable_title Properties `media_player.media_season` %}

Season of current playing media, TV show only.

#### {% linkable_title Properties `media_player.media_episode` %}

Episode of current playing media, TV show only.

#### {% linkable_title Properties `media_player.media_channel` %}

Channel currently playing.

#### {% linkable_title Properties `media_player.media_playlist` %}

Title of Playlist currently playing.

#### {% linkable_title Properties `media_player.app_id` %}

ID of the current running app.

#### {% linkable_title Properties `media_player.app_name` %}

Name of the current running app.

#### {% linkable_title Properties `media_player.source` %}

Name of the current input source.

#### {% linkable_title Properties `media_player.source_list` %}

List of available input sources.

#### {% linkable_title Properties `media_player.sound_mode` %}

Name of the current sound mode.

#### {% linkable_title Properties `media_player.sound_mode_list` %}

List of available sound modes.

#### {% linkable_title Properties `media_player.shuffle` %}

Boolean if shuffle is enabled.

#### {% linkable_title Properties `media_player.supported_features` %}

Flag media player features that are supported.

#### {% linkable_title Properties `media_player.support_play` %}

Boolean if play is supported.

#### {% linkable_title Properties `media_player.support_pause` %}

Boolean if pause is supported.

#### {% linkable_title Properties `media_player.support_stop` %}

Boolean if stop is supported.

#### {% linkable_title Properties `media_player.support_seek` %}

Boolean if seek is supported.

#### {% linkable_title Properties `media_player.support_volume_set` %}

Boolean if setting volume is supported.

#### {% linkable_title Properties `media_player.support_volume_mute` %}

Boolean if muting volume is supported.

#### {% linkable_title Properties `media_player.support_previous_track` %}

Boolean if previous track command supported.

#### {% linkable_title Properties `media_player.support_next_track` %}

Boolean if next track command supported.

#### {% linkable_title Properties `media_player.support_play_media` %}

Boolean if play media command supported.

#### {% linkable_title Properties `media_player.support_select_source` %}

Boolean if select source command supported.

#### {% linkable_title Properties `media_player.support_select_sound_mode` %}

Boolean if select sound mode command supported.

#### {% linkable_title Properties `media_player.support_clear_playlist` %}

Boolean if clear playlist command supported.

#### {% linkable_title Properties `media_player.support_shuffle_set` %}

Boolean if shuffle is supported.

#### {% linkable_title Properties `media_player.entity_picture` %}

Return image of the media playing.

#### {% linkable_title Properties `media_player.state_attributes` %}

Return the state attributes.
