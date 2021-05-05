---
title: Roku
description: Instructions how to integrate Roku devices into Home Assistant.
ha_category:
  - Hub
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

YouTube example:
POST http://YOUR_ROKU_IP:8060/launch/837?contentID=YOUR_YOUTUBE_VIDEOS_CONTENT_ID&MediaType=live
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

## Remote

The `remote` platform allows you to send keypress commands to your device. Remote entities are automatically registered during the integration setup.

## Services

### Service `roku.search`

This service allows you to emulate opening the search screen and entering the search keyword.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | The entities to search on. | media_player.roku
| `keyword` | no | The keyword to search for. | Space Jam
