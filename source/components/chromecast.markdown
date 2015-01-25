---
layout: page
title: "Chromecast"
description: "Instructions how to setup your chromecasts with Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

<p class='note warning'>
Chromecasts have recently received a new API which is not yet supported by Home Assistant. Therefore we currently can only detect them and do not know what they are up to.
</p> 

Interacts with Chromecasts on your network. Will be automatically discovered if you setup [the discovery component]({{site_root}}/components/discovery.html). Can also be forced to load by adding the following lines to your `home-assistant.conf`:

```
[chromecast]
```

## Services

### Media control services
Available services: `turn_off`, `volume_up`, `volume_down`, `media_play_pause`, `media_play`, `media_pause`, `media_next_track`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific chromecast. Defaults to all.

### Media play services

There are three services to start playing YouTube video's on the ChromeCast.

#### Service `chromecast/play_youtube_video`
Service to start playing a YouTube vide on the Chromecast. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific chromecast. Defaults to all.
| `video`                |       no | YouTube video to be played, ie. `L0MK7qz13bU`


#### Service `chromecast/start_fireplace` and `chromecast/start_epic_sax`
Will either start a fireplace or Epic Sax Guy 10h on the Chromecast.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Target a specific chromecast. Defaults to all.
