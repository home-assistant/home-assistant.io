---
title: FiveM
description: Instructions on how to integrate a FiveM server into Home Assistant.
ha_release: 2022.3
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Sander0542'
ha_domain: fivem
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

FiveM allows players to play the game [Grand Theft Auto V](https://www.rockstargames.com/V) by [Rockstar Games](https://www.rockstargames.com) online with other players. FiveM adds support for custom resources. The FiveM integration lets you retrieve information from a FiveM server within Home Assistant.

{% include integrations/config_flow.md %}

## Binary sensors

This integration provides a binary sensor for the following information from a FiveM server:

- Connection status

## Sensors

This integration provides sensors for the following information from a FiveM server:

- Number of online players (player names are available in state attributes)
- Number of maximum players
- Number of resources (resource names are available in state attributes)
