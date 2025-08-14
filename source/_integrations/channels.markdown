---
title: Channels
description: Instructions on how to integrate Channels into Home Assistant.
ha_category:
  - Media player
ha_release: 0.65
ha_iot_class: Local Polling
ha_domain: channels
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The Channels platform allows you to control [Channels](https://getchannels.com/) from Home Assistant. Play, pause, seek, or skip commercials on an instance of Channels that is running on your network.

Your favorite channels will appear as sources in the Source List in Home Assistant.

## Configuration

To add Channels to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: channels
    name: Family Room Channels
    host: 192.168.1.50
```

{% configuration %}
host:
  description: The IP address of the device running Channels, e.g., 192.168.1.50.
  required: true
  type: string
port:
  description: The port where Channels is accessible.
  required: false
  default: 57000
  type: integer
name:
  description: The name of the Channels instance in Home Assistant, e.g., Family Room Channels.
  required: false
  default: Channels
  type: string
{% endconfiguration %}

### Action `seek_forward`

Seek forward by the number of seconds currently set in settings on the instance of Channels.

| Data attribute | Optional | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | no       | String that points at `entity_id` of Channels app. |

### Action `seek_backward`

Seek backward by the number of seconds currently set in settings on the instance of Channels.

| Data attribute | Optional | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | no       | String that points at `entity_id` of Channels app. |

### Action `seek_by`

Seek forward or backward by a provided number of seconds.

| Data attribute | Optional | Description                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------- |
| `entity_id`            | no       | String that points at `entity_id` of Channels app.                              |
| `seconds`              | no       | Number of seconds to seek in the timeline by. Negative seconds seeks backwards. |
