---
title: INELNET Blinds
description: Control INELNET blind controllers via their REST API from Home Assistant.
ha_category:
  - Button
  - Cover
ha_iot_class: Local Polling
ha_release: "2026.3"
ha_codeowners:
  - '@Hadatko'
ha_domain: inelnet
ha_config_flow: true
ha_platforms:
  - button
  - cover
ha_integration_type: integration
related:
  - url: https://github.com/Hadatko/inelnet_ha
    title: INELNET Home Assistant setup guide
---

The **INELNET Blinds** {% term integration %} lets you control INELNET blind controllers from Home Assistant. The controller is accessed over your local network via its REST API. The integration creates one device per channel; each channel has a cover entity (open, close, stop) and optional button entities for short moves and programming.

Use case: You can open and close blinds from the dashboard, use them in automations and scenes, and trigger short moves or programming mode (for pairing remotes) via device actions or the optional button entities.

## Supported devices

The integration works with INELNET blind controllers that expose the HTTP interface at `http://<host>/msg.htm` and accept the `send_ch` and `send_act` parameters. Compatible hardware is typically sold under the INELNET brand or compatible OEM controllers that use the same protocol.

## Prerequisites

- The INELNET controller must be powered on and reachable on your local network (same subnet or routable).
- You need the controller’s IP address or hostname. You can find it in your router’s client list or via the device’s own configuration.
- The controller exposes an HTTP (unencrypted) interface only; HTTPS is not supported by the device.

{% include integrations/config_flow.md %}

### Configuration parameters

During setup you enter the following:

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the INELNET controller on your network (for example, `192.168.1.67`)."
Channels:
  description: "The channel numbers to control, as a comma-separated list. Each value must be between 1 and 16 (for example, `1` or `1,2,3`). One device is created per channel, each with a cover and optional buttons."
{% endconfiguration_basic %}

After setup, one device is created per channel. Each device has one cover entity and, when enabled, three button entities (short move up, short move down, programming mode).

## Supported functionality

The INELNET Blinds integration provides the following entities per channel.

### Covers

- **Blind channel N** (one per configured channel)
  - **Description**: Opens (rolls up), closes (rolls down), and stops the blind on that channel.
  - **Features**: Open, close, stop. Position is not reported; the device does not send state feedback, so the cover entity’s open/closed state is unknown.

### Buttons

The following buttons are created per channel but are **disabled by default**. You can enable them per entity in **Settings** > **Devices & services** > your INELNET device > **Entities**.

- **Short move up**
  - **Description**: Sends a short “up” pulse to the channel.
- **Short move down**
  - **Description**: Sends a short “down” pulse to the channel.
- **Programming mode (pair remote)**
  - **Description**: Puts the channel into programming mode so you can pair a remote. Use according to your hardware manual.

## Actions

You can use INELNET devices in automations and scripts via device actions (no need to enable the button entities). Available actions:

- **Short move up** – same as the “Short move up” button.
- **Short move down** – same as the “Short move down” button.
- **Programming mode (pair remote)** – same as the “Programming mode” button.

To use them: create an automation or script, choose **Perform action**, then **Device**, select the INELNET blind device, and pick the desired action.

## Data updates

The integration does not poll for state. It only sends commands when you open, close, stop, or press a button. The controller does not report position or open/closed state, so cover position stays unknown.

## Known limitations

- **HTTP only**: The controller provides only an unencrypted HTTP interface; HTTPS is not supported. Communication is over your local network.
- **No position feedback**: The controller does not report blind position. The cover entity’s state (open/closed) is always unknown; you can still use open, close, and stop.
- **One channel per device**: Each channel is a separate device. There is no group or “all channels” entity; control is per channel only.

## Troubleshooting

### Invalid IP address or hostname

Make sure **Host** is a valid IPv4 address (for example, 192.168.1.67) or a valid hostname. Check for typos and that the controller is on the same network.

### Invalid channels

**Channels** must be a comma-separated list of numbers from 1 to 16, with no duplicates (for example, `1`, `1,2,3`). Spaces around numbers are allowed.

### Commands have no effect

- Confirm the controller is powered and reachable (for example, ping the host from your Home Assistant host).
- Check that no firewall is blocking HTTP to the controller’s IP and port (usually 80).
- Verify the correct channels for your hardware (see the controller’s documentation or labeling).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, no further steps are required on the controller.
