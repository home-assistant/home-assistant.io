---
layout: page
title: "Media Player"
description: "Instructions how to setup your media players with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
---

Interacts with media players on your network. Please check the sidebar for a full list of supported devices.

## {% linkable_title Services %}


### {% linkable_title Media control services %}
Available services: `turn_off`, `volume_up`, `volume_down`, `media_play_pause`, `media_play`, `media_pause`, `media_next_track`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.

### {% linkable_title Media play services %}

There are three services to start playing YouTube video's on the media player.

#### {% linkable_title Service `media_player/play_youtube_video` %}
 
Service to start playing a YouTube video on the media player. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.
| `video`                |       no | YouTube video to be played, ie. `L0MK7qz13bU`

#### {% linkable_title Service `media_player/start_fireplace` and `media_player/start_epic_sax` %}

Will either start a fireplace or Epic Sax Guy 10h on the media player.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.
