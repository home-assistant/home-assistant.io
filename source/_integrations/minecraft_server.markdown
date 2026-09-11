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

During setup you will be prompted to select the **edition** and to enter the **address** of the server.

### Server edition

The **server edition** decides which protocol has to be used to retrieve the status information from the server. Choose one of the following options:

- **Legacy Java Edition**: Java Edition version beta 1.8 till release version 1.6.4
- **Java Edition**: Java Edition version 1.7+
- **Bedrock Edition**: All Bedrock Edition versions

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

## Automation Examples

The simplest way to create automations is to use the Home Assistant automation editor. For example, to set an automation triggered by an entity state change:

1. In the Triggers section of the automation, click on `Add trigger`
2. Search the `Device` representing your Minecraft server.
3. Select one of its entities.
4. Select `State changed`.
5. Set any conditions and actions to complete your automation.

The following examples show how to use the integration in automations with YAML. Don't forget to replace the entity and device IDs used in these examples with your real ones.

{% include docs/paste_yaml_tip.md %}

### Notify when the server goes offline

```yaml
automation:
  - alias: "Notify when the Minecraft server is offline"
    triggers:
      - trigger: state
        entity_id: binary_sensor.minecraft_server_connection
        to: "off"
        for:
          minutes: 5
    actions:
      - action: notify.send_message
        target:
          device_id: 0123456789
        data:
          title: "Minecraft server offline alert"
          message: "The Minecraft server is no longer responding."
```

### Notify when latency is too high

```yaml
automation:
  - alias: "Notify when the Minecraft server latency is too high"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.minecraft_server_latency
        above: 200
        for:
          seconds: 10
    actions:
      - action: notify.send_message
        target:
          device_id: 0123456789
        data:
          title: "Minecraft server latency alert"
          message: "The Minecraft server latency is too high."
```

### Notify when someone leaves or joins the server

```yaml
automation:
  - alias: "Notify when someone leaves or joins the Minecraft server"
    triggers:
      - trigger: state
        entity_id: sensor.minecraft_server_players_online
    actions:
      - action: notify.send_message
        target:
          device_id: 0123456789
        data:
          title: "Minecraft server update"
          message: >-
            Someone left or joined the server.
            Players online: {{ states('sensor.minecraft_server_players_online') }}
            Current players: {{ state_attr('sensor.minecraft_server_players_online', 'players_list') | join(', ') }}
```

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
