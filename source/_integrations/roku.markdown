---
title: Roku
description: Instructions how to integrate Roku devices into Home Assistant.
logo: roku.png
ha_category:
  - Hub
  - Media Player
  - Remote
ha_iot_class: Local Polling
ha_release: 0.86
---

The [Roku](https://www.roku.com/) integration allows integration of Roku, which will be automatically discovered if you enable the [discovery component](/integrations/discovery/).

There is currently support for the following device types within Home Assistant:

- Media Player
- Remote

The `roku` integration can also be forced to load by adding the following lines to your `configuration.yaml`:

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

## Services

### Service `roku_scan`

Scans the local network for Rokus. All found devices are presented as a persistent notification.

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

When the Home Assistant Roku integration is enabled and has found a Roku device, in the Home Assistant GUI the Roku media player will show a listing of the installed channels, or apps, under “source”. Select one and it will attempt to launch the channel on your Roku device. This action can also be automated, but it requires you to acquire an extra piece of information; the ```appID``` for the channel specific to your Roku. Although this information is gathered by the Roku integration, at the moment it is not exposed to the end user. This item might be added in a future release. For now though, you can easily get the information yourself. All you need to do is a simple GET API call on the same network as your device.

The api calls are like this:

```txt
GET http:// ROKU_IP:8060/query/apps
POST http://ROKU_IP:8060/launch/APP_ID

YouTube example:
POST http://YOUR_ROKU_IP:8060/launch/837?contentID=YOUR_YOUTUBE_VIDEOS_CONTENT_ID&MediaType=live
```

More details can be found on the [Roku dev pages](https://developer.roku.com/docs/developer-program/discovery/external-control-api.md)

To use this in Home Assistant, for instance in an automation, the format is as follows. Note that ```source: ``` is the appID you discovered in the API call:

```yaml
action:
- data:
    entity_id: media_player.roku
    source: 20197
  service: media_player.select_source
```
