---
title: Soundavo WS66i 6-Zone Amplifier
description: Instructions on how to integrate WS66i 6-Zone Home Audio Controller into Home Assistant.
ha_category:
  - Media Player
ha_release: 2021.10
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@ssaenger'
ha_domain: ws66i
ha_platforms:
  - media_player
---

The `ws66i` platform allows you to control [Soundavo Whole-Home Audio Amplifier](https://www.soundavo.com/products/ws-66i) using the local Ethernet network. This amplifier is a direct upgrade of the amplifier sold by [Monoprice](https://www.monoprice.com/product?p_id=10761) that adds 2 wireless streamers and adds an Ethernet port for control over LAN.

{% include integrations/config_flow.md %}


## Configuration notes

Enter the IP Address of the WS66i amplifier in the top line and enter friendly names for each of the 6 zones in the subsequent lines. To find the IP Address of the WS66i amplifier, check the connected clients on your network and look for the one named "WS66i".

Source names can also be later edited from the integration options (gear icon in the top right when selecting the integration). Note that editing sources will remove the snapshot you may have saved.

## Zone Management

Devices and entities are created for each of the possible 18 zones, and can be enabled, disabled and renamed through regular Home Assistant methods.
By default, the first 6 zones (11..16) are enabled, and there's an attempt to automatically detect the 12 extension zones (21..26, and 31..36) on the first run.

## Services

### Service `ws66i.snapshot`

Take a snapshot of one or more zones' states. This service, and the following one are useful if you want to play a doorbell or notification sound and resume playback afterward. If `entity_id` is `all`, all zones are snapshotted.

The following attributes are stored in a snapshot:

- Power status (On/Off)
- Mute status (On/Off)
- Volume level
- Source

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.

### Service `ws66i.restore`

Restore a previously taken snapshot of one or more speakers. If `entity_id` is `all`, all zones are restored.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.
