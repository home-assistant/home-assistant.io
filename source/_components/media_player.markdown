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
Available services: `turn_off`, `volume_up`, `volume_down`, `media_play_pause`, `media_pause`, `media_next_track`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.

### {% linkable_title Playing Media %}

#### {% linkable_title Service `media_player/play_media` %}

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.
| `media_content_id`            |      no | A media identifier. The format of this is component dependent. For example, you can provide URLs to Sonos and Cast but only a playlist ID to iTunes.
| `media_content_type`            |      no | A media type. Must be one of `MUSIC`, `TVSHOW`, `VIDEO`, `EPISODE`, `CHANNEL` or `PLAYLIST`. For example, to play music you would set `media_content_type` to `MUSIC`.
