---
layout: page
title: "Denon HEOS"
description: "Instructions on how to integrate Denon HEOS into Home Assistant."
date: 2019-03-06 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: heos.png
ha_category: Media Player
ha_release: 0.92
ha_iot_class: Local Push
---

The HEOS integration adds support for [HEOS](http://heosbydenon.denon.com) capable products, such as speakers, amps, and receivers (Denon and Marantz) into Home Assistant. Features currently include:

- Each device is represented as a media player entity
- View the currently playing media
- Control play mode (play, pause, stop, next and previous), volume, mute and shuffle
- Clear playlist
- Select source from device physical inputs and HEOS favorites


## {% linkable_title Configuration %}

HEOS devices are discovered and setup automatically when the [discovery](/components/discovery) component is enabled. Alternatively, the component can be setup through the frontend control panel integrations page or manually by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
heos:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: "Address of the device. Example: 192.168.1.32."
  required: true
  type: string
{% endconfiguration %}

<p class='note info'>
A connection to a single device enables control for all devices on the network. If you have multiple HEOS devices, enter the host of one that is connected to the LAN via wire or has the strongest wireless signal.
</p>

## {% linkable_title Services %}

### {% linkable_title Service `media_player.play_media` %}

#### {% linkable_title Play Favorite %}

You can play a HEOS favorite by number or name with the `media_player.play_media` service. Example service data payload:

```json
{
  "entity_id": "media_player.office",
  "media_content_type": "favorite",
  "media_content_id": "1"
}
```

| Attribute              | Description
| ---------------------- | ----------- | ----------- |
| `entity_id`            | `entity_id` of the player
| `media_content_type`   | Set to the value `playlist`
| `media_content_id`     | The nubmer (i.e. `1`) or name (i.e. `Thumbprint Radio`) of the HEOS favorite

#### {% linkable_title Play Playlist %}

You can play a HEOS playlist with the `media_player.play_media` service. Example service data payload:

```json
{
  "entity_id": "media_player.office",
  "media_content_type": "playlist",
  "media_content_id": "Awesome Music"
}
```

| Attribute              | Description
| ---------------------- | ----------- | ----------- |
| `entity_id`            | `entity_id` of the player
| `media_content_type`   | Set to the value `playlist`
| `media_content_id`     | The name of the HEOS playlist

#### {% linkable_title Play Quick Select %}

You can play a HEOS Quick Select by nubmer or name with the `media_player.play_media` service. Example service data payload:

```json
{
  "entity_id": "media_player.office",
  "media_content_type": "quick_select",
  "media_content_id": "1"
}
```

| Attribute              | Description
| ---------------------- | ----------- | ----------- |
| `entity_id`            | `entity_id` of the player
| `media_content_type`   | Set to the value `quick_select`
| `media_content_id`     | The quick select number (i.e. `1`) or name (i.e. `Quick Select 1`)

#### {% linkable_title Play Url %}

You can play a URL through a HEOS media player using the `media_player.play_media` service. The HEOS player must be able to reach the URL. Example service data payload:

```json
{
  "entity_id": "media_player.office",
  "media_content_type": "url",
  "media_content_id": "http://path.to/stream.mp3"
}
```

| Attribute              | Description
| ---------------------- | ----------- | ----------- |
| `entity_id`            | `entity_id` of the player to play the URL
| `media_content_type`   | Set to the value `url`
| `media_content_id`     | The full URL to the stream


## {% linkable_title Notes %}

- HEOS groups are not currently supported.
- Receivers with multiple zones are represented as a single media player. They will be turned on when playback is started, but cannot be turned off by the integration at this time.


## {% linkable_title Debugging %}

The HEOS component will log additional information about commands, events, and other messages when the log level is set to `debug`. Add the the relevent line below to the `configuration.yaml` to enable debug logging:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.heos: debug
    pyheos: debug
```