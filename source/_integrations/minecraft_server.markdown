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
  - '@zachdeibert'
ha_domain: minecraft_server
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

[Minecraft](https://www.minecraft.net/en-us) is a sandbox video game developed by Mojang Studios. Minecraft servers allow players to play the game online or via a local area network with other players. The **Minecraft Server** integration lets you retrieve information from a Minecraft server within Home Assistant. Both **Java Edition** and **Bedrock Edition** servers are supported.

## Use cases

- Monitor whether a Minecraft server is online and responding.
- Track player counts and server capacity.
- Check whether a server is running the latest version.
- Trigger automations when a server goes offline or when a player joins or leaves.

## Prerequisites

- Minecraft Java Edition servers must be beta version 1.8+ or release version 1.0+.
- Minecraft Java Edition servers with release version 1.16+ must set the configuration parameter `enable-status` to `true` in the server configuration file (`server.properties`).

{% include integrations/config_flow.md %}

During setup you will be prompted to select the **server edition** and to enter the **server address**.

### Server edition

The **server edition** decides which protocol has to be used to retrieve the status information from the server. Choose one of the following options:

- **Legacy Java Edition**: Java Edition version beta 1.8 through release version 1.6.4
- **Java Edition**: Java Edition release version 1.7+
- **Bedrock Edition**: All Bedrock Edition versions

{% note %}
Default is **Java Edition**.
{% endnote %}

### Server address

The **server address** is a combination of the hostname and the port, where the port is optional. For SRV records, the port is automatically extracted. For all other cases the default port (25565 for Java Edition and 19132 for Bedrock Edition) is used, if the port is omitted. Here are some server address examples:

- **SRV record**: `hypixel.net`
- **Hostname**: `mc.hypixel.net:25565` or `mc.hypixel.net`
- **IP address**: `192.168.0.123:19132` or `192.168.0.123`

{% note %}
Default is `localhost:25565`.
{% endnote %}

## Supported functionality

This integration provides the following entities.

### Binary sensors

- **Connection status**

### Sensors

- **Latency**
- **Version**
- **Protocol version**
- **Number of online players**
  - Includes the player names list in the state attributes, if available. See [Known limitations](#known-limitations).
- **Number of maximum players**
- **World Message / Message of the Day (MOTD)**

For Bedrock Edition servers, the following sensors are also provided:

- **Edition**
  - Minecraft Pocket Edition (MCPE) or Minecraft Education Edition (MCEE)
- **Game mode**
- **Map name**

## Automation examples

The easiest way to create automations is to import a ready-made blueprint and adjust it in the UI. The following examples cover common alerts and status updates for your Minecraft server.

If you want to build a custom automation instead:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Select **Create automation**.
3. Choose a trigger such as **State** or **Numeric state**.
4. Select your Minecraft server **device**.
5. Choose the relevant **entity**.
6. Add any **conditions** and the **actions** you want to run.

You can also start from a blueprint and customize it after importing it.

### Offline alert

Performs an action when your Minecraft server stays offline for a chosen duration.
Includes an editable default action that can be customized or deleted in the UI.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/minecraft_server/minecraft_server_offline_alert.yaml" %}

### Latency alert

Performs an action when the Minecraft server latency exceeds a chosen threshold for a selected duration.
Includes an editable default action that can be customized or deleted in the UI.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/minecraft_server/minecraft_server_latency_alert.yaml" %}

### Player count changed

Performs an action when the number of players online changes on your Minecraft server.
Includes an editable default action that can be customized or deleted in the UI.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/minecraft_server/minecraft_server_player_count_changed.yaml" %}

## Data updates

This integration {% term polling polls %} the configured Minecraft servers every 60 seconds to refresh their status information. If the servers cannot be reached, the relevant entities become unavailable and the connection status sensor goes off.

## Known limitations

- Player names are only available on Java Edition servers with release version 1.7.2+.

- Depending on the server, the player names list may not be shown completely. Some servers and plugins limit or completely hide this list or even replace the player names with fake ones to show some custom messages there.

- Bedrock Edition servers do not support SRV record lookups.

## Troubleshooting

### The server is unreachable

#### Symptom: “Failed to connect to server” or the connection sensor stays off

When you set up the integration, the connection check fails or the connection sensor remains off.

#### Description

This usually means the Minecraft server is not responding to status requests at all or not as expected.

#### Resolution

1. Verify the configured server edition.
2. Verify the configured hostname or IP address and port are correct.
3. If you use a hostname or SRV record, confirm that DNS resolves correctly.
4. Check firewall and port-forwarding rules if the server is on another network.
5. For Java Edition servers with release version 1.16+, confirm that the configuration parameter `enable-status` is set to `true` in the server configuration file (`server.properties`).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
