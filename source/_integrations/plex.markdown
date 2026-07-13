---
title: Plex Media Server
description: Instructions on how to integrate Plex into Home Assistant.
ha_category:
  - Button
  - Media player
  - Sensor
  - Update
featured: true
ha_release: 0.7.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jjlawren'
ha_domain: plex
ha_platforms:
  - button
  - media_player
  - sensor
  - update
ha_zeroconf: true
ha_integration_type: service
---

The **Plex Media Server** {% term integration %} allows you to connect Home Assistant to a [Plex Media Server](https://plex.tv). Once configured, actively streaming [Plex Clients](https://www.plex.tv/apps-devices/) show up as [media players](/integrations/media_player/) and report playback status and library sizes via [sensors](/integrations/sensor/) in Home Assistant. Media players will allow you to control media playback and see the current playing item.

Support for playing music directly on linked [Sonos](/integrations/sonos/) speakers is available in the [Sonos playback](#sonos-playback) section.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Button](#button)
- [Update](#update)
- [Media player](#media-player)

If a Plex server has been claimed by a Plex account via the [claim interface](https://plex.tv/claim), Home Assistant will require authentication to connect.

{% include integrations/config_flow.md %}

During setup, you will need to log in as a server administrator. The integration will check all possible ways to connect to your Plex server(s), that is, local or public addresses, HTTP or HTTPS, by IP or using a subdomain of `plex.direct`, or by using a Plex relay if all other methods fail. The integration will prefer local over public and secure over insecure, in that order. The selected address is shown on the Plex card on the Integrations page.

If your router enforces DNS rebind protection, connections to the local `plex.direct` hostname may fail (see [Plex documentation](https://support.plex.tv/articles/206225077-how-to-use-secure-server-connections/#dnsrebinding)). To avoid this, configure your router to allow DNS rebinding for `plex.direct` by following the instructions in the documentation link.

### Integration options

Several options are provided to adjust the behavior of `media_player` entities. These can be changed at **Plex** > **Options** on the Integrations page.

**Use episode art**: Display TV episode art instead of TV show art.

**Monitored users**: A list of accounts with access to the Plex server. Only selected users will create `media_player` entities.

**Ignore new managed/shared users**: Enable to ignore new Plex accounts granted access to the server.

**Ignore Plex Web clients**: Do not create `media_player` entities for Plex Web clients.

### Manual configuration

Alternatively, you can manually configure a Plex server connection by selecting the "Configure Plex server manually" when configuring a Plex integration. This will allow you to specify the server connection options which will be validated before setup is completed. The available options are described below:

**Host**: The IP address or hostname of your Plex server. Optional if 'Token' is provided.

**Port**: The port of your Plex Server.

**Use SSL**: Use HTTPS to connect to Plex server.

**Verify SSL certificate**: Verify the SSL certificate of your Plex server. May be used if connecting with an IP or if using a self-signed certificate.

**Token**: A valid authorization token for your Plex server. If provided without 'Host', a connection URL will be retrieved from Plex.

## Sensor

The activity sensor provides a count of users currently watching media from the Plex server. Clicking the sensor shows details for the active users and media streams.

The library sensors show a count of items in each library. Depending on the library contents, the sensor will show extra detail in its attributes. For example, a library sensor for TV shows will represent the total number of episodes in the library and its attributes will also report the number of shows and seasons it contains. The last added media item (movie, album, or episode) and a timestamp showing when it was added to its respective library are also provided.

In addition to the item count, the last added media item (movie, album, or episode) and a timestamp showing when it was added are also provided with each library sensor.

Example automation to use the `last_added_item` attribute on library sensors to notify when new media has been added:

```yaml
alias: "Plex - New media added"
triggers:
  - trigger: state
    entity_id: sensor.plex_library_movies
    id: movie
  - trigger: state
    entity_id: sensor.plex_library_music
    id: album
  - trigger: state
    entity_id: sensor.plex_library_tv_shows
    id: episode

actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "New {{ trigger.id }} added"
      message: "{{ trigger.to_state.attributes.last_added_item }}"
```

{% important %}
The library sensors are disabled by default, but can be enabled via the Plex integration page. After the sensors are enabled, you may need to add a new item to your library before the last added media attribute is populated.
{% endimportant %}

## Button

A `button.scan_clients` entity is available to discover new controllable Plex clients. This may be necessary in scripts or automations which control a Plex client app, but where the underlying device must be turned on first. This button is preferred over the legacy `plex.scan_for_clients` action.

Example script:

```yaml
play_plex_on_tv:
  sequence:
    - action: media_player.select_source
      target:
        entity_id: media_player.smart_tv
      data:
        source: "Plex"
    - wait_for_trigger:
        - trigger: state
          entity_id: media_player.smart_tv
          to: "on"
      timeout:
        seconds: 10
    - action: button.press
      target:
        entity_id: button.scan_clients_plex
    - wait_template: >-
        {{ not is_state('media_player.plex_smart_tv', 'unavailable') }}
      timeout: "00:00:10"
      continue_on_timeout: false
    - action: media_player.play_media
      target:
        entity_id: media_player.plex_smart_tv
      data:
        media_content_id: >
          {"library_name": "Movies", "title": "Zoolander"}
        media_content_type: movie
```

## Update

Notifications of new releases of Plex Media Server are shown using an Update entity. Detailed release notes are provided.

Automatic upgrades of Plex Media Server can be triggered for some installation types, such as Windows and certain NAS devices.

## Media player

The Plex media player platform will create media player entities for each connected client device. These entities will display media information, playback progress, and playback controls (if supported by the streaming device).

By default, the Plex integration will create media player entities for all local, managed, and shared users on the Plex server. To customize which users or client types to monitor, adjust the "*Monitored users*", "*Ignore new managed/shared users*", and "*Ignore Plex Web clients*" options described under [Integration Options](#integration-options).

### Playing Plex media in automations

To play media hosted on a Plex server, use the [**Play specified media**](/actions/media_player.play_media/) action and select your Plex media player as the target. You can play music, playlists, TV episodes, movies, and search results from your Plex libraries.

To use this action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select the Plex media player.
6. From the actions shown for that target, select **Play specified media**.
7. Select the media from the media browser, or enter the **Media content ID** and **Media content type**.
8. Select **Save**.

The `media_content_id` value can be a JSON payload that identifies the Plex media to play. The payload can include these common search parameters:

- `library_name`: The Plex library to search. Required for most searches.
- `shuffle`: Shuffles the playback order of the media. Use `true` to enable it.
- `resume`: Resumes playback at the last partially watched position if available. Otherwise, playback starts from the beginning.
- `offset`: The playback start position in seconds.
- `allow_multiple`: Allows multiple matches in a search and enqueues all found items for playback. Use `true` to enable it.
- `username`: The local Plex user account to use. This is only needed when the Plex server has multiple users and you want to play media for a specific user.
- `continuous`: Automatically plays the next episode in the series. Use `true` to enable it.

For music, the JSON payload can include `artist_name`, `artist.title`, `album_name`, `album.title`, `track_name`, `track.title`, `track_number`, and `track.index`.

For playlists, the JSON payload can include `playlist_name`.

For TV episodes, the JSON payload can include `show_name`, `show.title`, `season_number`, `season.index`, `episode_number`, and `episode.index`.

For movies, the JSON payload can include `title`.

More search parameters are available in the [`plexapi` library documentation](https://python-plexapi.readthedocs.io/en/latest/modules/library.html#plexapi.library.LibrarySection.search).

{% important %}
The integration must be configured with a token for playback commands to work. If you use the Plex server option **List of IP addresses and networks that are allowed without auth**, configure the integration while that option is temporarily disabled.
{% endimportant %}

This example plays a movie from a Plex library.

```yaml
action: media_player.play_media
target:
  entity_id: media_player.plex_player
data:
  media_content_type: movie
  media_content_id: >
    {"library_name": "Movies", "title": "Blade"}
```

This example plays a random TV episode from a Plex library.

```yaml
action: media_player.play_media
target:
  entity_id: media_player.plex_player
data:
  media_content_type: EPISODE
  media_content_id: >
    {
      "library_name": "Kids TV",
      "show_name": "Sesame Street",
      "shuffle": true
    }
```

### Compatibility

| Client             | Limitations                                |
| ------------------ | ------------------------------------------ |
| Remote clients     | Controls are unavailable                   |
| Apple TV           | None                                       |
| iOS                | None                                       |
| NVidia Shield      | None                                       |
| Plexamp            | None (music playback only)                 |
| Plex Desktop & Web | Controls are unavailable (as of June 2022) |
| Plex HTPC          | None                                       |

## Sonos playback

To play Plex music directly to Sonos speakers, the following requirements must be met:

1. Remote access enabled for your Plex server.
2. Sonos speakers linked to your Plex account [(Instructions)](https://support.plex.tv/articles/control-sonos-playback-with-a-plex-app/).
3. [Sonos](/integrations/sonos/) integration configured.

Call the [Play specified media](/actions/media_player.play_media/) action with the `entity_id` of a Sonos integration device and `media_content_type` prepended with `plex://`. Both `music` and `playlist` `media_content_type` values are supported.

This example plays a Plex playlist directly on a Sonos speaker.

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos_speaker
data:
  media_content_type: plex://playlist
  media_content_id: >
    {"playlist_name": "Party Mix"}
```

## Notes

- The Plex integration supports multiple Plex servers. Additional connections can be configured under {% my integrations title="**Settings** > **Devices & services**" %}.
- Movies must be located under the 'Movies' section in a Plex library to properly view the 'playing' state.
