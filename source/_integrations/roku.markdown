---
title: Roku
description: Instructions how to integrate Roku devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Hub
  - Media Player
  - Remote
  - Select
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.86
ha_domain: roku
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@ctalkington'
ha_ssdp: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - media_player
  - remote
  - select
  - sensor
ha_integration_type: integration
---

The Roku integration allows you to control a [Roku](https://www.roku.com/) device.

{% include integrations/config_flow.md %}

There is currently support for the following device types within Home Assistant:

- Media Player
- Remote

## Remote

The `roku` remote platform allows you to send remote control buttons to a Roku device. It is automatically set up when a Roku is configured.

At the moment, the following buttons are supported:

- back
- backspace
- channel_down
- channel_up
- down
- enter
- find_remote
- forward
- home
- info
- input_av1
- input_hdmi1
- input_hdmi2
- input_hdmi3
- input_hdmi4
- input_tuner
- left
- literal
- play
- power
- replay
- reverse
- right
- search
- select
- up
- volume_down
- volume_mute
- volume_up

A typical service call for pressing several buttons looks like this.

```yaml
service: remote.send_command
target:
  entity_id: remote.roku
data:
  command:
    - left
    - left
    - select
```

## Media Player

When the Home Assistant Roku integration is enabled and a Roku device has been configured, in the Home Assistant UI the Roku media player will show a listing of the installed channels, or apps, under “source”. Select one and it will attempt to launch the channel on your Roku device.

## Source Automation

The `media_player.select_source` service may be used to launch specific applications/streaming channels on your Roku device.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `source` | no | An application name or application ID. | Prime Video

### Examples

```yaml
action:
- service: media_player.select_source
  target:
    entity_id: media_player.roku
  data:
    source: "Prime Video"
```

Alternatively, the application id can be used for `source`. See [Obtaining Application IDs](#obtaining-application-ids).

```yaml
action:
  - service: media_player.select_source
    target:
      entity_id: media_player.roku
    data:
      source: 20197
```

### Obtaining Application IDs

The currently active application ID can be found in the `Active App ID` diagnostic sensor.

Alternatively, you can make a manual HTTP request (GET) to `http://ROKU_IP:8060/query/apps`, in either your browser or terminal, to retrieve a complete list of installed applications in XML format.

## TV Channel Tuning

The `media_player.play_media` service may be used to tune to specific channels on your Roku TV device with OTA antenna.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A channel number. | 5.1
| `media_content_type` | no | A media type. | `channel`

### Example

```yaml
action:
  - service: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: 5.1
      media_content_type: channel
```

## Play on Roku

The `media_player.play_media` service may be used to send media URLs (primarily videos) for direct playback on your device. This feature makes use of the built-in PlayOnRoku application.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A media URL. | http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
| `media_content_type` | no | A media type. | `url`
| `extra.format` | no | A media format. Should be one of `mp4` (supports mov and m4v), `mp3`, `hls`, `ism` (smooth streaming), `dash` (MPEG-DASH), `mkv`, `mka`, `mks` | `mp4`
| `extra.name` | yes | A name for the media. | Big Buck Bunny
| `extra.thumbnail` | yes | A thumbnail URL for the media. | 
| `extra.artist_name` | yes | The name of the media artist. | Blender

### Example

```yaml
action:
  - service: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
      media_content_type: url
      extra:
        format: mp4
        name: Big Buck Bunny
```

## Camera Stream Integration

The `camera.play_stream` service may be used to send camera streams (HLS) directly to your device. This feature requires the `stream` integration and makes use of the built-in PlayOnRoku application.

### Example
```yaml
action:
  service: camera.play_stream
    target:
      entity_id: camera.camera
    data:
      media_player: media_player.roku
```

## Content Deeplinking

The `media_player.play_media` service may be used to deep link to content within an application.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A media identifier. | 291097
| `media_content_type` | no | A media type. | `app`
| `extra.content_id` | no | A unique content identifier passed to app. | 8e06a8b7-d667-4e31-939d-f40a6dd78a88
| `extra.media_type` | no | A media type passed to app. Should be one of `movie`, `episode`, `season`, `series`, `shortFormVideo`, `special`, `live` | movie

### Example

```yaml
action:
  - service: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: 291097
      media_content_type: app
      extra:
        content_id: 8e06a8b7-d667-4e31-939d-f40a6dd78a88
        media_type: movie
```

### Obtaining Content IDs

Content IDs are unique to each streaming service and vary in format but are often part of the video webpage URL. Here are some examples:

| Service | App ID | URL Format | Content ID | Media Type
| ------- | ------ | ---------- | ---------- | ---------- |
| Disney Plus | 291097 | disneyplus.com/video/8e06a8b7-d667-4e31-939d-f40a6dd78a88 | 8e06a8b7-d667-4e31-939d-f40a6dd78a88 | movie
| Hulu | 2285 | hulu.com/series/american-dad-977c8e25-cde0-41b7-80ce-e746f2d2093f | american-dad-977c8e25-cde0-41b7-80ce-e746f2d2093f | series
| Spotify | 22297 | open.spotify.com/playlist/5xddIVAtLrZKtt4YGLM1SQ | spotify:playlist:5xddIVAtLrZKtt4YGLM1SQ | playlist
| YouTube | 837 | youtu.be/6ZMXE5PXPqU | 6ZMXE5PXPqU | live

## Services

### Service `roku.search`

This service allows you to emulate opening the search screen and entering the search keyword.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | The entities to search on. | media_player.roku
| `keyword` | no | The keyword to search for. | Space Jam
