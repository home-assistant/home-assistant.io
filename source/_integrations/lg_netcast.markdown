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
  - remote
ha_codeowners:
  - '@Drafteed'
  - '@splinter98'
ha_integration_type: device
---

The **LG Netcast** {% term integration %} allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013).
For the new LG webOS TV's use the [LG webOS TV](/integrations/webostv#media-player) platform.

{% include integrations/config_flow.md %}

{% include integrations/triggers.md %}

## Remote

The LG Netcast integration creates a media player entity and a remote entity for each configured TV.

To change channels from an automation or script, use the [**Play specified media**](/actions/media_player.play_media/) action and select your LG Netcast media player entity as the target. Set **Media content ID** to the channel number and **Media content type** to `channel`.

To send remote control commands, use the `remote.send_command` action provided by the [Remote](/integrations/remote/) integration and select your LG Netcast remote entity as the target.

### Sending remote commands in automations

To send a remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your LG Netcast remote entity.
6. From the actions shown for that target, select **Send remote command**.
7. Enter the **Command** to send.
8. Select **Save**.

Supported commands include:

{% details "Full key code list" %}

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

{% enddetails %}

To power on the TV, use the [Device is requested to turn on](/triggers/lg_netcast.turn_on/) trigger.
