---
title: LG Netcast
description: Instructions on how to integrate a LG TV (Netcast 3.0 & 4.0) within Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: '0.20'
ha_domain: lg_netcast
ha_platforms:
  - media_player
---

The `lg_netcast` platform allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013). For the new LG WebOS TV's use the [webostv](/integrations/webostv#media-player) platform.

To add a LG TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: lg_netcast
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the LG Smart TV, e.g., 192.168.0.20.
  required: true
  type: string
access_token:
  description: The access token needed to connect.
  required: false
  type: string
name:
  description: The name you would like to give to the LG Smart TV.
  required: false
  default: LG TV Remote
  type: string
turn_on_action:
  description: Defines an [action](/docs/automation/action/) to turn the TV on.
  required: false
  type: string
{% endconfiguration %}

To get the access token for your TV configure the `lg_netcast` platform in Home Assistant without the `access_token`.
After starting Home Assistant the TV will display the access token on screen.
Just add the token to your configuration and restart Home Assistant and the media player integration for your LG TV will show up.

<div class='note'>
  The access token will not change until you factory reset your TV.
</div>

## Advanced configuration

The example below shows how you can use the `turn_on_action`

```yaml
# Example configuration.yaml entry
media_player:
  - platform: lg_netcast
    host: 192.168.0.20
    turn_on_action:
      service: switch.turn_on
      target:
        entity_id: switch.tv_switch
```

## Change channel through play_media service

The `play_media` service can be used in a script to switch to the specified TV channel. It selects the major channel number according to the `media_content_id` parameter:

```yaml
# Example action entry in script to switch to channel number 15
service: media_player.play_media
target:
  entity_id: media_player.lg_tv
data:
  media_content_id: 15
  media_content_type: channel
```
