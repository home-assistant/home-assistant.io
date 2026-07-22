---
title: DirecTV
description: Instructions on how to integrate DirecTV receivers into Home Assistant.
ha_category:
  - Media player
  - Remote
ha_release: 0.25
ha_iot_class: Local Polling
ha_domain: directv
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - media_player
  - remote
ha_integration_type: hub
---

The **DirecTV** {% term integration %} allows you to control a [DirecTV](https://www.directv.com) receiver and its client devices.

## Requirements

For proper integration with Home Assistant, your DirecTV device settings should allow "External Access".

This is done via series of settings found via **Menu** > **Settings & Help** > **Settings** > **Whole Home** > **External Device**:

- External Access: Allow
- Current Program: Allow
- Recordings: Allow

{% include integrations/config_flow.md %}

## Remote

The DirecTV remote platform allows you to send remote control buttons to a DirecTV receiver. It is automatically set up when a DirecTV receiver is configured.

### Changing channels in automations

To change the channel on a DirecTV receiver, use the [**Play specified media**](/actions/media_player.play_media/) action and select the DirecTV media player as the target. Enter the channel number as the **Media content ID** and use `channel` as the **Media content type**.

### Sending remote commands in automations

To send remote control button commands to a DirecTV receiver, use the [**Send remote command**](/actions/remote.send_command/) action and select the DirecTV remote as the target.

A typical action for pressing several buttons looks like this:

```yaml
action: remote.send_command
target:
  entity_id: remote.directv_receiver
data:
  command:
    - left
    - left
    - menu
    - select
```

The commands available to you depend on the DirecTV receiver. Supported commands include:

- `power`
- `poweron`
- `poweroff`
- `format`
- `pause`
- `rew`
- `replay`
- `stop`
- `advance`
- `ffwd`
- `record`
- `play`
- `guide`
- `active`
- `list`
- `exit`
- `back`
- `menu`
- `info`
- `up`
- `down`
- `left`
- `right`
- `select`
- `red`
- `green`
- `yellow`
- `blue`
- `chanup`
- `chandown`
- `prev`
- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `dash`
- `enter`
