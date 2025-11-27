---
title: Minecraft Server
description: Instructions on how to integrate a Minecraft server into Home Assistant.
ha_release: 0.106
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elmurato'
ha_domain: minecraft_server
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
ha_quality_scale: silver
---

[Minecraft](https://www.minecraft.net/en-us) is a sandbox video game developed by Mojang Studios. Minecraft servers allow players to play the game online or via a local area network with other players. The **Minecraft Server** integration lets you retrieve information from a Minecraft server within Home Assistant. Both **Java Edition** and **Bedrock Edition** servers are supported.

## Prerequisites

- Minecraft Java Edition servers must be version 1.7 or newer, since older versions don't expose any information.
- The configuration parameter `enable-status` must be set to `true` in the server configuration file (`server.properties`).

{% include integrations/config_flow.md %}

During setup you will be prompted to enter the **address** of the server.

### Server address

The **server address** is a combination of the hostname and the port, where the port is optional. For SRV records, the port is automatically extracted. For all other cases the default port (25565 for Java Edition and 19132 for Bedrock Edition) is used, if the port is omitted. Here are some server address examples:

- **SRV record**: `hypixel.net`
- **Hostname**: `mc.hypixel.net:25565` or `mc.hypixel.net`
- **IP address**: `192.168.0.123:19132` or `192.168.0.123`

{% note %}
Default is `localhost:25565`.

Bedrock Edition servers don't support SRV records.
{% endnote %}

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

For Bedrock Edition servers following sensors are provided additionally:

- Edition: Minecraft Pocket Edition (MCPE) or Minecraft Education Edition (MCEE)
- Game mode
- Map name

{% note %}
Player names are only available on Java Edition servers. Depending on the server, the player names list may not be shown completely. Some servers and plugins limit or completely hide this list or even replace the player names with fake ones to show some custom messages there.
{% endnote %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
