---
title: Minecraft Server
description: Instructions on how to integrate a Minecraft server into Home Assistant.
ha_release: 0.106
ha_category:
  - Binary Sensor
  - Sensor
ha_iot_class: Local Polling
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@elmurato'
ha_domain: minecraft_server
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

Minecraft servers allow players to play the sandbox video game [Minecraft](https://www.minecraft.net/en-us) by Mojang Studios online or via a local area network with other players. The `Minecraft Server` integration lets you retrieve information from a Minecraft server within Home Assistant.

<div class='note'>
Minecraft Java edition servers must be version 1.7 or newer, since older versions don't expose any information.
</div>

<div class='note'>
Minecraft Bedrock edition servers are not supported yet.
</div>

{% include integrations/config_flow.md %}

## Binary sensors

This integration provides a binary sensor for the following information from a Minecraft server:

- Connection status

## Sensors

This integration provides sensors for the following information from a Minecraft server:

- Latency
- Version
- Protocol version
- Number of online players
  - Including player names list in the state attributes, if available (see note below).
- Number of maximum players
- World Message / Message of the Day (MOTD)

<div class='note'>
Depending on the server, the player names list may not be shown completely. Some servers and plugins limit or completely hide this list or even replace the player names with fake ones to show some custom messages there.
</div>
