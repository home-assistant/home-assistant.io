---
title: Music Player Daemon (MPD)
description: Instructions on how to integrate Music Player Daemon into Home Assistant.
ha_category:
  - Media player
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: mpd
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The Music Player Daemon {% term integration %} allows you to control a [Music Player Daemon](https://www.musicpd.org/) from Home Assistant. Unfortunately, it does not allow you to manipulate the playlist (add or delete songs) or add transitions between the songs.

Even though no playlist manipulation is possible, it is possible to use the `play_media` action to load an existing saved playlist as part of an automation or scene.

{% include integrations/config_flow.md %}

Example script to load a saved playlist called "DeckMusic" and set the volume:

```yaml
relaxdeck:
    sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.main
      data:
        media_content_type: playlist
        media_content_id: DeckMusic

    - action: media_player.volume_set
      target:
        entity_id: media_player.main
      data:
        volume_level: 0.60
```

This platform works with [Music Player Daemon](https://www.musicpd.org/) and [mopidy](https://www.mopidy.com/) with [Mopidy-MPD](https://mopidy.com/ext/mpd/) as used by [Pi MusicBox](https://pimusicbox.github.io/). While all of these rely on the common MPD protocol, not all implementations support all features, especially with regard to album artwork, embedded artwork and volume control. The platform will fall back gracefully if support isn't detected.
