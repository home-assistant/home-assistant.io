---
title: DirecTV
description: Instructions on how to integrate DirecTV receivers into Home Assistant.
logo: directv.png
ha_category:
  - Media Player
ha_release: 0.25
ha_iot_class: Local Polling
---

Master [DirecTV](https://www.directv.com/) receivers (ie: those that have tuners) will be automatically discovered if you enable the [discovery integration](/integrations/discovery/) and the receiver is powered-on. Slave/RVU client/Genie boxes will also be discovered, but only if they are also online at the time of discovery.

To ensure that your DirecTV boxes are always found and configured, they should be added into your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
directv:
  - host: 1.1.1.1
```

{% configuration %}
host:
  description: The IP address or the hostname of the device. Use only if you don't want to scan for devices.
  required: false
  type: string
{% endconfiguration %}

## Services

### Media control services

Available services: turn_on, turn_off, media_play, media_pause, media_stop, media_next_track, media_previous_track, play_media

#### Service `media_player.play_media`

| Service data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.                                                                                                                       |
| `media_content_id`     |       no | The channel number to change to.                   |
| `media_content_type`   |       no | A media type. Has to be `channel`.
