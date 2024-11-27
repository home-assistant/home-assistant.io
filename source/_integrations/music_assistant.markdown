---
title: Music Assistant
description: Instructions on how to integrate Music Assistant into Home Assistant.
ha_category:
  - Media player
ha_release: 2024.12
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@music_assistant'
ha_domain: music_assistant
ha_platforms:
  - media_player
ha_zeroconf: true
ha_integration_type: integration
---

The **Music Assistant**(MA) {% term integrations %} allows you to connect Home Assistant to a [Music Assistant Server](https://music-assistant.io/). Once configured, all [MA Players](https://music-assistant.io/player-support/) show up as Home Assistant [media player entities](/integrations/media_player/).  Media players will allow you to control media playback and see the currently playing item.

There is currently support for the following Home Assistant Platforms:

- [Media player](#media-player)

All of the Home Assistant [Media Player Control Actions](https://www.home-assistant.io/integrations/media_player/#media-control-actions) are supported.

{% include integrations/config_flow.md %}

### Manual configuration

Under normal circumstances, Home Assistant automatically discovers your running Music Assistant Server. If something special about the HA or MA setup (for example, the MA server is running as a remote Docker container) or discovery is not working, you can manually specify the URL to your Music Assistant server. 

## Media player

The Music Assistant media player creates media player entities for all players available in MA including those imported from Home Assistant. This is needed to provide the full functionality Music Assistant has to offer. These entities will display media information, playback progress, and playback controls.

### Action `media_player.play_media`

Play media hosted on a Music Assistant server on a Music Assistant player. The action configuration is as described in the [media player documentation](https://www.home-assistant.io/integrations/media_player/#action-media_playerplay_media)

The `media_content_id` payload can be any of the following:

- The name of a track, artist or album. (for example, "Queen")
- A track or album combined with the artist name (for example, "Queen - Innuendo")
- A streaming provider URI (for example, `spotify://artist/12345`)

#### Examples

Play Adele's album 25

```yaml
entity_id: media_player.music_assistant_player
media_content_type: MUSIC
media_content_id: 'Adele - 25'
```

Play all tracks from Stevie Wonder in random order

```yaml
entity_id: media_player.music_assistant_player
media_content_type: MUSIC
media_content_id: 'Stevie Wonder'
```

Play the playlist The Best of Disco

```yaml
entity_id: media_player.music_assistant_player
media_content_type: PLAYLIST
media_content_id: 'The Best of Disco'
```

## Additional actions

### Action `music_assistant.play_media`

Play media on a Music Assistant player with more fine-grained control options.

- **Data attribute**: `media_id`
  - **Optional**: No.
  - **Description**: URI or name of the item to be played. Specify a list if it is desired to play/enqueue multiple items.
  - **Example**: `spotify://playlist/aabbccddeeff`
- **Data attribute**: `media_type`
  - **Optional**: Yes.
  - **Description**: The type of content to play. Select from artist, album, track, playlist or radio. Will be auto-determined if omitted.
  - **Example**: `playlist`
- **Data attribute**: `artist`
  - **Optional**: Yes.
  - **Description**: When specifying a track or album in the Media ID field, you can optionally restrict results by this artist name.
  - **Example**: `Queen`
- **Data attribute**: `album`
  - **Optional**: Yes.
  - **Description**: When specifying a track in the Media ID field, you can optionally restrict results by this album name.
  - **Example**: `News of the world`
- **Data attribute**: `enqueue`
  - **Optional**: Yes.
  - **Description**: If the content should be played now or be added to the queue. Options are:
    - play: Play now
    - replace: Replace the existing queue and play now
    - next: Add to the current queue after the currently playing item
    - replace_next: Replace the current queue after the currently playing item
    - add: Add to the end of the queue
  - **Example**: `replace`
- **Data attribute**: `radio_mode`
  - **Optional**: Yes.
  - **Description**: Enable radio mode to auto-generate a playlist based on the selection.
  - **Example**: `true`

### Action `music_assistant.play_announcement`

Play announcement on a Music Assistant player with more fine-grained control options.

- **Data attribute**: `url`
  - **Optional**: No.
  - **Description**: URL to the notification sound.
  - **Example**: `https://someremotesite.com/doorbell.mp3`
- **Data attribute**: `use_pre_announce`
  - **Optional**: Yes.
  - **Description**: Use pre-announcement sound. Omit to use the player default.
  - **Example**: `true`
- **Data attribute**: `announce_volume`
  - **Optional**: Yes.
  - **Description**: Use a forced volume level for the announcement. Omit to use the player default.
  - **Example**: `75`

## Notes

- Any Home Assistant players added to Music Assistant will appear duplicated as the MA version of the player is created. The original HA player can be hidden if desired.
