---
layout: page
title: "Plex"
description: "Instructions on how to integrate Plex into Home Assistant."
date: 2015-10-05 21:21
sidebar: true
comments: false
sharing: true
footer: true
logo: plex.png
ha_category: Media Player
featured: true
ha_release: 0.7.4
ha_iot_class: "Local Polling"
---


The `plex` platform allows you to connect a [Plex Media Server](https://plex.tv) to Home Assistant. It will allow you to control media playback and see the current playing item.

## {% linkable_title Setup %}

The preferred way to setup the Plex platform is by enabling the [discovery component](/components/discovery/) which requires GDM enabled on your Plex server.

If your Plex server has local authentication enabled or multiple users defined, Home Assistant requires an authentication token to be entered in the frontend. Press "CONFIGURE" to do it.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/plex-configure.png' />
</p>

If you don't know your token, see [Finding your account token / X-Plex-Token](https://support.plex.tv/hc/en-us/articles/204059436).

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

In case [discovery](/components/discovery/) does not work (GDM disabled or non-local plex server), you can create `~/.homeassistant/plex.conf` manually.

```json
{"IP_ADDRESS:PORT": {"token": "TOKEN", "ssl": false, "verify": true}}
```

- **IP_ADDRESS** (*Required*): IP address of the Plex Media Server.
- **PORT** (*Required*): Port where Plex is listening. Default is 32400.
- **TOKEN** (*Optional*): Only if authentication is required. Set to `null` (without quotes) otherwise.
- **ssl** (*Optional*): Whether to use SSL/TLS or not. Defaults to `false`.
- **verify** (*Optional*): Perform a verification of the certificate. To allow invalid or self-signed SSL certificates set it to `false`. Defaults to `true`.

## {% linkable_title Customization %}

You can customize the Plex component by adding any of the variables below to your configuration:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: plex
    entity_namespace: 'plex'
    include_non_clients: true
    scan_interval: 5
    show_all_controls: false
    use_custom_entity_ids: true
    use_episode_art: true
    remove_unavailable_clients: true
    client_remove_interval: 600
```
- **entity_namespace** (*Optional*): Prefix for entity ID's. Defaults to `null`. Useful when using overlapping components (ex. Apple TV and Plex components when you have Apple TV's you use as Plex clients). Go from _media_player.playroom2_ to _media_player.plex_playroom_
- **include_non_clients** (*Optional*): Display non-recontrollable clients (ex. remote clients, PlexConnect Apple TV's). Defaults to `false`.
- **scan_interval** (*Optional*): Amount in seconds in between polling for device’s current activity. Defaults to `10` seconds.
- **show_all_controls** (*Optional*): Forces all controls to display. Defaults to `false`. Ignores dynamic controls (ex. show volume controls for client A but not for client B) based on detected client capabilities. This option allows you to override this detection if you suspect it to be incorrect.
- **use_custom_entity_ids** (*Optional*): Name Entity ID's by client ID's instead of friendly names. Defaults to `false`.  HA assigns entity ID's on a first come first serve basis.  When you have identically named devices connecting (ex. media_player.plex_web_safari, media_player.plex_web_safari2), you can't reliably distinguish and or predict which device is which.  This option avoids this issue by using unique client ID's (ex. media_player.dy4hdna2drhn).
- **use_episode_art** (*Optional*): Display TV episode art instead of TV show art. Defaults to `false`.
- **remove_unavailable_clients** (*Optional*): Remove stale plex clients from UI after interval. Defaults to `true`.
- **client_remove_interval** (*Optional*): How long a client is to be unavailable for before it is cleaned up. Defaults to `600 seconds (10min)`.

### {% linkable_title Service `play_media` %}

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

### {% linkable_title Notes %}

* At this moment, the Plex platform only supports one Plex Media Server.
* It is possible to get errors that look like the following.

  ```
  ERROR:plexapi:http://192.168.1.10:32400: ('Connection aborted.', BadStatusLine("''",))
  INFO:homeassistant.components.media_player.plex:No server found at: http://192.168.1.10:32400
  ```

  If this occurs, check the setting `Server`>`Network`>`Secure connections` in your Plex Media Server: if it is set to `Preferred` or `Required`, you may need to manually set the `ssl` and `verify` booleans in the `plex.conf` file to, respectively, `true` and `false`. See the **"Setup"** section above for details.
