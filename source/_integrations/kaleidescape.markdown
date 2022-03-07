---
title: Kaleidescape
description: Instructions on how to integrate Kaleidescape into Home Assistant.
ha_category:
  - Media Player
ha_release: '2022.4'
ha_iot_class: Local Push
ha_config_flow: true
ha_ssdp: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: kaleidescape
ha_platforms:
  - media_player
---

The Kaleidescape integration allows for the automation of Kaleidescape movie players.

Ideas for automation include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.

## Supported Models

This integration is intended for the automation of Kaleidescape players with a movie zone. This includes all Strato and Premier players. Strato players support auto discovery in Home Assistant. Premier players must be added manually by adding an instance of this integration, and specifying the IP address of the player.

{% include integrations/config_flow.md %}

## Media Player

The Kaleidescape media player platform will create a Media Player entity for each device discovered on your network. This entity will display the currently playing media and playback controls.
