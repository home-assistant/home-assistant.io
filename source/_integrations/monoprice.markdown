---
title: Monoprice 6-Zone Amplifier
description: Instructions on how to integrate Monoprice 6-Zone Home Audio Controller into Home Assistant.
ha_category:
  - Media player
ha_release: 0.56
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@etsinko'
  - '@OnFreund'
ha_domain: monoprice
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `monoprice` platform allows you to control [Monoprice 6-Zone Amplifier](https://www.monoprice.com/product?p_id=10761) using a serial connection.

{% include integrations/config_flow.md %}


## Configuration notes

If you are using an IP232 module instead of a direct serial connection, then use `socket://<host>:<port>` in the port setting.
  
Sources can also be later edited from the integration options (gear icon in the top right when selecting the integration). Note that editing sources will remove the snapshot you may have saved.

## Zone management

Devices and entities are created for each of the possible 18 zones, and can be enabled, disabled and renamed through regular Home Assistant methods.
By default, the first 6 zones (11..16) are enabled, and there's an attempt to automatically detect the 12 extension zones (21..26, and 31..36) on the first run.

## Actions

### Action `monoprice.snapshot`

Take a snapshot of one or more zones' states. This action, and the following one are useful if you want to play a doorbell or notification sound and resume playback afterward. If `entity_id` is `all`, all zones are snapshotted.

The following attributes are stored in a snapshot:

- Power status (On/Off)
- Mute status (On/Off)
- Volume level
- Source

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.

### Action `monoprice.restore`

Restore a previously taken snapshot of one or more speakers. If `entity_id` is `all`, all zones are restored.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.
