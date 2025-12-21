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

The Jellyfin integration exposes a [Jellyfin](https://jellyfin.org/) server as a media source in Home Assistant.
Support is currently limited to music, movie and TV show libraries only. Other libraries will not appear in the media browser. This integration has been tested with Jellyfin server version 10.6.4 and later.

Additionally, this integration sets up every media session connected to the Jellyfin
server as a media player in Home Assistant to provide media controls for each session.

Browsing media inside Home Assistant in a player's context provides all libraries
of type Movie and Series.

This integration also creates a `Remote` entity for sending [remote commands](https://github.com/jellyfin/jellyfin/blob/master/MediaBrowser.Model/Session/GeneralCommandType.cs) to the client, if supported. For example, this can be used to tell the client to navigate right twice, down once, and select the focused item:

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

## Actions

### Action browse media

You can use the `media_player.browse_media` action to step through your Jellyfin library to find media you want to play.

| Data attribute        | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `entity_id`           | `entity_id` of the media player                                         |
| `media_content_id`    | **(optional)** Unique identifier of the content you want to browse into |

To start your browsing you don't set `media_content_id` to browse the root node.

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

### Action search media

You can use the `media_player.search_media` action to find media you want to play.

| Data attribute        | Description                                       |
| --------------------- | ------------------------------------------------- |
| `entity_id`           | `entity_id` of the media player                   |
| `search_query`        | The search term                                   |

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
### Action play media

To play media on any player you first need to find the `media_content_id` of the content you want to play, through either [browsing to the media](#action-browse-media) or [searching media](#action-search-media).

| Data attribute        | Description                                       |
| --------------------- | ------------------------------------------------- |
| `entity_id`           | `entity_id` of the media player                   |
| `media_content_id`    | Unique identifier of the content you want to play |
| `media_content_type`  | `movie` or `tvshow`                               |

#### Examples:

Play a movie on one of the Jellyfin clients that supports playback.

```yaml
action: media_player.play_media
target:
  entity_id:
    - media_player.jellyfin
data:
  media_content_id: a982a31451450daeda02c89952e6d7cf
  media_content_type: movie
```
