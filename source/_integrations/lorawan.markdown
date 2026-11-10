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

## Troubleshooting

{% details "A LoRaWAN device isn't added to Home Assistant" %}

### Symptom: The device is in the LoRaWAN panel, but not in Home Assistant

The device appears in the device list of the {% my config_lorawan title="**LoRaWAN** panel" %}, but Home Assistant has not added it. When you select the device, its details dialog shows a note on why it isn't added.

#### Resolution

Check the note in the details dialog:

- **The device type could not be identified.**
  - Your network server doesn't report the manufacturer and model of the device.
  - To fix this, register the device on your network server with its entry in the device catalog. For details, refer to the page of your connection integration, such as [ChirpStack](/integrations/chirpstack/) or [The Things Network](/integrations/thethingsnetwork_lorawan/).
- **Set up the device integration to add this device to Home Assistant.**
  - A device integration supports this brand, but it isn't set up.
  - To fix this, go to {% my integrations title="**Settings** > **Devices & services**" %} and set up the integration from the **Discovered** section. If you ignored the integration earlier, stop ignoring it first.
- **This device model is not supported by a configured integration.**
  - No device integration supports this brand, or the device integration for this brand is set up but doesn't support this model.
  - To check which models are supported, refer to the page of the device integration for the manufacturer, if there is one.

{% enddetails %}
