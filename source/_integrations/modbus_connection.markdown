---
title: Modbus Connection
description: Instructions on how to set up a shared Modbus connection in Home Assistant.
ha_category:
  - Hub
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/core'
ha_domain: modbus_connection
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Modbus Connection** {% term integration %} owns a single [Modbus](https://en.wikipedia.org/wiki/Modbus) connection to one physical link — a TCP endpoint or a serial device — and shares it with other integrations.

Modbus is a serial communications protocol widely used in industrial and building automation to talk to devices such as power meters, PLCs, HVAC controllers, and inverters. A physical Modbus link usually accepts only one client at a time, so it cannot be opened independently by several integrations at once.

This integration solves that by owning the connection in one place. You set up each connection once, and then point Modbus device integrations at it. This is the UI-based way to use Modbus in Home Assistant. If you prefer to register Modbus entities manually in YAML, use the [Manual Modbus](/integrations/modbus/) {% term integration %} instead.

This {% term integration %} does not create any entities of its own. It only provides the shared connection that device integrations consume.

## Prerequisites

You need one of the following ways to reach your Modbus network:

- For a *network* connection: a Modbus TCP gateway or a device that speaks Modbus TCP (or RTU-over-TCP), reachable by hostname or IP address on your network.
- For a *serial* connection: a serial (RTU) device connected to the machine running Home Assistant, for example a USB-to-RS485 adapter appearing as `/dev/ttyUSB0`. A network serial proxy is also supported and appears in the serial device list.

{% include integrations/config_flow.md %}

When you add the integration, you first choose how the Modbus network is connected:

- **Modbus TCP**: for Modbus TCP and RTU-over-TCP connections.
- **Serial (including serial proxies and networked connections)**: for Modbus RTU connections over a serial port.

### Modbus TCP

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the Modbus gateway or device."
Port:
  description: "The TCP port the Modbus gateway listens on (default 502)."
{% endconfiguration_basic %}

### Serial

{% configuration_basic %}
Device:
  description: "The serial port the Modbus device is connected to, for example `/dev/ttyUSB0`. Local serial ports and network serial proxies are listed."
Baud rate:
  description: "The serial baud rate the device communicates at (default 9600)."
Parity:
  description: "The serial parity: None, Even, or Odd (default None)."
Stop bits:
  description: "The number of stop bits: 1 or 2 (default 1)."
Byte size:
  description: "The number of data bits: 7 or 8 (default 8)."
{% endconfiguration_basic %}

You can add the integration more than once to set up several connections, for example one per gateway or serial port. Home Assistant blocks duplicate connections, so you cannot set up the same endpoint twice.

## Using the connection

After you set up a connection, add a Modbus device integration and point it at this connection. Each device integration borrows the shared connection instead of opening its own, which lets multiple devices on the same link coexist without conflicting over it.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Before removing a Modbus connection, remove any device integrations that depend on it. Otherwise, those integrations lose their connection and stop working.
