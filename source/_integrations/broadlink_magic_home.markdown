---
title: Broadlink Magic Home
description: Instructions on how to integrate a BroadLink Magic Home family with Home Assistant over the local network.
ha_categories:
  - hubs_protocols
ha_release: "2026.12"
ha_iot_class: Local Push
ha_codeowners:
  - '@1045925514'
ha_domain: broadlink_magic_home
ha_config_flow: true
ha_integration_type: hub
ha_platforms:
  - climate
ha_quality_scale: bronze
---

The **Broadlink Magic Home** {% term integration %} connects Home Assistant to a BroadLink Magic Home family through a Magic Home gateway, such as the `RM MAX` universal remote. Instead of adding devices one by one, you import the whole family from the BroadLink Magic Home app. The gateway then connects to Home Assistant on the local network, and all control and state updates stay local.

This integration is for Magic Home families. Other Broadlink devices, such as the `RM4 pro` or the `SP4` smart plug, use the [Broadlink](/integrations/broadlink/) integration. The Magic Home integration from another manufacturer is [Magic Home](/integrations/flux_led/).

## Use cases

- Controlling the air conditioners and floor heating of a Magic Home family from Home Assistant dashboards and automations, without a cloud connection. For example, turn on the bedroom air conditioner before you get home.
- Keeping the rooms of the family. Home Assistant creates an area for each room of the family and places the devices in it.

## Supported devices

- **Gateways**: `RM MAX` (sold as Universal Remote).
- **Air conditioners**: air conditioners of the family, including infrared air conditioners learned on the `RM MAX` gateway.
- **Three-in-one thermostat panels**: the air conditioner and the floor heating of the panel.

A family may contain several gateways. Commands are sent to every online gateway of the family.

## Unsupported devices

- The fresh air of three-in-one thermostat panels.
- Other devices of the family, such as lights, switch panels, curtains, and other RM child devices.

## Prerequisites

- BroadLink Magic Home app for iOS 5.3.2 (14) or newer. Earlier versions cannot upload a family to Home Assistant.
- The phone can reach the Home Assistant URL in the QR code. After scanning, the app uploads the family directly to this URL, for example `http://192.168.1.10:8123`. Home Assistant uses its local URL when one is available, and its external URL otherwise. The dialog shows the URL, so check it before scanning. To keep the upload on the local network, set a local URL under **Settings** > **System** > **Network** and connect the phone to the same local network.
- UDP port 12346 is open on the Home Assistant host. The gateway connects to Home Assistant on this port. If the host or the network has a firewall, allow inbound UDP 12346. No other application may use this port.
- The gateway can reach the Home Assistant host. If the gateway and Home Assistant are on different subnets or VLANs, make sure traffic is routed between them.
- The gateway is added to the Magic Home app and shows as online.
- Gateway Wi-Fi firmware 62341 or newer, which is required for device state reports.

Setting up a family has two parts, and both are required:

1. Import the family: scan the QR code shown by Home Assistant with the Magic Home app, then confirm the import in Home Assistant.
2. Connect the gateway to Home Assistant: in the Magic Home app, set the gateway's third-party connection to **As client** with the Home Assistant IP address and port 12346.

Some Magic Home app screenshots below show the Chinese interface. The menu labels in the steps are the English ones.

{% include integrations/config_flow.md %}

In the list of integrations, **Broadlink Magic Home** is grouped under the **Broadlink** brand. Search for **Broadlink**, select it, and then select **Broadlink Magic Home**.

The integration has no settings to enter. Adding it shows the **Import a Magic Home family** dialog with a QR code. Keep this dialog open.

The QR code contains a one-time identifier. It expires after three minutes and cannot be reused after a successful upload. If it expires, select **Submit** to get a new code.

### Scan the QR code with the Magic Home app

1. Make sure the phone is connected to a Wi-Fi network on the same local network as Home Assistant.
2. In the Magic Home app, tap **+** in the upper-right corner of the home page.

   ![Magic Home app home page](/images/integrations/broadlink_magic_home/app_01_home.png)

3. Select **Scan**.

   ![Scan menu entry](/images/integrations/broadlink_magic_home/app_02_scan_menu.png)

4. Scan the QR code shown in the Home Assistant dialog.

   ![Scanning the Home Assistant QR code](/images/integrations/broadlink_magic_home/app_03_scan_qr.jpg)

5. After the app reports a successful upload, return to Home Assistant. The dialog moves on to **Confirm Magic Home family** by itself. If it still shows the QR code, select **Submit**.
6. Check the family name and the number of gateways and devices, then select **Submit**. Home Assistant creates the family, or updates it if the family was imported before.

The family is not imported until you submit the confirmation in Home Assistant. Scanning alone is not enough.

### Connect the gateway to Home Assistant

1. On the app home page, tap the gateway.
2. Tap the menu button in the upper-right corner and select **Device details**.

   ![Gateway menu](/images/integrations/broadlink_magic_home/app_04_gateway_menu.jpg)

3. Select **Connect to 3rd-party**.

   ![Device details](/images/integrations/broadlink_magic_home/app_05_device_details.jpg)

4. Select **As client**. Leave **As server** not set.

   ![Connect to 3rd-party](/images/integrations/broadlink_magic_home/app_06_connect_third_party.png)

