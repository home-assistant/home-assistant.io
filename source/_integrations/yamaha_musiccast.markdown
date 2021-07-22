---
title: MusicCast
description: Instructions on how to integrate Yamaha MusicCast Receivers into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.53
ha_codeowners:
  - '@vigonotion'
  - '@micha91'
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

## Grouping functionality

The Yamaha MusicCast integration implements the grouping services. There are some limitations in the MusicCast system for grouping:

- It is not possible to let mediaplayer entities of the same device (e.g., different zones) be in distinct groups.
- If a non-main zone is the master of a group, it is not possible to let other mediaplayers of the same device join this group.
