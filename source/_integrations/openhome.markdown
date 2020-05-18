---
title: Linn / OpenHome
description: Instructions on how to integrate Linn Ds and Openhome renderers into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.39
ha_iot_class: Local Polling
ha_domain: openhome
---

The `openhome` platform allows you to connect an [Openhome Compliant Renderer](http://openhome.org/) to Home Assistant such as a [Linn Products Ltd](https://www.linn.co.uk) HiFi streamer. It will allow you to control media playback, volume, source and see the current playing item. Openhome devices should be discovered by using the [the discovery component](/integrations/discovery/), their device names are taken from the name of the room configured on the device.

### Example `configuration.yaml` entry

```yaml
discovery:
media_player:
  - platform: openhome
```

### Example local audio playback action

```yaml
action:
  - service: media_player.play_media
    data_template:
      entity_id:
        - media_player.linn_bedroom
      media_content_id: "http://172.24.32.13/Doorbell.mp3"
      media_content_type: music
```

### Example web stream playback action

```yaml
  - service: media_player.play_media
    data_template:
      entity_id:
        - media_player.linn_bedroom
      media_content_id: "http://media-ice.musicradio.com:80/ClassicFMMP3"
      media_content_type: music
```
