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


The `plex` platform allows you to connect to a [Plex Media Server](https://plex.tv). Once connected, [Plex Clients](https://www.plex.tv/apps-devices/) playing media from the connected Plex Media Server will show up as [Media Players](/components/media_player/) or report playback status via a [Sensor](/components/sensor/) in Home Assistant. The Media Players will allow you to control media playback and see the current playing item.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Sensor](#sensor)

## Setup

Home Assistant offers Plex integration through **Configuration** -> **Integrations** -> **Plex**. Creating a Plex integration will automatically enable both the `media_player` and `sensor` platforms. For legacy support, existing `media_player` and `sensor` configurations are automatically imported and set up as new integrations.

If your Plex server has been claimed by a Plex account via the [claim interface](https://plex.tv/claim), Home Assistant will require an authentication token to connect. If you don't know your token, see [Finding your account token / X-Plex-Token](https://support.plex.tv/hc/en-us/articles/204059436).

When adding a Plex integration, providing this token is usually enough for automatic setup. If multiple servers have been claimed by the account associated with the token, you will be prompted to select one to monitor. If you would like to monitor multiple servers linked to the same account, simply set up an additional Plex integration.

If you'd prefer to manually configure the server connection, select the 'Manual setup' checkbox and fill out the appropriate fields on the next page. You will need to provide the following information:

{% configuration %}
Host:
  description: Hostname or IP address of the Plex Media Server.
  type: string
Port:
  description: Port where Plex server is listening.
  type: integer
  default: 32400
Use SSL:
  description: Enable to use HTTPS connections to the server.
  type: boolean
verify:
  description: Perform a verification of the certificate. Uncheck to allow invalid or self-signed certificates.
  type: boolean
Token:
  description: Provide if authentication is required. Also known as `X-Plex-Token`.
  type: string
  required: false
{% endconfiguration %}

The Plex platform will offer to set up a local server by enabling the [discovery component](/components/discovery/) which requires GDM enabled on your Plex server. This can be enabled via your Plex Web App under **Settings** -> **(Server Name)** -> **Settings** -> **Network** and choosing "Enable local network discovery (GDM)".


### Customization

You can customize each Plex integration by selecting it and opening the options panel represented by the gear icon in the top-right of the interface. Here you can enable/disable each of the `media_player` and `sensor` platforms per integration.

Additional options for the `media_player` platform:

{% configuration %}
Use episode art:
  description: Display TV episode art instead of TV show art.
  default: false
  type: boolean
Show all controls:
  description: Forces all controls to display. Ignores dynamic controls (ex. show volume controls for client A but not for client B) based on detected client capabilities. This option allows you to override this detection if you suspect it to be incorrect.
  default: false
  type: boolean
Remove unavailable clients:
  description: Remove stale Plex clients from UI after interval.
  default: true
  type: boolean
Client remove interval:
  description: How long a client is to be unavailable for before it is removed. Measured in seconds.
  default: 600
  type: integer
{% endconfiguration %}

## Sensor

The `plex` sensor platform will monitor activity on a given [Plex Media Server](https://plex.tv/). It will create a sensor that shows the number of currently watching users as the state. If you click the sensor for more details it will show you who is watching what.

## Media Player

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

* The Plex platform supports multiple Plex Media Servers via configuring multiple Plex integrations.
* It is possible to get errors that look like the following.

  ```
  ERROR:plexapi:http://192.168.1.10:32400: ('Connection aborted.', BadStatusLine("''",))
  INFO:homeassistant.components.media_player.plex:No server found at: http://192.168.1.10:32400
  ```

  If this occurs, check the setting `Server`>`Network`>`Secure connections` on your Plex Media Server: if it is set to `Preferred` or `Required`, you may need to manually set the `ssl` and `verify` booleans in the `plex.conf` file to, respectively, `true` and `false`. See the **"Setup"** section above for details.
* Movies must be located under 'Movies' section in the Plex library to properly get 'playing' state.
