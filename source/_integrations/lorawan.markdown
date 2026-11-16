---
description: Provide support for integrating LoRaWAN devices and backends into Home Assistant.
ha_release: 2026.11
ha_domain: lorawan
---

The **LoRaWAN** {% term integration %} connects <abbr title="Long Range Wide Area Network">LoRaWAN</abbr> connection integrations with device integrations in Home Assistant. Connection integrations provide connections to your LoRaWAN networks. Device integrations use those connections to expose supported devices and their entities.

LoRaWAN is a long-range, low-power wireless protocol often used for battery-powered sensors far from your home network, such as in a garden, a shed, or a field. LoRaWAN devices send their data through gateways to a LoRaWAN network server.

## Configuration

LoRaWAN loads automatically when an integration that depends on it is set up. It requires no separate configuration.

Set up a connection integration for each LoRaWAN network server you use. When a supported device appears on one of those servers, Home Assistant shows the matching device integration in the **Discovered** section on {% my integrations title="**Settings** > **Devices & services**" %}.

## How LoRaWAN devices are handled

LoRaWAN handles the following for every device integration that uses it:

- If a server connection is lost temporarily, the devices on it become unavailable. They become available again when the connection is restored.
- If you remove a device on your LoRaWAN server, Home Assistant also removes it.
- If you delete a connection integration entry, Home Assistant removes the devices associated with that connection.
- If the same device is available through two connections, it appears as a separate device for each connection in Home Assistant. Removing one connection does not remove the device associated with the other.
