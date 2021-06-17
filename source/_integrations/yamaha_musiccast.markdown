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

The Yamaha MusicCast integration allows you to control [Yamaha MusicCast Receivers](https://usa.yamaha.com/products/audio_visual/musiccast/index.html) from Home Assistant.

Supported devices are listed on their [site](https://usa.yamaha.com/products/contents/audio_visual/musiccast/musiccast-compatiblity.html).

{% include integrations/config_flow.md %}
## Services

The `yamaha_musiccast` integration makes various custom services available.

### Service `yamaha_musiccast.join`

Group players together under a single coordinator. This will make a new group or join to an existing group. Works with the [mini-media-player](https://github.com/kalkih/mini-media-player).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `master` | no | A single `entity_id` that will become/stay the coordinator speaker.
| `entity_id` | no | String or list of `entity_id`s to join to the master.

#### Limitations 
* It is not possible to let mediaplayer entities of the same device (e.g. different zones) be in different groups
* If a non main zone is the master of a group, it is not possible to let other mediaplayers of the same device join their group

### Service `yamaha_musiccast.unjoin`

Remove one or more speakers from their group of speakers. Works with the [mini-media-player](https://github.com/kalkih/mini-media-player).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of `entity_id`s to separate from their coordinator speaker.
