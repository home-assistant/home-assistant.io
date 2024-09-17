---
title: Roku
description: Instructions how to integrate Roku devices into Home Assistant.
ha_category:
  - Binary sensor
  - Hub
  - Media player
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
ha_integration_type: device
---

The Roku integration allows you to control a [Roku](https://www.roku.com/) device.

{% include integrations/config_flow.md %}

When adding the integration, you will be asked to provide a {% term host %}. Unless you changed the hostname, this refers to the IP address of your Roku device. You can find the IP address or hostname in the network settings of your Roku device, by checking your router, or by using a network scanning tool.

If you are having issues connecting, you may have to adjust the settings on your Roku device to allow local control. The common setting is: `Settings / System / Advanced / Control by mobile apps / Network access`

There is currently support for the following device types within Home Assistant:

- Media player
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

A typical action for pressing several buttons looks like this.

```yaml
action: remote.send_command
target:
  entity_id: remote.roku
data:
  command:
    - left
    - left
    - select
```

## Media player

When the Home Assistant Roku integration is enabled and a Roku device has been configured, in the Home Assistant UI the Roku media player will show a listing of the installed channels, or apps, under “source”. Select one and it will attempt to launch the channel on your Roku device.

## Source Automation

The `media_player.select_source` action may be used to launch specific applications/streaming channels on your Roku device.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `source` | no | An application name or application ID. | Prime Video

### Examples

```yaml
action:
- action: media_player.select_source
  target:
    entity_id: media_player.roku
  data:
    source: "Prime Video"
```

Alternatively, the application id can be used for `source`. See [Obtaining Application IDs](#obtaining-application-ids).

```yaml
action:
  - action: media_player.select_source
    target:
      entity_id: media_player.roku
    data:
      source: 20197
```

### Obtaining Application IDs

The currently active application ID can be found in the `Active App ID` diagnostic sensor.

Alternatively, you can make a manual HTTP request (GET) to `http://ROKU_IP:8060/query/apps`, in either your browser or terminal, to retrieve a complete list of installed applications in XML format.

## TV Channel Tuning

The `media_player.play_media` action may be used to tune to specific channels on your Roku TV device with OTA antenna.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A channel number. | 5.1
| `media_content_type` | no | A media type. | `channel`

### Example

```yaml
action:
  - action: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: 5.1
      media_content_type: channel
```

## Content Deeplinking

The `media_player.play_media` action may be used to deep-link to content within an application.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A media identifier. | 291097
| `media_content_type` | no | A media type. | `app`
| `extra.content_id` | no | A unique content identifier passed to app. | 8e06a8b7-d667-4e31-939d-f40a6dd78a88
| `extra.media_type` | no | A media type passed to app. Should be one of `movie`, `episode`, `season`, `series`, `shortFormVideo`, `special`, `live` | movie

### Example

```yaml
action:
  - action: media_player.play_media
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

## Actions

### Action `roku.search`

This action allows you to emulate opening the search screen and entering the search keyword.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | The entities to search on. | media_player.roku
| `keyword` | no | The keyword to search for. | Space Jam
