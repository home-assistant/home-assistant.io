---
title: HiFiBerry
description: Instructions on how to integrate HiFiBerry OS players with Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 2026.8
ha_config_flow: true
ha_codeowners:
  - '@willholdoway'
ha_domain: hifiberry
ha_zeroconf: true
ha_platforms:
  - media_player
---

The HiFiBerry integration allows you to control a
[HiFiBerry OS](https://www.hifiberry.com/hifiberryos/) player from Home
Assistant.

HiFiBerry OS, also called HBOS NG, is accessed locally through its AudioControl
REST API. Home Assistant can show the active player state, source, media
metadata, album artwork, and hardware volume.

{% include integrations/config_flow.md %}

## Supported functionality

The integration exposes a single media player entity for each configured
HiFiBerry OS device.

Supported functionality includes:

- Playback state.
- Active source.
- Title, artist, album, and album artwork.
- Volume level.
- Play, pause, stop, and play/pause controls.
- Next and previous track controls when supported by the active source.

Controls are source-specific. For example, Spotify Connect and MPD may expose
next and previous controls, while AirPlay/Shairport may only expose play,
pause, stop, metadata, and artwork.

## Configuration

During setup, enter the hostname or IP address of the HiFiBerry OS device.

For current HiFiBerry OS versions, use port `80`. The default hostname is
usually:

```text
hifiberry.local
```

## Migration from older HiFiBerry OS versions

Older HiFiBerry integrations used the legacy Socket.IO API on port `81` and an
API token.

Current HiFiBerry OS uses the local REST API through the web interface, so no
API token is required. Existing entries using port `81` are migrated to port
`80`, and the old API token is ignored.

## Album artwork

HiFiBerry OS does not always include an artwork URL in the now-playing response.
When needed, Home Assistant performs the same separate cover art lookup used by
the HiFiBerry web interface.
