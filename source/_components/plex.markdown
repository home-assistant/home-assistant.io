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


The `plex` platform allows you to connect to a [Plex Media Server](https://plex.tv). Once connected, [Plex Clients](https://www.plex.tv/apps-devices/) playing media from the connected Plex Media Server will show up as [Media Players](/components/media_player/) in Home Assistant. It will allow you to control media playback and see the current playing item.

There is currently support for the following device types within Home Assistant:

- [Media Player](#setup---media-player)
- [Sensor](#sensor)

## Setup - Media Player

The preferred way to setup the Plex platform is by enabling the [discovery component](/components/discovery/) which requires GDM enabled on your Plex server. This can be found on your Plex Web App under Settings > (server Name) > settings > Network and choose "Enable local network discovery (GDM)".

If your Plex server has local authentication enabled or multiple users defined, Home Assistant requires an authentication token to be entered in the frontend. Press "CONFIGURE" to do it.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/plex-configure.png' />
</p>

To authorize your device, you'll first need to [click here to claim a token](https://plex.tv/claim).

If your server enforces SSL connections, write "`on`" or "`true`" in the _"Use SSL"_ field. If it does not have a valid SSL certificate available but you still want to use it, write "`on`" or "`true`" in the _"Do not verify SSL"_ field as well.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/plex-token.png' />
</p>

You can also enable the plex platform directly by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: plex
```

In the event that [discovery](/components/discovery/) does not work (GDM disabled or non-local Plex server), you can manually create a `plex.conf` file manually and place it in your [configuration directory ](/docs/configuration/) or `/config/` if you are running Hass.io. The following is an example of `plex.conf`:

```json
{"IP_ADDRESS:PORT": {"token": "TOKEN", "ssl": false, "verify": true}}
```

{% configuration %}
IP_ADDRESS:
  description: IP address of the Plex Media Server.
  required: true
  type: string
PORT:
  description: Port where Plex is listening.
  required: true
  default: 32400
  type: integer
TOKEN:
  description: Only if authentication is required. Set to `null` (without quotes) otherwise.
  required: false
  type: string
ssl:
  description: Whether to use SSL/TLS or not.
  required: false
  default: "`false`"
  type: boolean
verify:
  description: Perform a verification of the certificate. To allow invalid or self-signed SSL certificates set it to `false`.
  required: false
  default: "`true`"
  type: boolean
{% endconfiguration %}

### Customization

You can customize the Plex integration by adding any of the variables below to your configuration:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: plex
    show_all_controls: false
    use_episode_art: true
    remove_unavailable_clients: true
    client_remove_interval: 600
```

{% configuration %}
show_all_controls:
  description: "Forces all controls to display. Ignores dynamic controls (ex. show volume controls for client A but not for client B) based on detected client capabilities. This option allows you to override this detection if you suspect it to be incorrect."
  required: false
  default: false
  type: boolean
use_episode_art:
  description: Display TV episode art instead of TV show art.
  required: false
  default: false
  type: boolean
remove_unavailable_clients:
  description: Remove stale plex clients from UI after interval.
  required: false
  default: true
  type: boolean
client_remove_interval:
  description: How long a client is to be unavailable for before it is cleaned up in seconds.
  required: false
  default: 600
  type: integer
{% endconfiguration %}

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

  If this occurs, check the setting `Server`>`Network`>`Secure connections` on your Plex Media Server: if it is set to `Preferred` or `Required`, you may need to manually set the `ssl` and `verify` booleans in the `plex.conf` file to, respectively, `true` and `false`. See the **"Setup"** section above for details.
* Movies must be located under 'Movies' section in the Plex library to properly get 'playing' state.

## Sensor

The `plex` sensor platform will monitor activity on a given [Plex Media Server](https://plex.tv/). It will create a sensor that shows the number of currently watching users as the state. If you click the sensor for more details it will show you who is watching what.

If your Plex server is on the same local network as Home Assistant, all you need to provide in the `configuration.yaml` is the host or IP address. If you want to access a remote Plex server, you must provide the Plex username, password, and optionally the server name of the remote Plex server. If no server name is given it will use the first server listed. If you use the username and password, all servers in that account are monitored.

If you don't know your token, see [Finding your account token / X-Plex-Token](https://support.plex.tv/hc/en-us/articles/204059436).

If you want to enable the plex sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: plex
```

{% configuration %}
host:
  description: The IP address of your Plex server.
  required: false
  default: localhost
  type: string
port:
  description: The port of your Plex Server.
  required: false
  default: 32400
  type: integer
name:
  description: Name of the Plex server.
  required: false
  default: Plex
  type: string
username:
  description: The username for the remote Plex server.
  required: false
  type: string
password:
  description: The password for your given account on the remote Plex server.
  required: false
  type: string
server:
  description: The name of your remote Plex server.
  required: false
  type: string
token:
  description: X-Plex-Token of your remote Plex server.
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
{% endconfiguration %}
