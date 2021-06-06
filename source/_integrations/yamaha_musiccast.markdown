---
title: Yamaha MusicCast
description: Instructions on how to integrate Yamaha MusicCast Receivers into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.53
ha_codeowners:
  - '@micha91'
  - '@vigonotion'
ha_iot_class: Local Push
ha_ssdp: true
ha_config_flow: true
ha_domain: yamaha_musiccast
ha_platforms:
  - media_player
---

The `yamaha_musiccast` integration allows you to control [Yamaha MusicCast Receivers](https://usa.yamaha.com/products/audio_visual/musiccast/index.html) from Home Assistant.

Supported devices are listed on their [site](https://usa.yamaha.com/products/contents/audio_visual/musiccast/musiccast-compatiblity.html).

{% include integrations/config_flow.md %}

## Services

The `yamaha_musiccast` integration makes various custom services available.

### Service `yamaha_musiccast.join`

Group players together under a single coordinator. This will make a new group or join to an existing group.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | A single `entity_id` that will become/stay the coordinator speaker.
| `entity_id` | yes | String or list of `entity_id`s to join to the master.

### Service `yamaha_musiccast.unjoin`

Remove one or more speakers from their group of speakers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s to separate from their coordinator speaker.

### Service `yamaha_musiccast.set_sleep_timer`

Sets a timer that will turn off a speaker by tapering the volume down to 0 after a certain amount of time.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s that will have their timers set.
| `sleep_time` | no | Integer number of minutes until the speaker turns off. Possible values are 0, 30, 60, 90 or 120 minutes.

### Service `yamaha_musiccast.set_alarm`

Sets an alarm.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s.
| `enable` | yes | Enable the alarm.
| `volume` | yes | Alarm volume.
| `alarm_time` | yes | Alarm time. Example: `07:30`.
| `source` | yes | Alarm source in the form `PLAYBACKTYPE:SOURCE`. Example: `preset:netusb:2`

### Service `yamaha_musiccast.store_netusb_preset`

Store the current NetUSB state as a preset.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s.
| `preset` | no | Preset number.

### Service `yamaha_musiccast.recall_netusb_preset`

Recall a NetUSB preset.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of `entity_id`s.
| `preset` | no | Preset number.
