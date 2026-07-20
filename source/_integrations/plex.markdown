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

The activity sensor provides a count of users currently watching media from the Plex server. Selecting the sensor shows details for the active users and media streams.

The library sensors show a count of items in each library. Depending on the library contents, the sensor will show extra detail in its attributes. For example, a library sensor for TV shows will represent the total number of episodes in the library and its attributes will also report the number of shows and seasons it contains. The last added media item (movie, album, or episode) and a timestamp showing when it was added to its respective library are also provided.

In addition to the item count, the last added media item (movie, album, or episode) and a timestamp showing when it was added are also provided with each library sensor.

### Automation: notify when new media is added

You can use the `last_added_item` attribute on library sensors to notify you when new media has been added.

To create this automation from the UI:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Select **Create automation** > **Create new automation**.
3. Add three **State** triggers:
   - **Entity**: Movies library sensor, for example `sensor.plex_library_movies`
   - **Entity**: Music library sensor, for example `sensor.plex_library_music`
   - **Entity**: TV shows library sensor, for example `sensor.plex_library_tv_shows`
4. In the **Then do** section, select **Add action**.
5. Select **Send a notification message**.
   - **Target**: My Device (`notify.my_device`)
6. Enter the notification title and message.
7. Select **Save**.

{% details "YAML example for a new media notification" %}

{% example %}
automation: |
  alias: "Notify when Plex adds new media"
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
{% endexample %}

{% enddetails %}

{% important %}
The library sensors are disabled by default, but can be enabled via the Plex integration page. After the sensors are enabled, you may need to add a new item to your library before the last added media attribute is populated.
{% endimportant %}

## Button

A `button.scan_clients` entity is available to discover new controllable Plex clients. This may be necessary in scripts or automations which control a Plex client app, but where the underlying device must be turned on first. This button is preferred over the legacy `plex.scan_for_clients` action.

### Script: play Plex on a TV

You can use the scan clients button in a script that opens Plex on a TV, scans for the Plex client, and then starts playback.

To create this script from the UI:

1. Go to {% my scripts title="**Settings** > **Automations & scenes**" %}.
2. Select **Create script**.
3. Add a **Select source** action for your TV media player and select **Plex** as the source.
4. Add a wait until the TV media player turns on.
5. Add a **Press** action for the Plex scan clients button.
   - **Target**: Scan clients Plex (`button.scan_clients_plex`)
6. Add a wait template that checks whether the Plex media player is available.
7. Add a **Play specified media** action for the Plex media player.
   - **Target**: Plex Smart TV (`media_player.plex_smart_tv`)
8. Select **Save**.

{% details "YAML example for playing Plex on a TV" %}

{% example %}
script: |
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
{% endexample %}

{% enddetails %}

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

The search tries to find the type of media based on the most specific media type in the search. For example, a search using `artist.title` and `album.year` searches for albums by the artist from that year. If you add `track.title`, the search looks for a track instead. To choose the media type directly, add `libtype` with one of these values: `movie`, `episode`, `season`, `show`, `track`, `album`, or `artist`.

For music, the JSON payload can include `artist_name`, `artist.title`, `album_name`, `album.title`, `track_name`, `track.title`, `track_number`, and `track.index`.

For playlists, the JSON payload can include `playlist_name`.

For TV episodes, the JSON payload can include `show_name`, `show.title`, `season_number`, `season.index`, `episode_number`, and `episode.index`.

For movies, the JSON payload can include `title`.

For more specific searches, the JSON payload can also include filters supported by Plex, such as `actor`, `collection`, `contentRating`, `decade`, `director`, `genre`, `resolution`, `sort`, `unwatched`, and `year`. Some searches may need `maxresults` to limit the result to a single item.

