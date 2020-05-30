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
---

The Roku integration allows you to control a [Roku](https://www.roku.com/) device.

### Configuration

Go to the integrations page in your configuration and click on new integration -> Roku.
If your Roku device is on, it has likely been discovered already and you just have to confirm the detected device.

There is currently support for the following device types within Home Assistant:

- Media Player
- Remote

### YAML Configuration

Manual configuration of your Roku device is also possible, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
roku:
  - host: IP_ADDRESS
```

{% configuration %}
host:
  description: Set the IP address of the Roku device.
  required: true
  type: string
{% endconfiguration %}

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
data:
  entity_id: remote.roku
  command:
    - left
    - left
    - select
```

## Media Player

When the Home Assistant Roku integration is enabled and a Roku device has been configured, in the Home Assistant UI the Roku media player will show a listing of the installed channels, or apps, under “source”. Select one and it will attempt to launch the channel on your Roku device. This action can also be automated. Beginning with Home Assistant Core 0.110, channels can be launched by ```name``` or ```appID``` (in an automation, for example) using a configuration similar to the one below:
```yaml
action:
- data:
    entity_id: media_player.roku
    source: "Amazon Prime"
  service: media_player.select_source
```

Prior to Home Assistant Core 0.110, only the ```appID``` for the channel specific to your Roku can be used for `source:` Although this information is gathered by the Roku integration, at the moment it is not exposed to the end user. This item might be added in a future release. For now though, you can easily get the information yourself. All you need to do is a simple GET API call on the same network as your device.

The API calls are like this:

```txt
GET http:// ROKU_IP:8060/query/apps
POST http://ROKU_IP:8060/launch/APP_ID

YouTube example:
POST http://YOUR_ROKU_IP:8060/launch/837?contentID=YOUR_YOUTUBE_VIDEOS_CONTENT_ID&MediaType=live
```

More details can be found on the [Roku dev pages](https://developer.roku.com/docs/developer-program/debugging/external-control-api.md)

To use this in Home Assistant, the format is as follows. Note that `source:` is the appID you discovered in the API call:

```yaml
action:
- data:
    entity_id: media_player.roku
    source: 20197
  service: media_player.select_source
```

It is also possible to tune directly to specific channels if you have a Roku TV and use an OTA antenna. This service only supports `media_channel_type` of 'channel'. `media_content_id` corresponds to the TV channel, which you should see when navigating to these on your TV UI. 

```yaml
action:
- data:
    entity_id: media_player.roku
    media_content_id: 5.1
    media_content_type: channel
  service: media_player.play_media
```
