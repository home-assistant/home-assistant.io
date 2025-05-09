---
title: Media player
description: Instructions on how to setup your media players with Home Assistant.
ha_category:
  - Media player
ha_release: 0.7
ha_quality_scale: internal
ha_domain: media_player
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Interacts with media players on your network.

{% include integrations/building_block_integration.md %}

## The state of a media player

A media player can have the following states:

- **Off**: The media player is turned off and is not accepting commands until turned on.
- **On**: The media player is turned on, but no details on its state are currently known.
- **Idle**: The media player is turned on and accepting commands, but currently not playing any media. Possibly at some idle home screen.
- **Playing**: The media player is currently playing media.
- **Paused**: The media player has an active media and is currently paused
- **Standby**: The media player is in a low power state, accepting commands.
- **Buffering**: The media player is preparing to start playback of media.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

### Media control actions
Available actions: `turn_on`, `turn_off`, `toggle`, `volume_up`, `volume_down`, `volume_set`, `volume_mute`, `media_play_pause`, `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track`, `clear_playlist`, `shuffle_set`, `repeat_set`, `play_media`, `select_source`, `select_sound_mode`, `join`, `unjoin`

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`. |

#### Action `media_player.volume_mute`

| Data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`. |
| `is_volume_muted`      |       no | True/false for mute/unmute                       |

#### Action `media_player.volume_set`

| Data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`. |
| `volume_level`         |       no | Float for volume level. Range 0..1               |

#### Action `media_player.media_seek`

| Data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`.       |
| `seek_position`        |       no | Position to seek to. The format is platform dependent. |

#### Action `media_player.play_media`

| Data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`.                                                                                                                       |
| `media_content_id`     |       no | A media identifier. The format of this is integration dependent. For example, you can provide URLs to Sonos and Cast but only a playlist ID to iTunes.                   |
| `media_content_type`   |       no | A media type. Must be one of `music`, `tvshow`, `video`, `episode`, `channel` or `playlist`. For example, to play music you would set `media_content_type` to `music`. |
| `enqueue`              |      yes | How the new media should interact with the queue. Must be one of `add`, `next`, `play`, `replace`. If the media player doesn't support this feature, the new media will play and the `enqueue` directive is ignored. |
| `announce`             |      yes | Set to `true` to request the media player to temporarily stop playing media to announce this media and then resume. If the media player doesn't support this feature, the announcement will play but the media player and will not resume playing the interrupted media once the announcement finishes.
| `extra`                |      yes | Extra dictionary data to send, e.g., title, thumbnail. Possible values can be found below.

##### Extra dictionary data

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
  description: Seconds since the beginning of the content. If the content is live content, and the position is not specified, the stream will start at the live position.
  required: false
autoplay:
  type: boolean
  description: Whether the media will automatically play.
  default: true
  required: false
stream_type:
  type: string
  description: "Describes the type of media artifact as one of the following: `NONE`, `BUFFERED`, `LIVE`."
  required: false
subtitles:
  type: string
  description: URL of subtitle file to be shown on chromecast.
  required: false
subtitles_lang:
  type: string
  description: Language for subtitles.
  required: false
subtitles_mime:
  type: string
  description: Mimetype of subtitles.
  required: false
subtitle_id:
  type: integer
  description: ID of subtitle to be loaded.
  required: false
enqueue:
  type: boolean
  description: If True, enqueue the media instead of play it.
  default: false
  required: false
media_info:
  type: map
  description: Additional MediaInformation attributes not explicitly listed.
  required: false
metadata:
  type: map
  description: "Media metadata object, one of the following: `GenericMediaMetadata`, `MovieMediaMetadata`, `TvShowMediaMetadata`, `MusicTrackMediaMetadata`, `PhotoMediaMetadata`."
  required: false
{% endconfiguration %}

Documentation:

- [Google Dev Documentation MediaData](https://developers.google.com/cast/docs/reference/messages#MediaData)
- [Google Dev Documentation MediaInformation](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.MediaInformation)


Example of calling media player action with title and image set:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: music
  media_content_id: "https://fake-home-assistant.io.stream/aac"
  extra:
    thumb: "https://brands.home-assistant.io/_/homeassistant/logo.png"
    title: HomeAssistantRadio
```

