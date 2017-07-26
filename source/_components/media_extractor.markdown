---
layout: page
title: "Media Extractor"
description: "Instructions how to integrate the Media Extractor into Home Assistant."
date: 2017-07-12 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Media Player
ha_release: 0.49
---


The `media_extractor` component gets a stream URL and sends it to a media player entity.

To use the media extractor service in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_extractor:
```

### {% linkable_title Use the service %}

Go to the "Developer Tools," then to "Call Service," and choose `media_extractor/play_media` from the list of available services. Fill the "Service Data" field as shown in the example below and hit "CALL SERVICE."

This will download the file from the given URL.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to seek media on, e.g., `media_player.living_room_chromecast`. Defaults to all.
| `media_content_id`     |       no | The ID of the content to play. Platform dependent.
| `media_content_type`   |       no | The type of the content to play. Must be one of MUSIC, TVSHOW, VIDEO, EPISODE, CHANNEL or PLAYLIST MUSIC.
