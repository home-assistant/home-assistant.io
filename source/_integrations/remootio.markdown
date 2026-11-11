---
title: Remootio
description: Instructions on how to integrate Remootio garage door and gate controllers with Home Assistant.
ha_category:
  - Cover
ha_release: 2026.10
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@remootio'
ha_domain: remootio
ha_platforms:
  - cover
ha_integration_type: device
ha_quality_scale: bronze
---

The **Remootio** {% term integration %} is used to integrate [Remootio](https://www.remootio.com) garage door and gate controllers with Home Assistant. Remootio devices are Wi-Fi and Bluetooth enabled access controllers that attach to an existing door or gate opener.

Home Assistant talks to the device on your local network over the WebSocket API. The device pushes state changes as they happen. No cloud account is required.

## Supported devices

- Remootio 2
- Remootio 3

The WebSocket API must be enabled in the Remootio app before the device can be added to Home Assistant.

## Prerequisites

1. Install the Remootio app and add your device.
2. Enable the WebSocket API in the Remootio app:
   1. Open the device.
   2. In the bottom-right corner, select the settings icon.
   3. Scroll down and select **WebSocket API**.
   4. Select **Enable WebSocket API**, then **Enable WebSocket API with logging**.
   5. Select **Copy API Keys** to copy the IP address, **API Secret Key**, and **API Auth Key**.
3. Give the device a <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> reservation (or a static IP) so the IP address does not change.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the Remootio on your local network.
API secret key:
  description: The 64-character hex API Secret Key from the Remootio app.
API auth key:
  description: The 64-character hex API Auth Key from the Remootio app.
{% endconfiguration_basic %}

You can add more than one Remootio. Repeat the setup for each device.

To change the IP address later, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the Remootio {% term integration %}, and select **Reconfigure**.

Disabling and then re-enabling the WebSocket API on the device creates a new **API Secret Key** and **API Auth Key**. The keys stored in Home Assistant stop working. In the Remootio app, open **WebSocket API**, copy the new keys, and enter them in Home Assistant when it asks you to reauthenticate. You can also update them from {% my integrations title="**Settings** > **Devices & services**" %} with **Reconfigure**.

## Supported functionality

### Entities

The **Remootio** {% term integration %} provides the following entities.

#### Covers

- **Garage door**
  - **Description**: One garage or gate {% term cover %} per device. You can **Open** and **Close** it. With a status sensor it reports **Open** or **Closed**. Without a sensor it stays **Unknown**.
  - **Device class**: Garage
  - **Remarks**: **Open** and **Close** always send a command. Directional wiring uses separate open and close outputs. Impulse wiring without a sensor pulses the same output for both. See **Status sensor** below.

## Status sensor

Remootio can report whether the door or gate is open or closed if a status sensor is installed and enabled in the Remootio app. See [How to install Remootio's status sensor](https://www.remootio.com/blogs/tutorials/how-to-install-remootios-status-sensor).

- **With a status sensor**: The {% term cover %} {% term entity %} shows **Open** or **Closed** and updates when the door moves, including when it is operated from the Remootio app, a remote, or a wall button.
- **Without a status sensor**: Home Assistant cannot read the door position. The {% term cover %} {% term entity %} stays **Unknown**. What **Open** and **Close** do then depends on how Remootio is wired to the opener. See [Remootio output settings](https://www.remootio.com/blogs/tutorials/remootio-output-settings).
  - **Separate Open / Close wiring configuration** (one output to open, one output to close): **Open** and **Close** still send separate open and close commands.
  - **Impulse wiring** (a single pulse to toggle the opener): the device cannot run a directional open or close without a sensor. Home Assistant sends a pulse instead, so **Open** and **Close** both trigger the same output.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, open the Remootio app, go to **WebSocket API**, and select **Disable WebSocket API**. That turns off local API access on the device.
