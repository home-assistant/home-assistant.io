---
title: "Plex"
description: "Instructions on how to integrate Plex into Home Assistant."
logo: plex.png
ha_category:
  - Media Player
  - Sensor
featured: true
ha_release: 0.7.4
ha_iot_class: Local Polling
redirect_from:
  - /components/media_player.plex/
  - /components/sensor.plex/
---


The `plex` platform allows you to connect to a [Plex Media Server](https://plex.tv). Once connected, [Plex Clients](https://www.plex.tv/apps-devices/) playing media from the connected Plex Media Server will show up as [Media Players](/components/media_player/) and report playback status via a [Sensor](/components/sensor/) in Home Assistant. The Media Players will allow you to control media playback and see the current playing item.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Sensor](#sensor)

If your Plex server has been claimed by a Plex account via the [claim interface](https://plex.tv/claim), Home Assistant will require an authentication token to connect. If you don't know your token, see [Finding your account token / X-Plex-Token](https://support.plex.tv/hc/en-us/articles/204059436).

The preferred way to setup the Plex platform is by enabling the [discovery component](/components/discovery/) which requires GDM enabled on your Plex server. This can be found on your Plex Web App under Settings > (server Name) > settings > Network and choose "Enable local network discovery (GDM)".

If your Plex server has local authentication enabled or multiple users defined, Home Assistant requires an authentication token to be entered in the frontend. You will be prompted with a notification to complete configuration if discovery is enabled.

If your server enforces SSL connections, write "`on`" or "`true`" in the _"Use SSL"_ field. If it does not have a valid SSL certificate available but you still want to use SSL, write "`off`" or "`false`" in the _"Verify SSL"_ field as well.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/plex-token.png' />
</p>

You can also enable the `plex` platform directly by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
plex:
    token: MYSECRETTOKEN
```

<div class='note warning'>
  
At least one of `host` or `token` must be provided.

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
  description: Options to customize behavior of `media_player` entities.
  required: false
  type: map
  keys:
    show_all_controls:
      description: Forces all controls to display. Ignores dynamic controls (ex. show volume controls for client A but not for client B) based on detected client capabilities. This option allows you to override this detection if you suspect it to be incorrect.
      required: false
      default: false
      type: boolean
    use_episode_art:
      description: Display TV episode art instead of TV show art.
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
     show_all_controls: false
```

## Media Player

The `plex` media_player platform will create Media Player entities for each connected client device. These entities will display media information, playback progress, and playback controls if supported by the device.

### Service `play_media`

Plays a song, playlist, TV episode, or video on a connected client.

#### Music

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `entity_id` | no | `entity_id` of the client | media_player.theater_plex |
| `media_content_id` | no | Quote escaped JSON with `library_name`, `artist_name`, `album_name`, `track_name`, `shuffle` (0 or 1). | { \\"library_name\\" : \\"My Music\\", \\"artist_name\\" : \\"Adele\\", \\"album_name\\" : \\"25\\", \\"track_name\\" : \\"hello\\", \\"shuffle\\": \\"0\\" } |
| `media_content_type` | no | Type of media to play, in this case `MUSIC` | MUSIC |

#### Playlist

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `entity_id` | no | `entity_id` of the client | media_player.theater_plex |
| `media_content_id` | no | Quote escaped JSON with `playlist_name`, `shuffle` (0 or 1). | { \\"playlist_name\\" : \\"The Best of Disco\\" \\"shuffle\\": \\"0\\" } |
| `media_content_type` | no | Type of media to play, in this case `PLAYLIST` | PLAYLIST |

#### TV Episode

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `entity_id` | no | `entity_id` of the client | media_player.theater_plex |
| `media_content_id` | no | Quote escaped JSON with `library_name`, `show_name`, `season_number`, `episode_number`, `shuffle` (0 or 1). | { \\"library_name\\" : \\"Adult TV\\", \\"show_name\\" : \\"Rick and Morty\\", \\"season_number\\" : 2, \\"episode_number\\" : 5, \\"shuffle\\": \\"0\\" } |
| `media_content_type` | no | Type of media to play, in this case `EPISODE` | EPISODE |

#### Video

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `entity_id` | no | `entity_id` of the client | media_player.theater_plex |
| `media_content_id` | no | Quote escaped JSON with `library_name`, `video_name`, `shuffle` (0 or 1). | { \\"library_name\\" : \\"Adult Movies\\", \\"video_name\\" : \\"Blade\\", \\"shuffle\\": \\"0\\" } |
| `media_content_type` | no | Type of media to play, in this case `VIDEO` | VIDEO |

### Compatibility

| Client                           | Limitations                                                                                                                                                     |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Any (when all controls disabled) | A stop button will appear but is not functional.                                                                                                                |
| Any (when casting)               | Controlling playback will work but with error logging.                                                                                                          |
| Any (remote client)              | Controls disabled.                                                                                                                                              |
| Apple TV (PlexConnect)           | Controls disabled.  Music does not work.                                                                                                                        |
| iOS                              | None                                                                                                                                                            |
| NVidia Shield                    | Mute disabled. Volume set below 2 will cause error logging. Controlling playback when the Shield is both a client and a server will work but with error logging |
| Plex Web                         | None                                                                                                                                                            |
| Tivo Plex App                    | Only play, pause, stop/off controls enabled                                                                                                                     |

### Notes

* At this moment, the Plex platform only supports one Plex Media Server.
* It is possible to get errors that look like the following.

  ```
  ERROR:plexapi:http://192.168.1.10:32400: ('Connection aborted.', BadStatusLine("''",))
  INFO:homeassistant.components.media_player.plex:No server found at: http://192.168.1.10:32400
  ```

  If this occurs, check the setting `Server`>`Network`>`Secure connections` on your Plex Media Server: if it is set to `Preferred` or `Required`, you may need to manually set the `ssl` and `verify` booleans to, respectively, `true` and `false`.
* Movies must be located under 'Movies' section in the Plex library to properly get 'playing' state.

## Sensor

The `plex` sensor platform will monitor activity on a given [Plex Media Server](https://plex.tv/). It will create a sensor that shows the number of currently watching users as the state. If you click the sensor for more details, it will show you who is watching what.
