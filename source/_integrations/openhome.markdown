---
title: Linn / OpenHome
description: Instructions on how to integrate Linn Ds and Openhome renderers into Home Assistant.
ha_category:
  - Media player
  - Update
ha_release: 0.39
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: openhome
ha_ssdp: true
ha_codeowners:
  - '@bazwilliams'
ha_platforms:
  - media_player
  - update
ha_integration_type: integration
---

The Linn / OpenHome integration allows you to connect an [Openhome Compliant Renderer](http://openhome.org/) to Home Assistant such as a [Linn Products Ltd](https://www.linn.co.uk) HiFi streamer. It will allow you to control media playback, volume, source and see the current playing item.

{% include integrations/config_flow.md %}

### Example local audio playback action

```yaml
actions:
  - action: media_player.play_media
    target:
      entity_id: media_player.linn_bedroom
    data:
      media_content_id: "http://172.24.32.13/Doorbell.mp3"
      media_content_type: music
```

### Example web stream playback action

```yaml
  - action: media_player.play_media
    target:
      entity_id: media_player.linn_bedroom
    data:
      media_content_id: "http://media-ice.musicradio.com:80/ClassicFMMP3"
      media_content_type: music
```

## Actions

### Media control actions

Available actions: `invoke_pin`

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |     yes | The name of the openhome device to invoke the pin on.|
| `pin`                  |      no | Which pin to invoke.                              |