More search parameters are available in the [`plexapi` library documentation](https://python-plexapi.readthedocs.io/en/latest/modules/library.html#plexapi.library.LibrarySection.search).

{% important %}
The integration must be configured with a token for playback commands to work. If you use the Plex server option **List of IP addresses and networks that are allowed without auth**, configure the integration while that option is temporarily disabled.
{% endimportant %}

#### Action: play a movie from a Plex library

This example plays a movie from a Plex library on a Plex media player.

- **Action**: Play specified media
  - **Target**: Plex Player (`media_player.plex_player`)
  - **Media content type**: movie
  - **Media content ID**: `{"library_name": "Movies", "title": "Blade"}`

{% details "YAML example for playing a movie from a Plex library" %}

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.plex_player
  data:
    media_content_type: movie
    media_content_id: >
      {"library_name": "Movies", "title": "Blade"}
{% endexample %}

{% enddetails %}

#### Action: play a random TV episode from a Plex library

This example plays a random TV episode from a Plex library on a Plex media player.

- **Action**: Play specified media
  - **Target**: Plex Player (`media_player.plex_player`)
  - **Media content type**: episode
  - **Media content ID**: A JSON payload with `library_name`, `show_name`, and `shuffle`

{% details "YAML example for playing a random TV episode" %}

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.plex_player
  data:
    media_content_type: episode
    media_content_id: >
      {
        "library_name": "Kids TV",
        "show_name": "Sesame Street",
        "shuffle": true
      }
{% endexample %}

{% enddetails %}

#### Action: play the oldest unwatched movie from a Plex collection

This example plays the oldest unwatched movie from a Plex collection on a Plex media player.

- **Action**: Play specified media
  - **Target**: Plex Player (`media_player.plex_player`)
  - **Media content type**: movie
  - **Media content ID**: A JSON payload with `library_name`, `collection`, `unwatched`, `sort`, and `maxresults`

{% details "YAML example for playing the oldest unwatched movie" %}

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.plex_player
  data:
    media_content_type: movie
    media_content_id: >
      {
        "library_name": "Movies",
        "collection": "Back to the Future",
        "unwatched": true,
        "sort": "year:asc",
        "maxresults": 1
      }
{% endexample %}

{% enddetails %}

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
2. Sonos speakers linked to your Plex account. For setup instructions, refer to [Control Sonos playback with a Plex app](https://support.plex.tv/articles/control-sonos-playback-with-a-plex-app/).
3. [Sonos](/integrations/sonos/) integration configured.

Call the [Play specified media](/actions/media_player.play_media/) action with the `entity_id` of a Sonos integration device and `media_content_type` prepended with `plex://`. Both `music` and `playlist` `media_content_type` values are supported.

### Action: play a Plex track on a Sonos speaker

This example plays a track directly on a Sonos speaker.

- **Action**: Play specified media
  - **Target**: Sonos speaker (`media_player.sonos_speaker`)
  - **Media content type**: `plex://music`
  - **Media content ID**: A JSON payload with `library_name`, `artist_name`, `album_name`, and `track_name`

{% details "YAML example for playing a Plex track on Sonos" %}

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.sonos_speaker
  data:
    media_content_type: plex://music
    media_content_id: >
      {
        "library_name": "Music",
        "artist_name": "Adele",
        "album_name": "25",
        "track_name": "Hello"
      }
{% endexample %}

{% enddetails %}

### Action: play a Plex playlist on a Sonos speaker

This example plays a Plex playlist directly on a Sonos speaker.

- **Action**: Play specified media
  - **Target**: Sonos speaker (`media_player.sonos_speaker`)
  - **Media content type**: `plex://playlist`
  - **Media content ID**: `{"playlist_name": "Party Mix"}`

{% details "YAML example for playing a Plex playlist on Sonos" %}

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.sonos_speaker
  data:
    media_content_type: plex://playlist
    media_content_id: >
      {"playlist_name": "Party Mix"}
{% endexample %}

{% enddetails %}

{% include integrations/actions.md %}

## Notes

- The Plex integration supports multiple Plex servers. Additional connections can be configured under {% my integrations title="**Settings** > **Devices & services**" %}.
- Movies must be located under the 'Movies' section in a Plex library to properly view the 'playing' state.
