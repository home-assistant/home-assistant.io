---
title: Music Assistant
description: Instructions on how to integrate Music Assistant into Home Assistant.
ha_category:
  - Media player
ha_release: 2024.12
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@music-assistant'
  - '@arturpragacz'
ha_domain: music_assistant
ha_platforms:
  - button
  - media_player
  - number
  - select
  - switch
  - text
ha_zeroconf: true
ha_integration_type: service
ha_quality_scale: bronze
---

The **Music Assistant** (MA) {% term integration %} allows you to connect Home Assistant to a [Music Assistant Server](https://music-assistant.io/). Once configured, all [MA Players](https://music-assistant.io/player-support/) show up as Home Assistant [media player entities](/integrations/media_player/).  Media players will allow you to control media playback and see the currently playing item.

## Prerequisites

Before installing this integration, ensure you have a running Music Assistant server. Instructions for installing the Music Assistant server are available in the [Music Assistant documentation](https://www.music-assistant.io/installation/)

{% include integrations/config_flow.md %}

### Manual configuration

Under normal circumstances, Home Assistant automatically discovers your running Music Assistant server. If there is something special about the Home Assistant or Music Assistant setup (for example, the Music Assistant server is running as a remote Docker container) or discovery is not working, you can manually specify the URL to your Music Assistant server.

## Supported functionality

There is currently support for the following Home Assistant Platforms:

- [Media player](#media-player-entities)
- [Button](#favorite-current-song-button)

Depending on the player provider, additional platforms are supported: [Number, Select, Sensor, Switch, Text](#player-options).


All of the Home Assistant [Media Player Control Actions](/integrations/media_player/#media-control-actions) are supported.

If using `media_player.play_media`, then note the `media_content_id` payload can be any of the following:

- The name of a track, artist, or album. For example, `Queen`.
- A track or album combined with the artist's name. For example, `Queen - Innuendo`.
- A streaming provider URI. For example, `spotify://artist/12345`.
- A streaming provider URL. For example, `https://open.spotify.com/track/31cWPvM99ZHxMl3mdgiw4I`.

This action runs as the Home Assistant user that made the request, when their username matches a Music Assistant user. This affects the playlog entry and any provider filtering configured for that user. The standard action doesn't let you choose the user, so if you call it from a script or automation and want the request attributed to a specific user, use the Music Assistant [Play media](/actions/music_assistant.play_media/) action instead and set its **Username** field.

If using `media_player.browse_media`, then the `media_content_id` payload must be a URI of the form `library://artist/1`, `library://album/20`, or `spotify://album/5zj4Ej0FrlJQaSo0d6cttH`. The type of item that the URI refers to must be an album or artist.

These URIs can, for example, be obtained from the output of the [Get library items](/actions/music_assistant.get_library/) or [Search Music Assistant](/actions/music_assistant.search/) actions, or the `media_player.browse_media` action from Home Assistant.

Streaming provider URLs can be obtained from the web interface of the provider.

### Media player entities

The Music Assistant integration creates media player entities for all players and groups available in MA, including those imported from Home Assistant. This is needed to provide the full functionality Music Assistant has to offer. This full functionality includes transfer of the playing queue of music from one player to another, automatic pausing of playback during announcements, and richer options for selecting the media for playback. These entities will display media information, playback progress, and playback controls.

### Favorite current song button

The Music Assistant integration creates a button entity for each player to favorite the current song. Pressing this button (manually or by automation) adds the current song to your Music Assistant favorites. This works for songs stored locally as well as for tracks from streaming providers. It also works with remote content such as Spotify Connect, AirPlay, or a radio station, as long as the external source provides an artist and title combination (and optionally the album). 

### Player options

If a player provider supports player options, the Music Assistant integration exposes additional entities. For example, you may have a number entity to adjust the media player's bass or treble value. Refer to the [Player documentation](https://www.music-assistant.io/player-support/) to see whether your player supports this.

{% include integrations/actions.md %}

## Notes

- Any Home Assistant players added to Music Assistant will appear duplicated as the MA version of the player is created. The original HA player can be hidden if desired.

## Supported devices

This integration requires Music Assistant server version 2.4 or later. The integration can connect to Music Assistant servers hosted as an app or in a separate Docker container.

Music Assistant supports a [wide range of devices](https://www.music-assistant.io/player-support/) both natively and through the [Home Assistant provider](https://www.music-assistant.io/player-support/ha/). The Home Assistant provider, when installed, allows any Home Assistant media player to appear as a player in Music Assistant and thereby benefit from the advanced playback functionality that Music Assistant provides. As a general note, if there is a native Music Assistant provider then devices should be added via that method instead of using the Home Assistant media player. Any limitations associated with the providers are described on the related Player Provider page in the [Music Assistant documentation](https://www.music-assistant.io/).

## Known limitations

The data returned by the `get_queue` action will be partially limited if the item is not in the library (For example, if an item was selected for playback directly from Spotify). Metadata such as favorite status, explicit status, last played, played count, and disc art URL are only available for items that are in the MA library.

Radio mode is only available with certain music providers, and an error will be shown if attempting to enable radio mode on an item that isn't linked to one of those providers. Review the [Music Assistant documentation](https://www.music-assistant.io/music-providers/#summary) to identify which providers support this functionality.

## Troubleshooting

### Can’t find the MA actions

#### Symptom: No Music Assistant actions are shown in the editor

When trying to set up a script or automation via the GUI, no MA actions can be found.

##### Description

This means the app may have been installed, but the integration has not.

##### Resolution

Go to the [Configuration section](/integrations/music_assistant/#configuration) and install the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the {% my supervisor_addon title="**Settings** > **Apps**" addon="music_assistant" %} and remove the **Music Assistant** app from there as well (if installed).