#### Action `media_player.select_source`

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`.     |
| `source`               |       no | Name of the source to switch to. Platform dependent. |

#### Action `media_player.select_sound_mode`

Currently only supported on [Denon AVR](/integrations/denonavr/) and  [Songpal](/integrations/songpal).

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. For example `media_player.marantz`|
| `sound_mode`           |       no | Name of the sound mode to switch to. Platform dependent.|

#### Action `media_player.shuffle_set`

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. For example `media_player.spotify`|
| `shuffle`              |       no | `true`/`false` for enabling/disabling shuffle        |

#### Action `media_player.repeat_set`

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. For example `media_player.kitchen`|
| `repeat`               |       no | `off`/`all`/`one` for setting repeat mode            |

#### Action `media_player.join`

Allows to group media players together for synchronous playback. Only works on supported multiroom audio systems.

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | The media player entity whose playback will be expanded to the players specified in `group_members`.  |
| `group_members`        |       no | The player entities which will be synced with the playback from `entity_id`.  |

#### Action `media_player.unjoin`

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Unjoin this media player from any player groups.     |

#### Action `media_player.browse_media`

Provides access to browsing the media tree provided by the integration. Similar in functionality to browsing media through the media player UI. Common use cases include automations that need to navigate media libraries and find media by specific categories.

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `media_content_type`   |      yes | The type of media to browse such as music, playlist, and video. Integration specific.  |
| `media_content_id`   |      yes | The content ID to browse. Integration specific. An empty content ID returns the top-level of the browse tree. |

The action returns a media tree object that can be stored in a response variable for use in subsequent automation steps. The response includes:

| Field | Description |
|-------|-------------|
| `title` | Display name of the current level |
| `media_class` | Type of the current item (for example, directory, music, video) |
| `media_content_type` | Content type identifier |
| `media_content_id` | Integration specific content ID |
| `children_media_class` | Types of items in the children array |
| `children` | Array of child items with similar properties |

Browse the root of the tree.

Note: The following example shows a response from a Sonos device. The structure and content types may vary between different media player integrations. Media content IDs are often URL-encoded.

```yaml
  # Get the top of the browse tree
  - action: media_player.browse_media
    target:
      entity_id: media_player.living_room
    response_variable: top_level
```

```yaml
# abbreviated Example response
media_player.living_room:
  title: Sonos
  media_class: directory
  media_content_type: root
  media_content_id: ""
  # children_media_class indicates that all items in the children array are directories  
  children_media_class: directory
  children:
    - title: Favorites
      media_class: directory
      media_content_type: favorites
      media_content_id: ""
    - title: Music Library
      media_class: directory
      media_content_type: library
      media_content_id: ""
```

Example of browsing a specific artist with the Sonos Integration:

Note: This example demonstrates browsing an artist's albums. The format of `media_content_id` (`A:ALBUMARTIST/artist_name`) is specific to Sonos. Notice how special characters in album names are URL-encoded in the response (for example, `%20` for spaces).

```yaml
  - action: media_player.browse_media
    target:
      entity_id: media_player.living_room
    data:
      media_content_id: A:ALBUMARTIST/Beatles
      media_content_type: album
    response_variable: albums
```

```yaml
# Abbreviated Example response
media_player.living_room:
  title: Beatles
  media_class: album
  media_content_type: album
  media_content_id: A:ALBUMARTIST/Beatles
  children_media_class: directory
  children:
    - title: A Hard Day's Night
      media_class: album
      media_content_type: album
      media_content_id: A:ALBUMARTIST/Beatles/A%20Hard%20Day's%20Night
    - title: Abbey Road
      media_class: album
      media_content_type: album
      media_content_id: A:ALBUMARTIST/Beatles/Abbey%20Road
```

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing device classes of the media player entity:

<p class='img'>
<img src='/images/screenshots/device_class_media_player_icons.png' alt='Screenshot showing different icons representing device classes of the media player entity' />
Example of different icons representing device classes of the media player entity.
</p>

The following device classes are supported for media players:

- `tv`: Device is a television type device.
- `speaker`: Device is a speaker or stereo type device.
- `receiver`: Device is an audio/video receiver type device taking audio and outputting to speakers and video to displays.
