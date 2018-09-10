---
layout: page
title: "Soundtouch"
description: "Instructions on how to integrate Bose Soundtouch devices into Home Assistant."
date: 2016-11-06 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: soundtouch.png
ha_category: Media Player
ha_release: 0.34.0
ha_iot_class: "Local Polling"
---

The `soundtouch` platform allows you to control your [Bose Soundtouch](https://www.soundtouch.com/) speakers from Home Assistant.

By default it supports auto-discovery provided by Home Assistant, and you don't need to add anything to your `configuration.yaml`.

Alternatively, you can add the following to your `configuration.yaml` file.

```yaml
# Example configuration.yaml
media_player:
  - platform: soundtouch
    host: 192.168.1.1
    port: 8090
    name: Soundtouch Living Room
```

Or for multiple hosts

```yaml
# Example configuration.yaml with many devices
media_player:
  - platform: soundtouch
    host: 192.168.1.1
    port: 8090
    name: Soundtouch Living Room
  - platform: soundtouch
    host: 192.168.1.1
    port: 8090
    name: Soundtouch kitchen
```

Configuration variables:

- **host** (*Required*): The host name or address of the Soundtouch device.
- **name** (*Required*): The name of the device used in the frontend.
- **port** (*Optional*): The port number. Defaults to 8090.

You can switch between one of your 6 pre-configured presets using ```media_player.play_media```

```yaml
# Play media preset
- service: media_player.play_media
  data:
    entity_id: media_player.soundtouch_living_room
    media_content_id: 1..6
    media_content_type: PLAYLIST
```

You can also play HTTP (not HTTPS) URLs:

```yaml
# Play media URL
- service: media_player.play_media
  data:
    entity_id: media_player.soundtouch_living_room
    media_content_id: http://example.com/music.mp3
    media_content_type: MUSIC
```

### {% linkable_title Text-to-Speech services %}

You can use TTS services like [Google Text-to-Speech](/components/tts.google/) or [Amazon Polly](/components/tts.amazon_polly) only if your Home Assistant is configured in HTTP and not HTTPS (current device limitation, a firmware upgrade is planned).

A workaround if you want to publish your Home Assistant installation on Internet in SSL is to configure an HTTPS Web Server as a reverse proxy ([nginx](/docs/ecosystem/nginx/) for example) and let your Home Assistant configuration in HTTP on your local network. The Soundtouch devices will be available to access the TTS files in HTTP in local and your configuration will be in HTTPS on the Internet.

### {% linkable_title Service `soundtouch_play_everywhere` %}

Create a multi-room (zone) from a master and play same content on all other
 devices (slaves)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | `entity_id` of the master device

### {% linkable_title Service `soundtouch_create_zone` %}

Create a multi-room (zone) from a master and play on selected slaves

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | `entity_id` of the master device|
| `slaves` | no | List of slaves `entity_id`      |

### {% linkable_title Service `soundtouch_add_zone_slave` %}

Add slave(s) to an existing zone

| Service data attribute | Optional | Description  |
| ---------------------- | -------- | ------------ |
| `master` | no | `entity_id` of the master device |
| `slaves` | no | List of slaves `entity_id` to add|

### {% linkable_title Service `soundtouch_remove_zone_slave` %}

Remove slave(s) from an existing zone.

Removing the last slave will destroy the zone. You will need to
create a new zone in order to be able to add slave(s) again

| Service data attribute | Optional | Description      |
| ---------------------- | -------- | ---------------- |
| `master` | no | `entity_id` of the master device     |
| `slaves` | no | List of slaves `entity_id` to remove |
