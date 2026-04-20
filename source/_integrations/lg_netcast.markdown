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

The **LG Netcast** {% term integration %} allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013). For the new LG WebOS TV's use the [webostv](/integrations/webostv#media-player) platform.

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

## Action `lg_netcast.send_command`

Send a named remote control command to the TV.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `command`      | no | The remote control command to send. See the list of available commands below. |

Available commands:

- `APPS`
- `ASPECT_RATIO`
- `AUDIO_DESCRIPTION`
- `AV_MODE`
- `BACK`
- `BLUE`
- `CHANNEL_DOWN`
- `CHANNEL_UP`
- `DASH`
- `DOWN`
- `ENERGY_SAVING`
- `EPG`
- `EXIT`
- `EXTERNAL_INPUT`
- `FAST_FORWARD`
- `FAVORITE_CHANNEL`
- `GREEN`
- `HOME_MENU`
- `LEFT`
- `LIVE_TV`
- `LR_3D`
- `MARK`
- `MUTE_TOGGLE`
- `NUMBER_0`
- `NUMBER_1`
- `NUMBER_2`
- `NUMBER_3`
- `NUMBER_4`
- `NUMBER_5`
- `NUMBER_6`
- `NUMBER_7`
- `NUMBER_8`
- `NUMBER_9`
- `OK`
- `PAUSE`
- `PIP_CHANNEL_DOWN`
- `PIP_CHANNEL_UP`
- `PIP_SECONDARY_VIDEO`
- `PLAY`
- `POWER`
- `PREVIOUS_CHANNEL`
- `PROGRAM_INFORMATION`
- `PROGRAM_LIST`
- `QUICK_MENU`
- `RECORD`
- `RECORDING_LIST`
- `RED`
- `REPEAT`
- `RESERVATION_PROGRAM_LIST`
- `REWIND`
- `RIGHT`
- `SHOW_SUBTITLE`
- `SIMPLINK`
- `SKIP_BACKWARD`
- `SKIP_FORWARD`
- `STOP`
- `SWITCH_VIDEO`
- `TELE_TEXT`
- `TEXT_OPTION`
- `UP`
- `VIDEO_3D`
- `VOLUME_DOWN`
- `VOLUME_UP`
- `YELLOW`

```yaml
# Example: navigate to the home menu
action: lg_netcast.send_command
target:
  entity_id: media_player.lg_tv
data:
  command: HOME_MENU
```
