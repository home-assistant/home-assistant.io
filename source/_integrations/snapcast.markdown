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
ha_integration_type: hub
ha_codeowners:
  - '@luar123'
---

The **Snapcast** {% term integration %} allows you to control [Snapcast](https://github.com/badaix/snapcast) from Home Assistant.

{% include integrations/config_flow.md %}

## Playback controls

Snapcast media player entities can expose playback controls for the player providing the currently selected Snapcast stream.

When the stream is configured with a Snapcast control plugin, such as `meta_mopidy.py` or `meta_mpd.py`, Home Assistant can provide the playback controls supported by that stream. Depending on the player, these can include play, pause, stop, next track, and previous track.

Streams without playback control support continue to provide the standard Snapcast volume, source selection, and grouping controls.

{% include integrations/actions.md %}
