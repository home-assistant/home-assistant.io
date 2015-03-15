---
layout: page
title: "Media Player"
description: "Instructions how to setup your media players with Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

Interacts with media players on your network. Currently only supports Chromecasts. These will be automatically discovered if you setup [the discovery component]({{site_root}}/components/discovery.html). Can also be forced to load by adding the following lines to your `configuration.yaml`:

```
media_player:
  platform: chromecast
```

<p class='note warning'>
Chromecasts have recently received a new API which is not yet supported by Home Assistant. Therefore we currently can only detect them and do not know what they are up to.
</p> 

## Services

### Media control services
Available services: `turn_off`, `volume_up`, `volume_down`, `media_play_pause`, `media_play`, `media_pause`, `media_next_track`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.

### Media play services

There are three services to start playing YouTube video's on the media player.

#### Service `media_player/play_youtube_video`
Service to start playing a YouTube vide on the media player. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.
| `video`                |       no | YouTube video to be played, ie. `L0MK7qz13bU`


#### Service `media_player/start_fireplace` and `media_player/start_epic_sax`
Will either start a fireplace or Epic Sax Guy 10h on the media player.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.
