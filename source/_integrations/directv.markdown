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
ha_integration_type: integration
---

The DirecTV platform allows you to control a [DirecTV](https://www.directv.com) receiver and its client devices.

## Requirements

For proper integration with Home Assistant, your DirecTV device settings should allow "External Access".

This is done via series of settings found via **Menu** > **Settings & Help** > **Settings** > **Whole Home** > **External Device**:

- External Access: Allow
- Current Program: Allow
- Recordings: Allow

{% include integrations/config_flow.md %}

## Actions

### Media control actions

Available {% term actions %}: turn_on, turn_off, media_play, media_pause, media_stop, media_next_track, media_previous_track, play_media

#### Action `media_player.play_media`

| Data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. Defaults to all.                                                                                                                       |
| `media_content_id`     |       no | The channel number to change to.                   |
| `media_content_type`   |       no | A media type. Has to be `channel`.

## Remote

The DirecTV remote platform allows you to send remote control buttons to a DirecTV receiver. It is automatically set up when a DirecTV receiver is configured.

At the moment, the following buttons are supported:

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

A typical action for pressing several buttons looks like this.

```yaml
action: remote.send_command
target:
  entity_id: remote.directv_entity
data:
  command:
    - left
    - left
    - menu
    - select
```