5. Enter the connection settings:
   - **Port number**: `12346`
   - **IP address**: the local IPv4 address of the Home Assistant host

   ![As client settings](/images/integrations/broadlink_magic_home/app_07_client.png)

6. Tap **Save** in the upper-right corner. The app sends the settings to the gateway, so keep the phone close to the gateway while saving.

After saving, the **As client** row shows the Home Assistant address and port, for example `192.168.1.10:12346`. The gateway then connects to Home Assistant. Home Assistant matches the gateway to the imported family by its MAC address, creates areas for the rooms, and makes the devices available.

### Reimport a family

Import the family again after adding, changing, or removing devices in the app. Add the integration again, scan the new QR code, and confirm the import. Home Assistant identifies the family by its family ID, updates the existing entry, and removes entities of devices that no longer exist. Each QR code can be used only once. If several imports of the same family are open, the first one you confirm is used and Home Assistant closes the others.

A gateway can belong to only one imported family. To move a gateway to another family, remove it from the first family in the app and reimport that family first.

The gateway client settings are kept, so you usually do not need to configure the gateway again. If devices cannot be controlled after a reimport, refer to [Devices cannot be controlled after reimporting a family](#devices-cannot-be-controlled-after-reimporting-a-family).

## Supported functionality

The family is a device in Home Assistant. Its gateways and devices are grouped under it.

### Air conditioners

Each air conditioner is a climate entity with on and off, auto, cool, heat, fan, and dry modes, a target temperature from 16 to 30 °C in 1 °C steps, and auto, low, medium, and high fan speed. The state is reported by the gateway. For an infrared air conditioner learned on the `RM MAX`, the gateway only knows the commands it sent, so changes made with the original remote control are not shown.

### Floor heating

The floor heating of a three-in-one thermostat panel is a separate climate entity named **Floor heating**, with on and off and a target temperature in 1 °C steps. It belongs to the same device as the air conditioner of the panel. The state is reported by the panel.

After a command, Home Assistant shows the requested state right away. A device report that still carries the old value is ignored for up to 30 seconds, until the device confirms the change.

## Data updates

The gateway pushes device state to Home Assistant as soon as it changes. Home Assistant also asks for the state of a device after sending it a command.

The gateway connects to Home Assistant on UDP port 12346. Home Assistant never connects to the gateway, so you do not need to enter the gateway IP address or open any port on the gateway.

- The gateway sends periodic heartbeats. Home Assistant identifies it by MAC address and follows changes of its IP address and source port.
- A gateway is offline after 180 seconds without any message. Devices are unavailable while all gateways of the family are offline, and recover when a gateway sends a heartbeat again.
- After Home Assistant restarts, the gateway reconnects with its next heartbeat.

For routed networks, allow UDP traffic in both directions between the gateway network and Home Assistant.

{% important %}
Use Magic Home gateways only on a trusted local network. The gateway protocol does not authenticate the gateway, so a device on the same network that knows the gateway's MAC address could pretend to be the gateway. Do not expose UDP port 12346 to the internet or to untrusted networks such as a guest Wi-Fi.
{% endimportant %}

## Data and privacy

The Magic Home app uploads the family data directly to Home Assistant. Home Assistant only stores the fields required for local control, and control and state updates stay on the local network.

## Troubleshooting

### Broadlink Magic Home is not in the list of integrations

The integration is listed under the **Broadlink** brand. Search for **Broadlink**, select it, and then select **Broadlink Magic Home**. If selecting **Broadlink** opens the Broadlink setup directly, refresh the browser page and try again.

### The app shows "invalid or expired import session"

The QR code expired after three minutes or was already used. Close the Home Assistant dialog, add the integration again, and scan the new QR code.

### The app reports an upload failure, or Home Assistant keeps waiting

- Update the Magic Home app. iOS requires version 5.3.2 (14) or newer.
- Connect the phone to a Wi-Fi network on the same local network as Home Assistant.
- Make sure the phone can open the Home Assistant URL in the QR code.
- Generate a new QR code if the previous one expired.
- Check whether a reverse proxy blocks the family import request.

### The family is imported, but the gateway is unavailable

- Make sure the gateway's client IP address is the local IPv4 address of the Home Assistant host, and that the port is `12346`.
- Allow inbound UDP 12346 in the host and network firewall.
- Check the routing if Home Assistant and the gateway are on different subnets.

### Saving the client settings on the gateway fails

The phone is too far from the gateway. Move closer to the gateway and save again.

### Devices cannot be controlled after reimporting a family

In the Magic Home app, open the gateway's **Device details** > **Connect to 3rd-party** > **As client** page and save the settings again, as in [Connect the gateway to Home Assistant](#connect-the-gateway-to-home-assistant). Keep the same IP address and port, and keep the phone close to the gateway. The devices can be controlled again once the gateway reconnects.

### Control works, but the state does not update

- Make sure the gateway Wi-Fi firmware is version 62341 or newer.
- Wait for the status query or the next device report.

### Devices are missing after a change in the app

Reimport the family. The import is a full snapshot of the family and updates the existing entry.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, open the gateway's **Connect to 3rd-party** page in the Magic Home app and tap **Clear**. The gateway stops connecting to Home Assistant.
