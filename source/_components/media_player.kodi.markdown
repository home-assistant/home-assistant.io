---
layout: page
title: "Kodi"
description: "Instructions how to integrate Kodi into Home Assistant."
date: 2015-06-22 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: kodi.png
ha_category: Media Player
featured: true
ha_release: pre 0.7
ha_iot_class: "Local Push"
---


The `kodi` platform allows you to control a [Kodi](http://kodi.tv/) multimedia system from Home Assistant.

To add Kodi to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: kodi
    host: 192.168.0.123
```

Configuration variables:

- **host** (*Required*): The host name or address of the device that is running XBMC/Kodi.
- **port** (*Optional*): The HTTP port number. Defaults to 8080.
- **tcp_port** (*Optional*): The TCP port number. Defaults to 9090. Used for websocket connections to Kodi.
- **name** (*Optional*): The name of the device used in the frontend.
- **proxy_ssl** (*Optional*): Connect to kodi with HTTPS and WSS. Defaults to `false`. Useful if Kodi is behind an SSL proxy.
- **username** (*Optional*): The XBMC/Kodi HTTP username.
- **password** (*Optional*): The XBMC/Kodi HTTP password.
- **turn_off_action** (*Optional*): The desired turn off action. Options are `none`, `quit`, `hibernate`, `suspend`, `reboot`, or `shutdown`. Default `none`.
- **enable_websocket** (*Optional*): Enable websocket connections to Kodi via the TCP port. Defaults to `true`. The websocket connection allows Kodi to push updates to Home Assistant and removes the need for Home Assistant to poll. If websockets don't work on your installation this can be set to `false`.
- **timeout** (*Optional*): Set timeout for connections to Kodi. Defaults to 5 seconds.


### {% linkable_title Service `kodi_add_to_playlist` %}

Add music to the default playlist (i.e. playlistid=0).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the Kodi entities where to add the media.
| `media_type` | yes | Media type identifier. It must be one of SONG or ALBUM.
| `media_id` | no | Unique Id of the media entry to add (`songid` or `albumid`). If not defined, `media_name` and `artist_name` are needed to search the Kodi music library.
| `media_name` | no| Optional media name for filtering media. Can be 'ALL' when `media_type` is 'ALBUM' and `artist_name` is specified, to add all songs from one artist.
| `artist_name` | no | Optional artist name for filtering media.


### {% linkable_title Service `kodi_call_method` %}

Call a [Kodi JSONRPC API](http://kodi.wiki/?title=JSON-RPC_API) method with optional parameters. Results of the Kodi API call will be redirected in a Home Assistant event: `kodi_call_method_result`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the Kodi entities where to run the API method.
| `method` | yes | Name of the Kodi JSONRPC API method to be called.
| any other parameter | no | Optional parameters for the Kodi API call.


### {% linkable_title Event triggering %}

When calling the `kodi_call_method` service, if the Kodi JSONRPC API returns data, when received by Home Assistant it will fire a `kodi_call_method_result` event on the event bus with the following `event_data`:

```yaml
entity_id: "<Kodi media_player entity_id>"
result_ok: <boolean>
input: <input parameters of the service call>
result: <data received from the Kodi API>
```

### {% linkable_title Kodi services samples %}

#### Simple script to turn on the TV with the Kodi JSON-CEC Addon

```yaml
script:
  activate_tv:
    alias: Turn on TV
    sequence:
      - alias: TV on
        service: media_player.kodi_call_method
        data:
            entity_id: media_player.kodi
            method: Addons.ExecuteAddon
            addonid: script.json-cec
            params:
                command: activate
```

#### Dynamic input select with Kodi content

A more complex example, to configure a `input_select` that can play in Kodi the latest entries added when selecting them.

It consists of 3 scripts that query the Kodi API to return the contents of the Kodi library, and an AppDaemon app with which the events are heard with the results of the API queries.

When received, the appdaemon app populates the `input_select`, and when an option is selected, the app calls to play the selected media.

The `input_select` and the scripts:

```yaml
input_select:
  kodi_results:
    name: Kodi API results
    options:
     - Nothing to do

script:
  get_recent_movies:
    alias: Last added movies
    sequence:
      - service: media_player.kodi_call_method
        data:
          entity_id: media_player.kodi
          method: VideoLibrary.GetRecentlyAddedMovies
          properties:
            - title
            - year
            - file
            - lastplayed

  get_recent_episodes:
    alias: Last TV shows
    sequence:
      - service: media_player.kodi_call_method
        data:
          entity_id: media_player.kodi
          method: VideoLibrary.GetRecentlyAddedEpisodes
          properties:
            - showtitle
            - file
            - lastplayed
            - firstaired

  get_pvr_channels:
    alias: TV Channels
    sequence:
      - service: media_player.kodi_call_method
        data:
          entity_id: media_player.kodi
          method: PVR.GetChannels
          channelgroupid: 1
```

The AppDaemon app:

```python
import appdaemon.appapi as appapi
from homeassistant.components.media_player.kodi import (
    EVENT_KODI_CALL_METHOD_RESULT)

ENTITY = 'input_select.kodi_results'
MEDIA_PLAYER = 'media_player.kodi'
DEFAULT_ACTION = "Nothing to do"
MAX_RESULTS = 20

class DynamicKodiInputSelect(appapi.AppDaemon):
    """AppDaemon app to dynamically populate an `input_select`."""
    _ids_options = None

    def initialize(self):
        """Set up appdaemon app."""
        self.listen_event(self._receive_kodi_result,
                          EVENT_KODI_CALL_METHOD_RESULT)
        self.listen_state(self._change_selected_result, ENTITY)
        # Input select:
        self._ids_options = {DEFAULT_ACTION: None}

    def _receive_kodi_result(self, event_id, payload_event, *args):
        result = payload_event['result']
        method = payload_event['input']['method']

        assert event_id == EVENT_KODI_CALL_METHOD_RESULT
        if method == 'VideoLibrary.GetRecentlyAddedMovies':
            values = result['movies'][:MAX_RESULTS]
            data = [('{} ({})'.format(r['label'], r['year']),
                     ('MOVIE', r['file'])) for r in values]
            self._ids_options.update(dict(zip(*zip(*data))))
            labels = list(list(zip(*data))[0])
            self.call_service('input_select/set_options',
                              entity_id=ENTITY,
                              options=[DEFAULT_ACTION] + labels)
            self.set_state(ENTITY,
                           attributes={"friendly_name": 'Recent Movies',
                                       "icon": 'mdi:movie'})
        elif method == 'VideoLibrary.GetRecentlyAddedEpisodes':
            values = list(filter(lambda r: not r['lastplayed'],
                                 result['episodes']))[:MAX_RESULTS]
            data = [('{} - {}'.format(r['showtitle'], r['label']),
                     ('TVSHOW', r['file'])) for r in values]
            self._ids_options.update(dict(zip(*zip(*data))))
            labels = list(list(zip(*data))[0])
            self.call_service('input_select/set_options',
                              entity_id=ENTITY,
                              options=[DEFAULT_ACTION] + labels)
            self.set_state(ENTITY,
                           attributes={"friendly_name": 'Recent TvShows',
                                       "icon": 'mdi:play-circle'})
        elif method == 'PVR.GetChannels':
            values = result['channels']
            data = [(r['label'], ('CHANNEL', r['channelid']))
                    for r in values]
            self._ids_options.update(dict(zip(*zip(*data))))
            labels = list(list(zip(*data))[0])
            self.call_service('input_select/set_options',
                              entity_id=ENTITY,
                              options=[DEFAULT_ACTION] + labels)
            self.set_state(ENTITY,
                           attributes={"friendly_name": 'TV channels',
                                       "icon": 'mdi:play-box-outline'})

    def _change_selected_result(self, entity, attribute, old, new, kwargs):
        selected = self._ids_options[new]
        if selected:
            mediatype, file = selected
            self.call_service('media_player/play_media',
                              entity_id=MEDIA_PLAYER,
                              media_content_type=mediatype,
                              media_content_id=file)
```
