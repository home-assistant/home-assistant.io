---
title: Music Assistant
description: Instructions on how to integrate Music Assistant into Home Assistant.
ha_category:
  - Media player
ha_release: 2024.11
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@music_assistant'
ha_domain: music_assistant
ha_platforms:
  - media_player
ha_zeroconf: true
ha_integration_type: integration
---

The **Music Assistant**(MA) {% term integrations %} allows you to connect Home Assistant to a [Music Assistant Server](https://music-assistant.io/). Once configured, all [MA Players](https://music-assistant.io/player-support/) show up as Home Assistant [media player entities](/integrations/media_player/).  Media players will allow you to control media playback and see the currently playing item.

There is currently support for the following Home Assistant Platforms:

- [Media player](#media-player)

All of the Home Assistant [Media Player Control Actions](https://www.home-assistant.io/integrations/media_player/#media-control-actions) are supported.

{% include integrations/config_flow.md %}

### Manual configuration

Under normal circumstances, Home Assistant automatically discovers your running Music Assistant Server. If something special about the HA or MA setup (for example, the MA server is running as a remote Docker container) or discovery is not working, you can manually specify the URL to your Music Assistant server. 

## Media player

The Music Assistant media player creates media player entities for all players available in MA including those imported from Home Assistant. This is needed to provide the full functionality Music Assistant has to offer. These entities will display media information, playback progress, and playback controls.

## Notes

- Any Home Assistant players added to Music Assistant will appear duplicated as the MA version of the player is created. The original HA player can be hidden if desired.
