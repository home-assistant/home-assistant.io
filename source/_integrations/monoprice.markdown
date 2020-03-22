---
title: Monoprice 6-Zone Amplifier
description: Instructions on how to integrate Monoprice 6-Zone Home Audio Controller into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.56
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@etsinko'
ha_domain: monoprice
---

The `monoprice` platform allows you to control [Monoprice 6-Zone Amplifier](https://www.monoprice.com/product?p_id=10761) using a serial connection.

### Configuration via the frontend

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Monoprice**.
Select the serial port to which Monoprice amplifier is connected, and name the six sources (leave sources you're not using empty).

### Service `monoprice.snapshot`

Take a snapshot of one or more zones' states. This service, and the following one are useful if you want to play a doorbell or notification sound and resume playback afterward. If `entity_id` is `all`, all zones are snapshotted.

The following attributes are stored in a snapshot:
- Power status (On/Off)
- Mute status (On/Off)
- Volume level
- Source

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.

### Service `monoprice.restore`

Restore a previously taken snapshot of one or more speakers. If `entity_id` is `all`, all zones are restored.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of zones.
