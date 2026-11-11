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

## Viewing your LoRaWAN connections and devices

The **LoRaWAN** panel under {% my config_lorawan title="**Settings** > **Connectivity** > **LoRaWAN**" %} shows your LoRaWAN connections and every device in the applications that you selected for them, including devices that Home Assistant hasn't added. Use it to find devices with a weak signal or a low battery, and to see why a device isn't added. A connection that is disconnected doesn't appear in the panel, and neither do its devices, until it connects again.

Prerequisites:

- You have administrator rights.
- You have set up a connection integration, such as [ChirpStack](/integrations/chirpstack/) or [The Things Network](/integrations/thethingsnetwork_lorawan/). Otherwise, **LoRaWAN** doesn't appear under **Connectivity**.

### Viewing your devices

The [device list](#device-list) shows information of every device on your connected LoRaWAN network servers, including devices that Home Assistant hasn't added. Use it to check when each device last sent a message, how strong its signal is, and how much battery it has left.

1. Go to {% my config_lorawan title="**Settings** > **Connectivity** > **LoRaWAN**" %}.
2. Under **My network**, select the number of devices, for example, **12 devices**.
   - The devices are grouped by connection. For what the list shows, refer to [Device list](#device-list).
3. Optional: To show only the devices of one connection, select **Filters**, and under **Connection**, select the connection.
4. Optional: To find devices with a weak signal or a low battery, sort the list by **RSSI** or **Battery**.
   - For more ways to search, sort, or group the list, refer to [Working with tables](/docs/organizing/tables/).
5. To see the details of a device, select its row in the device list.
   - If Home Assistant has added the device, its device page opens. Under **Device info**, expand **LoRaWAN info**.
   - If Home Assistant hasn't added the device, a dialog opens with its details and a note on why it isn't added.

### Viewing your connections

The connection list shows your connection integrations that are connected right now, with the number of devices on each. Use it to check that all your LoRaWAN network servers are connected. A connection that is missing from the list is disconnected.

1. Go to {% my config_lorawan title="**Settings** > **Connectivity** > **LoRaWAN**" %}.
2. Under **My network**, select the number of connections, for example, **2 connections**.
   - Each connection shows how many devices it has.
3. To list the devices of a connection, select the connection.

### Viewing the network map

The network map shows how your devices reach Home Assistant: from each device, through the gateways that received its last message, to the connection. Use it to see which gateways a device depends on.

A dashed line means that Home Assistant has no gateway information for the device. For example, it hasn't received a message from the device yet, or the network server doesn't report which gateway received it.

1. Go to {% my config_lorawan title="**Settings** > **Connectivity** > **LoRaWAN**" %}.
2. Under **My network**, select **Show map**.
   - The map shows which gateways received the last message of each device.

### Device list

For each device, the list shows:

- **Device**: The name of the device, with its manufacturer and model below it. If the manufacturer and model are unknown, you see the <abbr title="Device Extended Unique Identifier">DevEUI</abbr> of the device instead. If Home Assistant has added the device, the icon of its device integration is shown next to it.
- **Connection**: The connection that the device uses. Select it to go to the settings of that connection integration.
- **Last uplink**: When Home Assistant last received a message from the device.
- **<abbr title="Received Signal Strength Indicator">RSSI</abbr>**: The signal strength of that message, at the gateway that received it best.
- **Battery**: The battery level that the device last reported. A plug {% icon "mdi:power-plug" %} means that the device uses external power.

## Adding a LoRaWAN device

You add LoRaWAN devices on your LoRaWAN network server, in its management console. This is the website of the server, such as the ChirpStack web interface or The Things Network Console. The **LoRaWAN** panel links to it.

1. Go to {% my config_lorawan title="**Settings** > **Connectivity** > **LoRaWAN**" %} and select **Add device**.
2. Under **Choose a connection**, select the connection for the device.
3. Select **Open management console**, and add the device there.
   - If the connection doesn't provide a link, for example for a self-hosted The Things Stack server, the dialog says so. Open the website of your network server yourself.

When the device appears on your network server, Home Assistant checks whether a device integration supports it. The device must be in one of the applications that you selected for the connection.

- If the device integration isn't set up yet, Home Assistant shows it in the **Discovered** section on {% my integrations title="**Settings** > **Devices & services**" %}. Set it up from there.
- If the device integration is already set up, it adds the device automatically.

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
