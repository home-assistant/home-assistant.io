---
title: Snapcast
description: Instructions on how to integrate Snapcast into Home Assistant.
ha_category:
  - Media player
ha_release: 0.13
ha_iot_class: Local Push
ha_domain: snapcast
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: integration
ha_codeowners:
  - '@luar123'
---

The Snapcast integration allows you to control [Snapcast](https://github.com/badaix/snapcast) from Home Assistant.

{% include integrations/config_flow.md %}

## Actions

The snapcast integration provides a few actions registered under the media_player integration.

### Action `snapcast.snapshot`

Take a snapshot of what is currently playing on one or more speakers. This action, and the following one, are useful if you want to play a doorbell or notification sound and resume playback afterwards.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | The speakers to snapshot.

### Action `snapcast.restore`

Restore a previously taken snapshot of one or more speakers.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s that should have their snapshot restored.

### Action `snapcast.set_latency`

Set the latency of a speaker.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s for which latency will be adjusted.
| `latency` | no | Latency in ms.
