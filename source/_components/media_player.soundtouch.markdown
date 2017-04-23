---
layout: page
title: "Soundtouch"
description: "Instructions how to integrate Bose Soundtouch devices into Home Assistant."
date: 2016-11-06 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: soundtouch.jpg
ha_category: Media Player
ha_release: X.X.X
ha_iot_class: "Local Polling"
---

The `soundtouch` platform allows you to control your [Bose Soundtouch](https://www.soundtouch.com/) speakers from Home Assistant.

To add your Soundtouch components to your installation, add the following to your `configuration.yaml` file.

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
# Play media in configuration.yaml
- service: media_player.play_media
  data:
    entity_id: media_player.soundtouch_living_room
    media_content_id: 1..6
    media_content_type: PLAYLIST
```

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
