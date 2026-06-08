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
For the new LG WebOS TV's use the [LG webOS TV](/integrations/webostv#media-player) platform.

{% include integrations/config_flow.md %}

{% include integrations/triggers.md %}

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

## Remote

The LG Netcast remote platform creates a `Remote` entity for each configured TV. This entity allows you to send remote control commands. To power on the TV, use the [Device is requested to turn on](/triggers/lg_netcast.turn_on/) trigger.

### Action: Send command

The `remote.send_command` action sends one or more remote commands to the TV.

- **Data attribute**: `command`
  - **Description**: Command, or list of commands, to send. See the list below.
  - **Optional**: No

- **Data attribute**: `num_repeats`
  - **Description**: Number of times to repeat the command sequence. The default is `1`.
  - **Optional**: Yes

- **Data attribute**: `delay_secs`
  - **Description**: Delay in seconds between commands and repeats.
  - **Optional**: Yes

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

### Examples

Send a single command:

```yaml
action: remote.send_command
target:
  entity_id: remote.lg_tv
data:
  command: HOME_MENU
```

Send repeated commands with a delay:

```yaml
action: remote.send_command
target:
  entity_id: remote.lg_tv
data:
  command:
    - VOLUME_UP
  num_repeats: 5
  delay_secs: 0.3
```

## LG Netcast automation examples

These examples show common automations using the LG Netcast integration.

{% include docs/paste_yaml_tip.md %}

### Automation: turn on the TV with Wake-on-LAN

When something requests the LG Netcast TV to turn on, send a Wake-on-LAN magic packet to power it on over the network. The [Wake-on-LAN integration](/integrations/wake_on_lan/) must be set up before using this example.

- **Trigger**: Device is requested to turn on
  - **Device**: Living room LG TV (`media_player.lg_netcast_tv`)
- **Action**: Send magic packet
  - **MAC address**: `AA-BB-CC-DD-EE-FF`

{% details "YAML example for turning on the TV with Wake-on-LAN" %}

{% example %}
automation: |
  alias: "Turn on LG Netcast TV with Wake-on-LAN"
  triggers:
    - trigger: lg_netcast.turn_on
      entity_id: media_player.lg_netcast_tv
  actions:
    - action: wake_on_lan.send_magic_packet
      data:
        mac: "AA-BB-CC-DD-EE-FF"
{% endexample %}

{% enddetails %}

### Automation: send a notification when the TV is requested to turn on

When something requests the LG Netcast TV to turn on, send a notification to your phone.

- **Trigger**: Device is requested to turn on
  - **Device**: Living room LG TV (`media_player.lg_netcast_tv`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending a notification when the TV is requested to turn on" %}

{% example %}
automation: |
  alias: "Notify when LG Netcast TV is requested to turn on"
  triggers:
    - trigger: lg_netcast.turn_on
      entity_id: media_player.lg_netcast_tv
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The living room TV was requested to turn on."
{% endexample %}

{% enddetails %}
