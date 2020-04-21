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
---

The `plex` integration allows you to connect to a [Plex Media Server](https://plex.tv). Once connected, [Plex Clients](https://www.plex.tv/apps-devices/) playing media from the connected Plex Media Server will show up as [Media Players](/integrations/media_player/) and report playback status via a [Sensor](/integrations/sensor/) in Home Assistant. The Media Players will allow you to control media playback and see the current playing item.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Sensor](#sensor)

If your Plex server has been claimed by a Plex account via the [claim interface](https://plex.tv/claim), Home Assistant will require authentication to connect.

The preferred way to enable the Plex integration is via **Configuration** -> **Integrations**. You will be redirected to the [Plex](https://plex.tv) website to sign in with your Plex account. Once access is granted, Home Assistant will connect to the server linked to the associated account. If multiple Plex servers are available on the account, you will be prompted to complete the configuration by selecting the desired server on the Integrations page. Home Assistant will show as an authorized device on the [Plex Web](https://app.plex.tv/web/app) interface under **Settings** -> **Authorized Devices**.

<div class='note info'>

Local and secure connections are preferred when setting up an Integration. After the initial configuration, all connections to your Plex servers are made directly without connecting to Plex's services.

</div>

Alternatively, you can manually configure a Plex server connection by selecting the "Manual setup" option when configuring a Plex integration. This will allow you to specify the server connection options which will be validated before setup is completed. The available options are described in the **Configuration Variables** section below.

The `plex` integration can also be configured via `configuration.yaml`:

```yaml
# Example configuration.yaml entry
plex:
  token: MYSECRETTOKEN
```

<div class='note warning'>

Only one Plex server can be configured when using `configuration.yaml`. To add more servers, set up via **Configuration** -> **Integrations**.

</div>

{% configuration %}
host:
  description: The IP address or hostname of your Plex server.
  required: false
  type: string
port:
  description: The port of your Plex Server.
  required: false
  default: 32400
  type: integer
token:
  description: A valid X-Plex-Token for your Plex server. If provided without `host` and `port`, a connection URL will be retreived from Plex.
  required: false
  type: string
server:
  description: Name of Plex server to use if multiple servers are associated with the token's Plex account. Only used if `token` is provided without `host` and `port`.
  required: false
  type: string
ssl:
  description: Use HTTPS to connect to Plex server, **NOTE:** host **must not** be an IP when this option is enabled.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify the SSL certificate of your Plex server. You may need to disable this check if your local server enforces secure connections with the default certificate.
  required: false
  default: true
  type: boolean
media_player:
  description: Options to set the default behavior of `media_player` entities for new Integrations. **NOTE:** These options are exposed as Configuration Options (**Integrations** -> **Configured** --> **Plex** --> **Gear Icon**). Configuration Options will take precedence.
  required: false
  type: map
  keys:
    use_episode_art:
      description: Display TV episode art instead of TV show art.
      required: false
      default: false
      type: boolean
    ignore_new_shared_users:
      description: Do not track Plex clients for newly added Plex users.
      required: false
      default: false
      type: boolean
{% endconfiguration %}

```yaml
# Complete configuration.yaml entry
plex:
  host: 192.168.1.100
  port: 32400
  token: MY_SECRET_TOKEN
  ssl: true
  verify_ssl: true
  media_player:
    use_episode_art: true
    ignore_new_shared_users: false
```

## Media Player

The `plex` media_player platform will create Media Player entities for each connected client device. These entities will display media information, playback progress, and playback controls if supported by the device.

By default the Plex integration will create Media Player entities for all local, managed, and shared users on the Plex server. To choose specific users to monitor or ignore, select them via the Configuration Options (**Integrations** -> **Configured** --> **Plex** --> **Gear Icon**).

### Service `play_media`

Plays a song, album, artist, playlist, TV show/season/episode, movie, or video on a connected client.

Required fields within the `media_content_id` payloads are marked as such, others are optional.

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

#### Video

| Service data attribute | Description                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `entity_id`            | `entity_id` of the client                                                                               |
| `media_content_id`     | Quoted JSON containing:<br/><ul><li>`library_name` (Required)</li><li>`video_name` (Required)</li></ul> |
| `media_content_type`   | `VIDEO`                                                                                                 |

##### Example:
```yaml
entity_id: media_player.plex_player
media_content_type: VIDEO
media_content_id: '{ "library_name": "Adult Movies", "video_name": "Blade" }'
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

### Notes

* The `plex` integration supports multiple Plex servers. Additional connections can be configured under Configuration > Integrations.
* When setting up a server via `configuration.yaml`, it is possible to get errors that look like the following.

  ```txt
  ERROR:plexapi:http://192.168.1.10:32400: ('Connection aborted.', BadStatusLine("''",))
  INFO:homeassistant.components.media_player.plex:No server found at: http://192.168.1.10:32400
  ```

  If this occurs, check the setting `Server`>`Network`>`Secure connections` on your Plex Media Server: if it is set to `Preferred` or `Required`, you may need to manually set the `ssl` and `verify_ssl` configuration options to, respectively, `true` and `false`.
* Movies must be located under 'Movies' section in the Plex library to properly get 'playing' state.

## Sensor

The `plex` sensor platform will monitor activity on a given [Plex Media Server](https://plex.tv/). It will create a sensor that shows the number of currently watching users as the state. If you click the sensor for more details, it will show you who is watching what.
