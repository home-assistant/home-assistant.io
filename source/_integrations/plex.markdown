---
title: Plex Media Server
description: Instructions on how to integrate Plex into Home Assistant.
ha_category:
  - Media Player
  - Sensor
featured: true
ha_release: 0.7.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jjlawren'
ha_domain: plex
ha_platforms:
  - media_player
  - sensor
---

The Plex integration allows you to connect Home Assistant to a [Plex Media Server](https://plex.tv). Once configured, actively streaming [Plex Clients](https://www.plex.tv/apps-devices/) show up as [Media Players](/integrations/media_player/) and report playback status and library sizes via [Sensors](/integrations/sensor/) in Home Assistant. Media Players will allow you to control media playback and see the current playing item.

Support for playing music directly on linked [Sonos](/integrations/sonos/) speakers is available for users with an active [Plex Pass](https://www.plex.tv/plex-pass/) subscription. More information [here](#sonos-playback).

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Media Player](#media-player)

If a Plex server has been claimed by a Plex account via the [claim interface](https://plex.tv/claim), Home Assistant will require authentication to connect.

{% include integrations/config_flow.md %}

### Integration Options

Several options are provided to adjust the behavior of `media_player` entities. These can be changed at **Plex** -> **Options** on the Integrations page.

**Use episode art**: Display TV episode art instead of TV show art.

**Monitored users**: A list of accounts with access to the Plex server. Only selected users will create `media_player` entities.

**Ignore new managed/shared users**: Enable to ignore new Plex accounts granted access to the server.

**Ignore Plex Web clients**: Do not create `media_player` entities for Plex Web clients.

### Manual Configuration

Alternatively, you can manually configure a Plex server connection by selecting the "Configure Plex server manually" when configuring a Plex integration. This option is only available to users in "Advanced Mode". This will allow you to specify the server connection options which will be validated before setup is completed. The available options are described below:

**Host**: The IP address or hostname of your Plex server. Optional if 'Token' is provided.

**Port**: The port of your Plex Server.

**Use SSL**: Use HTTPS to connect to Plex server.

**Verify SSL certificate**: Verify the SSL certificate of your Plex server. May be used if connecting with an IP or if using a self-signed certificate.

**Token**: A valid authorization token for your Plex server. If provided without 'Host', a connection URL will be retreived from Plex.

## Sensor

The activity sensor provides a count of users currently watching media from the Plex server. Clicking the sensor shows details for the active users and media streams.

The library sensors show a count of items in each library. Depending on the library contents, the sensor will show extra detail in its attributes. For example, a library sensor for TV shows will represent the total number of episodes in the library and its attributes will also report the number of shows and seasons it contains.

<div class='note info'>
  
The library sensors are disabled by default, but can be enabled via the Plex integration page.
  
</div>


## Media Player

The Plex media player platform will create Media Player entities for each connected client device. These entities will display media information, playback progress, and playback controls (if supported by the streaming device).

By default, the Plex integration will create Media Player entities for all local, managed, and shared users on the Plex server. To customize which users or client types to monitor, adjust the "*Monitored users*", "*Ignore new managed/shared users*", and "*Ignore Plex Web clients*" options described under [Integration Options](#integration-options).

### Service `media_player.play_media`

Plays a song, album, artist, playlist, TV show/season/episode, movie, or video on a connected client.

Required fields within the `media_content_id` payloads are marked as such, others are optional.

<div class='note info'>
  
Refer to these links if casting to non-Plex players:

- [Chromecast](/integrations/cast/#plex)
- [Sonos](/integrations/plex#sonos-playback)
  
</div>

#### Music

| Service data attribute | Description                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | `entity_id` of the client                                                                                                                                                                            |
| `media_content_id`     | Quoted JSON containing:<br/><ul><li>`library_name` (Required)</li><li>`artist_name` (Required)</li><li>`album_name`</li><li>`track_name`</li><li>`track_number`</li><li>`shuffle` (0 or 1)</li></ul> |
| `media_content_type`   | `MUSIC`                                                                                                                                                                                              |

##### Examples:

```yaml
entity_id: media_player.plex_player
media_content_type: MUSIC
media_content_id: '{ "library_name": "Music", "artist_name": "Adele", "album_name": "25", "track_name": "Hello" }'
```
```yaml
entity_id: media_player.plex_player
media_content_type: MUSIC
media_content_id: '{ "library_name": "Music", "artist_name": "Stevie Wonder", "shuffle": "1" }'
```

#### Playlist

| Service data attribute | Description                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `entity_id`            | `entity_id` of the client                                                                           |
| `media_content_id`     | Quoted JSON containing:<br/><ul><li>`playlist_name` (Required)</li><li>`shuffle` (0 or 1)</li></ul> |
| `media_content_type`   | `PLAYLIST`                                                                                          |

##### Example:
```yaml
entity_id: media_player.plex_player
media_content_type: PLAYLIST
media_content_id: '{ "playlist_name": "The Best of Disco", "shuffle": "1" }'
```

#### TV Episode

| Service data attribute | Description                                                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | `entity_id` of the client                                                                                                                                                          |
| `media_content_id`     | Quoted JSON containing:<br/><ul><li>`library_name` (Required)</li><li>`show_name` (Required)</li><li>`season_number`</li><li>`episode_number`</li><li>`shuffle` (0 or 1)</li></ul> |
| `media_content_type`   | `EPISODE`                                                                                                                                                                          |

##### Examples:

```yaml
entity_id: media_player.plex_player
media_content_type: EPISODE
media_content_id: '{ "library_name": "Adult TV", "show_name": "Rick and Morty", "season_number": 2, "episode_number": 5 }'
```
```yaml
entity_id: media_player.plex_player
media_content_type: EPISODE
media_content_id: '{ "library_name": "Kid TV", "show_name": "Sesame Street", "shuffle": "1" }'
```

#### Movie

| Service data attribute | Description                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `entity_id`            | `entity_id` of the client                                                                               |
| `media_content_id`     | Quoted JSON containing:<br/><ul><li>`library_name` (Required)</li><li>`title` (Required)</li><li>`<SEARCH_KEY>` (optional)</li></ul> |
| `media_content_type`   | `movie`                                                                                                 |

For movies it's usually sufficient to provide the title. However, if the title you provide has multiple matches (such as with remakes), more search keys may be necessary. These optional keys can be included in the `media_content_id` JSON payload to restrict the search:

* `unwatched`: Restrict search to unwatched items only (`True`, `False`)
* `actor`: Restrict search for movies that include a specific actor
* `collection`: Restrict search within a named Plex collection ("Back to the Future", "Indiana Jones")
* `contentRating`: Restrict search to a specific content rating ("PG", "R")
* `country`: Restrict search to a specific country of origin
* `decade`: Restrict search to a specific decade ("1960", "2010")
* `director`: Restrict search to a specific director
* `genre`: Restrict search to a specific genre ("Animation", "Drama", "Sci-Fi")
* `resolution`: Restrict search to a specific video resolution (480, 720, 1080, "4k")
* `year`: Restrict search to a specific year

##### Examples:

```yaml
entity_id: media_player.plex_player
media_content_type: movie
media_content_id: '{ "library_name": "Adult Movies", "title": "Blade" }'
```

```yaml
entity_id: media_player.plex_player
media_content_type: movie
media_content_id: '{ "library_name": "Adult Movies", "title": "The Manchurian Candidate", year=1962 }'
# Would find the original instead of the 2004 remake
```

"Lazy" searches are also possible:
```yaml
entity_id: media_player.plex_player
media_content_type: movie
media_content_id: '{ "library_name": "Adult Movies", "title": "die hard", year=1995 }'
# Would find the sequel, "Die Hard: With a Vengeance"
```

### Compatibility

| Client                           | Limitations                                                                                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Any (when all controls disabled) | A stop button will appear but is not functional.                                                                                                                |
| Any (when casting)               | Controlling playback will work but with error logging.                                                                                                          |
| Any (remote client)              | Controls disabled.                                                                                                                                              |
| Apple TV                         | None                                                                                                                                                            |
| iOS                              | None                                                                                                                                                            |
| NVidia Shield                    | Controlling playback when the Shield is both a client and a server will work but with error logging                                                             |
| Plex Web                         | None                                                                                                                                                            |

## Sonos Playback

To play Plex music directly to Sonos speakers, the following requirements must be met:

1. Have an active [Plex Pass](https://www.plex.tv/plex-pass/) subscription.
2. Remote access enabled for your Plex server.
3. Sonos speakers linked to your Plex account [(Instructions)](https://support.plex.tv/articles/control-sonos-playback-with-a-plex-app/).
4. [Sonos](/integrations/sonos/) integration configured.

Call the `media_player.play_media` service with the `entity_id` of a Sonos integration device and `media_content_type` prepended with `plex://`. Both [music](#music) and [playlist](#playlist) `media_content_type` values are supported.

##### Examples:

```yaml
entity_id: media_player.sonos_speaker
media_content_type: music
media_content_id: 'plex://{ "library_name": "Music", "artist_name": "Adele", "album_name": "25", "track_name": "Hello" }'
```
```yaml
entity_id: media_player.sonos_speaker
media_content_type: playlist
media_content_id: 'plex://{ "playlist_name": "Party Mix" }'
```

## Additional Services

### Service `plex.refresh_library`

Refresh a Plex library to scan for new and updated media.

| Service data attribute | Required | Description | Example |
| --- | --- | --- | --- |
| `server_name` | No | Name of Plex server to use if multiple servers configured. | "My Plex Server" |
| `library_name` | Yes | Name of Plex library to update. | "TV Shows" |

### Service `plex.scan_for_clients`

Scan for new controllable Plex clients. This may be necessary in scripts or automations which control a Plex `media_player` entity, but where the underlying device must be turned on first.

Example script:

{% raw %}

```yaml
play_plex_on_tv:
  sequence:
    - service: media_player.select_source
      target:
        entity_id: media_player.smart_tv
      data:
        source: "Plex"
    - wait_template: "{{ is_state('media_player.smart_tv', 'On') }}"
      timeout: "00:00:10"
    - service: plex.scan_for_clients
    - wait_template: "{{ not is_state('media_player.plex_smart_tv', 'unavailable') }}"
      timeout: "00:00:10"
      continue_on_timeout: false
    - service: media_player.play_media
      target:
        entity_id: media_player.plex_smart_tv
      data:
        media_content_id: "{"library_name": "Movies", "title": "Zoolander"}"
        media_content_type: movie
```

{% endraw %}

## Notes

- The Plex integration supports multiple Plex servers. Additional connections can be configured under **Configuration** > **Integrations**.
- Movies must be located under the 'Movies' section in a Plex library to properly view the 'playing' state.
