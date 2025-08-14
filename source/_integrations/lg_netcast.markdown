---
title: LG Netcast
description: Instructions on how to integrate a LG TV (Netcast 3.0 & 4.0) within Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '0.20'
ha_domain: lg_netcast
ha_platforms:
  - media_player
ha_codeowners:
  - '@Drafteed'
  - '@splinter98'
ha_integration_type: device
---

The `lg_netcast` platform allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013). For the new LG WebOS TV's use the [webostv](/integrations/webostv#media-player) platform.

{% include integrations/config_flow.md %}

## Turn on action

Home Assistant can turn on an LG Netcast TV if you specify an action provided by an {% term integration %} like [HDMI-CEC](/integrations/hdmi_cec/) or [WakeOnLan](/integrations/wake_on_lan/).

1. To create an automation, go to {% my integrations title="**Settings** > **Devices & services**" %} and open the device page. 
2. Under **Automations**, select the + icon to create an automation with that device.
3. In the dialog, select the **Device is requested to turn on** automation.

Automations can also be created using an automation action:

The example below shows how you can use the `turn_on_action` with the [`wake_on_lan` integration](/integrations/wake_on_lan/).

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

# Enables the `lg_netcast` media player
automation:
  - alias: "Turn On Living Room TV with WakeOnLan"
    triggers:
      - trigger: lg_netcast.turn_on
        entity_id: media_player.lg_netcast_smart_tv
    actions:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: AA-BB-CC-DD-EE-FF
          broadcast_address: 11.22.33.44
```

Any other [actions](/docs/automation/action/) to power on the device can be configured.

## Change channel through play_media action

The `play_media` action can be used in a script to switch to the specified TV channel. It selects the major channel number according to the `media_content_id` parameter:

```yaml
# Example action entry in script to switch to channel number 15
action: media_player.play_media
target:
  entity_id: media_player.lg_tv
data:
  media_content_id: 15
  media_content_type: channel
```
