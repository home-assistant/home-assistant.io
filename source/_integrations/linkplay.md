---
title: LinkPlay
description: Connect and control your LinkPlay media players using the LinkPlay integration
ha_category:
  - Media player
ha_domain: linkplay
ha_zeroconf: true
ha_integration_type: integration
ha_release: 2024.8
ha_codeowners:
  - '@Velleman'
ha_config_flow: true
ha_platforms:
  - media_player
ha_iot_class: Local Polling
ha_dhcp: true
---

The LinkPlay {% term integrations %} for Home Assistant allows you to control various media players based on the LinkPlay protocol. The integration supports auto-discovery on your local network through [Zeroconf](/integrations/zeroconf).

{% include integrations/supported_brand.md %}

## Actions

The Linkplay integration makes various custom actions available in addition to the [standard media player actions](/integrations/media_player/#actions).

### Action `linkplay.play_preset`

Play a preset on a Linkplay media player. 

{% note %}
Companion apps, like 4stream for example, allow to save music presets (for example Spotify playlists). This action can be used to start playing these presets. 
{% endnote %}

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | The speakers to target. To target all Linkplay devices, use `all`.
| `preset_number` | no | The number of the preset to play.

