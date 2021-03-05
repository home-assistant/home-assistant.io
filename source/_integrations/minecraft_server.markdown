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
---

Minecraft servers allow players to play the sandbox video game [Minecraft](https://www.minecraft.net/en-us) by [Mojang AB](https://www.mojang.com) online or via a local area network with other players. The `Minecraft Server` integration lets you retrieve information from a Minecraft server (Java or Bedrock edition) within Home Assistant.

<div class='note'>
The JAVA server must be version 1.7 or higher, since older versions don't expose any information. The Bedrock server must be 1.6.x or higer
</div>

{% include integrations/config_flow.md %}

## Binary sensors

This integration provides a binary sensor for the following information from a Minecraft server:

- Connection status

## Sensors

This integration provides sensors for the following information from a Minecraft server:

- Latency time
- Version
- Protocol version
- Number of online players (player names are available in state attributes for java only)
- Number of maximum players
- Message of the Day (MOTD)
