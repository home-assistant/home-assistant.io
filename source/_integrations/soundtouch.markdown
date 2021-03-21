---
title: Bose Soundtouch
description: Instructions on how to integrate Bose Soundtouch devices into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: soundtouch
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

{% configuration %}
host:
  description: The host name or address of the Soundtouch device.
  required: true
  type: string
name:
  description: The name of the device used in the frontend.
  required: true
  default: Bose Soundtouch
  type: string
port:
  description: The port number.
  required: false
  default: 8090
  type: integer
{% endconfiguration %}

You can switch between one of your 6 pre-configured presets using ```media_player.play_media```

```yaml
# Play media preset
- service: media_player.play_media
  target:
    entity_id: media_player.soundtouch_living_room
  data:
    media_content_id: 1..6
    media_content_type: PLAYLIST
```

You can also play HTTP (not HTTPS) URLs:

```yaml
# Play media URL
- service: media_player.play_media
  target:
    entity_id: media_player.soundtouch_living_room
  data:
    media_content_id: http://example.com/music.mp3
    media_content_type: MUSIC
```

### Text-to-Speech services

You can use TTS services like [Google Text-to-Speech](/integrations/google_translate) or [Amazon Polly](/integrations/amazon_polly) only if your Home Assistant is configured in HTTP and not HTTPS (current device limitation, a firmware upgrade is planned).

A workaround if you want to publish your Home Assistant installation on Internet in SSL is to configure an HTTPS Web Server as a reverse proxy ([NGINX](/docs/ecosystem/nginx/) for example) and let your Home Assistant configuration in HTTP on your local network. The Soundtouch devices will be available to access the TTS files in HTTP in local and your configuration will be in HTTPS on the Internet.

### Service `play_everywhere`

Create a multi-room (zone) from a master and play same content on all other
 devices (slaves)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | `entity_id` of the master device

### Service `create_zone`

Create a multi-room (zone) from a master and play on selected slaves

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | `entity_id` of the master device|
| `slaves` | no | List of slaves `entity_id`      |

### Service `add_zone_slave`

Add slave(s) to an existing zone

| Service data attribute | Optional | Description  |
| ---------------------- | -------- | ------------ |
| `master` | no | `entity_id` of the master device |
| `slaves` | no | List of slaves `entity_id` to add|

### Service `remove_zone_slave`

Remove slave(s) from an existing zone.

Removing the last slave will destroy the zone. You will need to
create a new zone in order to be able to add slave(s) again

| Service data attribute | Optional | Description      |
| ---------------------- | -------- | ---------------- |
| `master` | no | `entity_id` of the master device     |
| `slaves` | no | List of slaves `entity_id` to remove |
