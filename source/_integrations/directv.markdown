---
title: DirecTV
description: Instructions on how to integrate DirecTV receivers into Home Assistant.
logo: directv.png
ha_category:
  - Media Player
ha_release: 0.25
ha_iot_class: Local Polling
ha_config_flow: true
---

### Setup

Go to the integrations page in your configuration and click on new integration -> DirecTV.
If you have enabled [ssdp](/integrations/ssdp) discovery and your DirecTV receiver is on, it's likely that you just have to confirm the detected device.

### YAML Configuration

YAML configuration is around for people that prefer YAML.
To use a DirecTV receiver add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
directv:
  - host: IP_ADDRESS
```

{% configuration %}
host:
  description: "The hostname or IP of the DirecTV receiver, e.g., `192.168.0.10`."
  required: true
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
