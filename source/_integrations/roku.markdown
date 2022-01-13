---
title: Roku
description: Instructions how to integrate Roku devices into Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Media Player
  - Remote
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
  - media_player
  - remote
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

When the Home Assistant Roku integration is enabled and a Roku device has been configured, in the Home Assistant UI the Roku media player will show a listing of the installed channels, or apps, under “source”. Select one and it will attempt to launch the channel on your Roku device. This action can also be automated. Channels can be launched by `name` using a configuration similar to the one below:
```yaml
action:
- target:
    entity_id: media_player.
  data:
    source: "Prime Video"
  service: media_player.select_source
```

Alternatively, the `appID` for the channel can be used for `source:` Although this information is gathered by the Roku integration, at the moment it is not exposed to the end-user. This item might be added in a future release. For now, you can easily get the information yourself. All you need to do is a GET API call on the same network as your device.

The API calls are like this:

```txt
GET http://ROKU_IP:8060/query/apps
POST http://ROKU_IP:8060/launch/APP_ID
```

One method of performing the GET request is to open `http://ROKU_IP:8060/query/apps` in your web browser of choice. The Roku will return an XML-formatted list of available channels, including their full name and appID. 

More details can be found on the [Roku dev pages](https://developer.roku.com/docs/developer-program/debugging/external-control-api.md)

To use this information in Home Assistant, the format is as follows. Note that `source:` is the appID you discovered in the API call:

```yaml
action:
  - service: media_player.select_source
    target:
      entity_id: media_player.roku
    data:
      source: 20197
```

It is also possible to tune directly to specific channels if you have a Roku TV and use an OTA antenna. This service only supports `media_channel_type` of 'channel'. `media_content_id` corresponds to the TV channel, which you should see when navigating to these on your TV UI. 

```yaml
action:
  - service: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: 5.1
      media_content_type: channel
```

## Content Deeplinking

The `media_player.play_media` service may be used to deep link to content within an application.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. To target all media players, use `all`. |                                                                                                                    |
| `media_content_id` | no | A media identifier. | 291097
| `media_content_type` | no | A media type. | channel
| `extra.content_id` | no | A unique content identifier passed to app. | 8e06a8b7-d667-4e31-939d-f40a6dd78a88
| `extra.media_type` | no | A media type passed to app. Should be one of `app`, `movie`, `episode`, `season`, `series`, `shortFormVideo`, `special`, `live` | movie

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
| Spotify | 22297 | N/A | spotify:playlist:abcdefghij0123456789XY | app
| YouTube | 837 | youtu.be/6ZMXE5PXPqU | 6ZMXE5PXPqU | live

## Services

### Service `roku.search`

This service allows you to emulate opening the search screen and entering the search keyword.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | The entities to search on. | media_player.roku
| `keyword` | no | The keyword to search for. | Space Jam
