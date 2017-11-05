---
layout: page
title: "Dynamic input select with Kodi media"
description: "How to configure an `input_select` that can play in Kodi the latest entries added to the library"
date: 2017-05-16 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

This requires a [Kodi](/components/media_player.kodi/) media player, and consists of commands that perform queries in the Kodi library, and a selection box (`input_select`) that shows the available options. By clicking the commands, the selection box is updated, and when selecting an option, Kodi plays the media.

Option filling is done in an [AppDaemon](https://home-assistant.io/docs/ecosystem/appdaemon/tutorial/) app, which listens for events that are triggered with the results of the Kodi JSONRPC API queries when scripts run. This application also listens to the selection box and calls the play media service with the corresponding parameters.

The media player yaml config:

```yaml
media_player:
- platform: kodi
  name: Kodi
  host: 192.168.0.123
```

The `input_select` with the scripts and a group:

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

group:
  Media Select:
    control: hidden
    entities:
      - input_select.kodi_results
      - script.get_recent_movies
      - script.get_recent_episodes
      - script.get_pvr_channels
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
        self.listen_state(self._change_selected_option, ENTITY)
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

    def _change_selected_option(self, entity, attribute, old, new, kwargs):
        selected = self._ids_options[new]
        if selected:
            mediatype, file = selected
            self.call_service('media_player/play_media',
                              entity_id=MEDIA_PLAYER,
                              media_content_type=mediatype,
                              media_content_id=file)
```
