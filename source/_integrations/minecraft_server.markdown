---
title: Minecraft Server
description: Instructions on how to integrate a Minecraft server into Home Assistant.
logo: minecraft.png
ha_release: 0.106
ha_category: Sensor
ha_iot_class: Local Polling
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@elmurato'
---

Minecraft servers allow players to play the sandbox video game [Minecraft](https://www.minecraft.net) by [Mojang AB](https://www.mojang.com) online or via a local area network with other players. The `Minecraft Server` integration allows you to monitor a Minecraft server (Java edition) from within Home Assistant.

<div class='note'>
The server must be version 1.7 or higher, since older versions don't expose any information.
</div>

## Configuration via the frontend

In the settings go to `Integrations`, click on the `+` sign to add an integration and click on **Minecraft Server**.
After completing the configuration flow, the Minecraft Server integration will be available.

## Sensors

This integration provides sensors for the following information from a Minecraft server:

- Status
- Latency Time
- Description
- Version
- Protocol version
- Number of online players
- Number of maximum players
- List of online player names

<div class='note'>
The server description and the list of online players might get truncated, if they are too long.
</div>
