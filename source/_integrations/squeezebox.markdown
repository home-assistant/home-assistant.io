---
title: Squeezebox (Lyrion Music Server)
description: Instructions on how to integrate Squeezebox players and a Lyrion Music Server (LMS)  into Home Assistant.
ha_category:
  - Media player
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: squeezebox
ha_codeowners:
  - '@rajlaud'
  - '@pssc'
  - '@peteS-UK'
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - media_player
  - sensor
ha_integration_type: integration
---

The Squeezebox integration allows you to control music players from the [Lyrion Music Server](https://lyrion.org/) (LMS) ecosystem. Lyrion Music Server was formerly known as [Logitech Media Server](https://en.wikipedia.org/wiki/Squeezebox_%28network_music_player%29).

This integration provides both media players connected to the server and supporting binary sensors for the server status.

The Squeezebox music player ecosystem, which can be controlled through this integration, includes hardware audio players from Logitech, including [Squeezebox 3rd Generation, Squeezebox Boom, Squeezebox Receiver, Transporter, Squeezebox2, Squeezebox and SLIMP3](https://lms-community.github.io/players-and-controllers/hardware-comparison/), and many software emulators like [Squeezelite, SqueezeSlave, SoftSqueeze and SqueezePlay](https://sourceforge.net/projects/lmsclients/files/).

{% include integrations/config_flow.md %}

{% note %}
This platform uses the web interface of the Lyrion Music Server (LMS) to send commands. The default port of the web interface is 9000. It is the same port that you use to access the LMS through your web browser.
{% endnote %}

{% note %}
The integration now supports Lyrion Music Servers behind an HTTPS reverse proxy. Please note that Lyrion Music Server natively only supports HTTP traffic. Unless you have configured a reverse proxy, do not select the `https` option. If you have configured a reverse proxy, remember to update the port number.
{% endnote %}

The Logitech Transporter which have two digital inputs can be activated using a script. The following example turns on the Transporter and activates the toslink input interface:

```yaml
# Turn on Transporter and activate toslink interface
transporter_toslink:
  sequence:
    - action: homeassistant.turn_on
      target:
        entity_id: media_player.transporter
    - action: media_player.play_media
      target:
        entity_id: media_player.transporter
      data:
        media_content_id: "source:toslink"
        media_content_type: "music"
```

## Entities

### Binary sensors

- **Needs restart**: Server Service needs to be restarted (typically, this is needed to apply updates).
- **Library rescan**: The music library is currently being scanned by LMS (depending on the type of scan, some content may be unavailable).

### Sensors

- **Last scan**: Date of the last library scan.
- **Player count**: Number of players on the service.
- **Player count off service**: Number of players not on this service.
- **Total albums**: Total number of albums currently available in the service.
- **Total artists**: Total number of artists currently available in the service.
- **Total duration**: Duration of all tracks in service (HHHH:MM:SS).
- **Total genres**: Total number of genres used in current service.
- **Total songs**: Total number of music files currently in service.

## Actions

### Action `call_method`

Call a custom Squeezebox JSON-RPC API.

See documentation for this interface on `http://HOST:PORT/html/docs/cli-api.html?player=` where HOST and PORT are the host name and port for your Lyrion Music Server.

| Data attribute | Optional | Description                                                                                           |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Name(s) of the Squeezebox entities where to run the API method.                                       |
| `command`      | no       | Command to pass to Lyrion Music Server (p0 in the CLI documentation).                                 |
| `parameters`   | yes      | Array of additional parameters to pass to Lyrion Music Server (p1, ..., pN in the CLI documentation). |

This action can be used to integrate any Squeezebox action to an automation.

It can also be used to target a Squeezebox from IFTTT (or Dialogflow, Alexa...).

For example, to play an album from your collection, create an IFTTT applet like this:

- Trigger: Google Assistant, with sentence: `I want to listen to album $`
- Action: JSON post query with such JSON body:
  `{ "entity_id": "media_player.squeezebox_radio", "command": "playlist", "parameters": ["loadtracks", "album.titlesearch={{TextField}}"] }`

This can work with title search and basically any thing. The same wouldn't have worked by calling directly Squeezebox server as IFTTT cannot escape the text field.

### Action `call_query`

Call a custom Squeezebox JSON-RPC API. The result of the query will be stored in the 'query_result' attribute of the player.

See documentation for this interface on `http://HOST:PORT/html/docs/cli-api.html?player=` where HOST and PORT are the host name and port for your Lyrion Music Server.

| Data attribute | Optional | Description                                                                                           |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Name(s) of the Squeezebox entities where to run the API method.                                       |
| `command`      | no       | Command to pass to Lyrion Music Server (p0 in the CLI documentation).                                 |
| `parameters`   | yes      | Array of additional parameters to pass to Lyrion Music Server (p1, ..., pN in the CLI documentation). |

This action can be used to integrate a Squeezebox query into an automation. For example, in a Python script, you can get a list of albums available by an artist like this:
`hass.services.call("squeezebox", "call_query", { "entity_id": "media_player.kitchen", "command": "albums", "parameters": ["0", "20", "search:beatles", "tags:al"] })`
To work with the results:
`result = hass.states.get("media_player.kitchen").attributes['query_result']`

### Action `search`

This action allows you to search the LMS music library for albums, artists, genres, tracks, and playlists. You can also search for favorites and players. The result of the search will be stored in the 'query_result' attribute of the player.

| Data attribute  | Optional | Description                                                                                                                       |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`     | no       | Name(s) of the Squeezebox entities where to run the search.                                                                       |
| `command`       | no       | Items to search on the Lyrion Music Server. This must be one of albums, artists, genres, tracks, playlists, favorites or players. |
| `return_items`  | no       | The maximum numbers of items to return.                                                                                           |
| `search_string` | yes      | Limit the search to those items matching the search string.                                                                       |
| `tags`          | yes      | Specify tags you wish the search to return, overriding the default tag list                                                       |

This action can be used to integrate a Squeezebox query into an automation. For example, in a Python script, you can get a list of the first 20 albums containing the word "classic" like this:
`hass.services.call("squeezebox", "search", { "entity_id": "media_player.kitchen", "command": "albums", "return_items": "20", "search_string":"classic"] })`
To work with the results:
`result = hass.states.get("media_player.kitchen").attributes['query_result']`

### Action `play`

This action allows you to play music from the LMS music library. You can play an album, artist, genre, track, playlist or favorite. It has two forms. You can either search for an item by name, or you can specify the item_id, which is most likely retrieved previously using the search action. If you search by name, your search string must be detailed enough to return only a single result, which will be played or added to the current playlist. If you cannot specify a search string that will generate a unique result, then you should first use the 'search' action to find the item_id of the item you want to play and then play the item by ID rather than by name. If you enter a search string that generates no results or more than one result, the action will return an error.

| Data attribute    | Optional | Description                                                                                                                                                                                                     |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`       | no       | Name(s) of the Squeezebox entity on which to play the item.                                                                                                                                                     |
| `command`         | no       | Items to play on the Lyrion Music Server. This must be one of album, artist, genre, track, playlist, or favorite.                                                                                               |
| `search_type`     | no       | Either "text" or "item", to specify whether the contents of search_string is an item_id or a text search string.                                                                                                 |
| `search_string`   | no       | Either text to search to find the item to play, or an item_id of the item, depending on search_type.                                                                                                            |
| `playlist_action` | no       | Either play, add, or next. Play will replace the current playlist and play the item. Add will add the item to the end of the current playlist. Next will add the item as the next item in the current playlist. |

This action can be used to integrate a Squeezebox action into an automation. For example, in a Python script, you can play the favorite "Classics" on media_player.kitchen as follows
`hass.services.call("squeezebox", "play", { "entity_id": "media_player.kitchen", "command": "album", "search_type": "text", "search_string": "classic", "playlist_action": "play" })`
