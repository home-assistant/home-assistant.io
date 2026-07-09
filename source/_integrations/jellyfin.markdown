---
title: Jellyfin
description: Instructions on how to integrate the Jellyfin integration into Home Assistant.
ha_category:
  - Media player
  - Media source
  - Remote
  - Sensor
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@RunC0deRun'
  - '@ctalkington'
ha_config_flow: true
ha_domain: jellyfin
ha_platforms:
  - diagnostics
  - media_player
  - remote
  - sensor
ha_integration_type: service
---

The **Jellyfin** {% term integration %} exposes a [Jellyfin](https://jellyfin.org/) server as a media source in Home Assistant. This integration has been tested with Jellyfin server version 10.6.4 and later.


{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of the Jellyfin server. Please supply the full URL including the protocol and optional webroot. For example `https://media.example.com`, `http://10.1.1.100:8096` or `http://home.example.com/jellyfin`.
Username:
  description: The Jellyfin user whose libraries you want to retrieve.
Password:
  description: The password of the supplied user.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Audio Codec:
  description: Sets the audio encoding codec to a Jellyfin API supported codec (aac, mp3, vorbis, wma)
{% endconfiguration_basic %}

## Entities

### Media player entities

This integration sets up every media session connected to the Jellyfin server as a media player in Home Assistant. These entities will display media information, playback progress, and playback controls. Browsing media inside Home Assistant in a player's context provides all supported library types.

### Remote entities

This integration also creates a `remote` {% term entity %} for sending [Jellyfin remote commands](https://github.com/jellyfin/jellyfin/blob/master/MediaBrowser.Model/Session/GeneralCommandType.cs) to each client, if supported. For example, the following script can be used to tell the client to navigate right twice, down once, and select the focused item:

```yaml
jellyfin_remote_script:
  alias: "Jellyfin Remote Script"
  sequence:
    - action: remote.send_command
      target:
        entity_id: remote.jellyfin_client
      data:
        delay_secs: 1.5
        command:
          - MoveRight
          - MoveRight
          - MoveDown
          - Select
```

## Actions

### Action browse_media

You can use the `media_player.browse_media` action to step through your Jellyfin library to find media you want to play. An `entity_id` must be passed so that Jellyfin knows what content the player is authorized to view and is capable of playing (e.g., so that speakers will not attempt to play video).

- Data attribute: `media_content_id`
  - Optional: Yes.
  - Description: Unique identifier of the content into which you want to browse. If unset, you will begin browsing at the root node.
  - Example: `a656b907eb3a73532e40e44b968d0225`

#### Examples:
```yaml
action: media_player.browse_media
target:
  entity_id: media_player.jellyfin
data:
  media_content_id: a656b907eb3a73532e40e44b968d0225
```

#### Response
```yaml
media_player.jellyfin:
  title: Series
  media_class: directory
  media_content_type: None
  media_content_id: a656b907eb3a73532e40e44b968d0225
  children_media_class: directory
  can_play: false
  can_expand: true
  can_search: false
  thumbnail: >-
    https://jellyfin
  not_shown: 0
  children:
    - title: "Tales of the Jedi"
      media_class: directory
      media_content_type: tvshow
      media_content_id: 34361f3855c9c0ac39b0f7503fe86be0
      children_media_class: null
      can_play: false
      can_expand: true
      can_search: false
      thumbnail: >-
        https://jellyfin
```

### Action search_media

You can use the `media_player.search_media` action to find media you want to play. As with browsing, an `entity_id` is required.

- Data attribute: `search_query`
  - Optional: No.
  - Description: The term for which to search.

#### Examples:

```yaml
action: media_player.search_media
target:
  entity_id:
    - media_player.jellyfin
data:
  search_query: star
```
#### Response
```yaml
media_player.jellyfin:
  version: 1
  result:
    - title: Star Wars
      media_class: directory
      media_content_type: Video
      media_content_id: 895dc4e1066da92847d48f9be28eb77c
      children_media_class: null
      can_play: false
      can_expand: false
      can_search: false
      thumbnail: >-
        https://jellyfin
      not_shown: 0
      children: []
    - title: Star Trek
      media_class: directory
      media_content_type: Video
      media_content_id: 5ae55567cae75c26671a0a6b027bdd5b
      children_media_class: null
      can_play: false
      can_expand: false
      can_search: false
      thumbnail: >-
        https://jellyfin
      not_shown: 0
      children: []
```
### Action play_media

To play media on any player you first need to find the `media_content_id` of the content you want to play, through either [browsing to the media](#action-browse_media) or [searching media](#action-search_media). An `entity_id` target is required.

- Data attribute: `media_content_id`
  - Optional: No.
  - Description: Unique identifier of the content you want to play.
  - Example: `a982a31451450daeda02c89952e6d7cf`
- Data attribute: `media_content_type`
  - Optional: No.
  - Description: The type of content you are playing, one of "episode", "season", "tvshow", "movie", or "music".
  - Example: `tvshow`
- Data attribute: `enqueue`
  - Optional: Yes.
  - Description: When set, queue up the media as described. Select one of "next" to play the content after the current media is finished, or "add" to append the media to the end of the current play queue. When unset, the current play queue will be replaced with the selected content.
  - Example: `next`

#### Examples:

Play a movie on one of the Jellyfin clients that supports playback.

```yaml
action: media_player.play_media
target:
  entity_id:
    - media_player.living_room
data:
  media_content_id: a982a31451450daeda02c89952e6d7cf
  media_content_type: movie
```

Add a TV episode to the play queue on a Jellyfin client that supports playback.

```yaml
action: media_player.play_media
target:
  entity_id:
    - media_player.living_room
data:
  media_content_id: 5ae55567cae75c26671a0a6b027bdd5b
  media_content_type: episode
  enqueue: next
```

{% include integrations/actions.md %}

## Notes

- The [player](#action-play_media) supports the enqueue options "next" and "add" only. The options "play" and "replace" will act as if the `enqueue` key was not set, and will replace the current play queue.
- The selection of `media_content_type` is generally inconsequential to Jellyfin, and any string can be supplied here to pass validation.

## Known limitations

- Support is currently limited to music, movie and TV show libraries only. Other libraries will not appear in the media browser.
