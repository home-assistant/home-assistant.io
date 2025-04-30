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

The Roku integration allows you to control a [Roku](https://www.roku.com/) media playback device. This integration only supports Roku media playback devices (such as sticks, streaming boxes, and televisions). All other smart home products (such as light bulbs and cameras) are part of a different ecosystem.

{% include integrations/config_flow.md %}

When adding the integration, you will be asked to provide a {% term host %}. Unless you changed the hostname, this refers to the IP address of your Roku device. You can find the IP address or hostname in the network settings of your Roku device, by checking your router, or by using a network scanning tool.

If you are having issues connecting, you may have to adjust the settings on your Roku device to allow local control. The common setting is: `Settings / System / Advanced / Control by mobile apps / Network access`

{% include integrations/option_flow.md %}

{% configuration_basic %}
Play Media Application ID:
  description: The application ID to use when launching media playback. The default is `15985`. This application must support the PlayOnRoku API.
{% endconfiguration_basic %}

## Data updates

The Roku integration polls every 10 seconds to check the current state of media playback. The available applications and television channels are only fetched every 15 minutes.

## Supported functionality

### Entities

The Roku integration provides the following entities.

#### Binary sensor

- **Headphones connected sensor**
  - **Description**: The headphones connected sensor will tell if you if the device has headphones connected for private listening.
  - **Available for devices**: All

- **Supports AirPlay sensor**
  - **Description**: The supports AirPlay sensor will tell if the device is capable of accepting AirPlay connections.
  - **Available for devices**: All

- **Supports Ethernet sensor**
  - **Description**: The supports Ethernet sensor will tell if the device is capable of being connected via an Ethernet cable.
  - **Available for devices**: All

- **Supports find remote sensor**
  - **Description**: The supports find remote sensor will tell if the device is capable of the find remote feature.
  - **Available for devices**: All

#### Media player

The integration allows for media playback control including power and source control. It also supports the ability to select sources such as text-to-speech and Camera via "Browse Media".

#### Remote

The integration allows you to send remote control commands. It is automatically set up for all devices.

The following commands are currently supported depending on device type and manufacturer support:

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

##### Example

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

#### Select

- **Application control**
  - **Description**: The application select control allows changing the active application.
  - **Available for devices**: All 

- **Channel control**
  - **Description**: The channel select control allows changing the active television channel.
  - **Available for devices**: Only available for Roku TV devices.

#### Sensor

- **Active app sensor**
  - **Description**: The active app sensor will tell you the name of the active application.
  - **Available for devices**: All

- **Active app ID sensor**
  - **Description**: The active app ID sensor will tell you the ID of the active application.
  - **Available for devices**: All

### Source automation

The `media_player.select_source` action may be used to launch specific applications on your Roku device.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `source` | no | An application name or application ID. | Prime Video

#### Examples

```yaml
actions:
- action: media_player.select_source
  target:
    entity_id: media_player.roku
  data:
    source: "Prime Video"
```

Alternatively, the application id can be used for `source`. See [Obtaining Application IDs](#obtaining-application-ids).

```yaml
actions:
  - action: media_player.select_source
    target:
      entity_id: media_player.roku
    data:
      source: 20197
```

### TV channel tuning

The `media_player.play_media` action may be used to tune to specific channels on your Roku TV device with OTA antenna.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A channel number. | 5.1
| `media_content_type` | no | A media type. | `channel`

#### Example

```yaml
actions:
  - action: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: 5.1
      media_content_type: channel
```

### Play on Roku

The `media_player.play_media` action may be used to send media URLs (primarily videos) for direct playback on your device.

This feature makes use of the PlayOnRoku API. If you are using an older Roku OS (pre-11.5), the defaults of this integration should just work with the configuration defaults. Alternatively, you can configure a third-party application that supports the PlayOnRoku API via the `Play Media Roku Application ID` option.

The following third-party applications have been tested with this integration:

- [Media Assistant](https://channelstore.roku.com/details/625f8ef7740dff93df7d85fc510303b4/media-assistant) (ID: 782875)

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A media URL. | `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
| `media_content_type` | no | A media type. | `url`
| `extra.format` | no | A media format. It should be one of `mp4` (supports mov and m4v), `mp3`, `hls`, `ism` (smooth streaming), `dash` (MPEG-DASH), `mkv`, `mka`, `mks` | `mp4`
| `extra.name` | yes | A name for the media. | Big Buck Bunny
| `extra.thumbnail` | yes | A thumbnail URL for the media. | 
| `extra.artist_name` | yes | The name of the media artist. | Blender

#### Example
```yaml
actions:
  - action: media_player.play_media
    target:
      entity_id: media_player.roku
    data:
      media_content_id: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      media_content_type: url
      extra:
        format: "mp4"
        name: "Big Buck Bunny"
``` 

### Content deeplinking

The `media_player.play_media` action may be used to deep-link to content within a channel application using content IDs. See [Obtaining Content IDs](#obtaining-content-ids) to learn more about content IDs.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | Target a specific media player. | 
| `media_content_id` | no | A media identifier. | 291097
| `media_content_type` | no | A media type. | `app`
| `extra.content_id` | no | A unique content identifier passed to app. | 8e06a8b7-d667-4e31-939d-f40a6dd78a88
| `extra.media_type` | no | A media type passed to app. Should be one of `movie`, `episode`, `season`, `series`, `shortFormVideo`, `special`, `live` | movie

#### Example

```yaml
actions:
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

### Camera stream integration

The `camera.play_stream` action may be used to send camera streams (HLS) directly to your device. This feature requires the [`stream` integration](/integrations/stream) and makes use of the PlayOnRoku API.

#### Example

```yaml
actions:
  - action: camera.play_stream
    target:
      entity_id: camera.camera
    data:
      media_player: media_player.roku
```

### Additional actions

The integration exposes additional actions to control a Roku device.

#### Action `roku.search`

This action allows you to emulate opening the search screen and entering the search keyword.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | The entities to search on. | media_player.roku
| `keyword` | no | The keyword to search for. | Space Jam

## Tips and tricks

### Obtaining application IDs

The currently active application ID can be found in the `Active App ID` diagnostic sensor.

Alternatively, you can make a manual HTTP request (GET) to `http://ROKU_IP:8060/query/apps`, in either your browser or terminal, to retrieve a complete list of installed applications in XML format.

### Obtaining content IDs

Content IDs are unique to each streaming service and vary in format but are often part of the video webpage URL. Here are some examples:

| Service | App ID | URL Format | Content ID | Media Type
| ------- | ------ | ---------- | ---------- | ---------- |
| Disney Plus | 291097 | disneyplus.com/video/8e06a8b7-d667-4e31-939d-f40a6dd78a88 | 8e06a8b7-d667-4e31-939d-f40a6dd78a88 | movie
| Hulu | 2285 | hulu.com/series/american-dad-977c8e25-cde0-41b7-80ce-e746f2d2093f | american-dad-977c8e25-cde0-41b7-80ce-e746f2d2093f | series
| Spotify | 22297 | open.spotify.com/playlist/5xddIVAtLrZKtt4YGLM1SQ | spotify:playlist:5xddIVAtLrZKtt4YGLM1SQ | playlist
| YouTube | 837 | youtu.be/6ZMXE5PXPqU | 6ZMXE5PXPqU | live

## Known limitations

Roku has been known to remove or restrict local control functionality as part of major Roku OS upgrades. As such devices may become less functional after an upgrade.

Roku channels, such as YouTube, are maintained by third-parties and as such the availability of features like Content Deeplinking are subject to change without notice.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
