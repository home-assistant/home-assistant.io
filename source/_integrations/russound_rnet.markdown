---
title: Russound RNET
description: Instructions on how to integrate Russound RNET devices into Home Assistant.
ha_category:
  - Media player
ha_release: 0.25
ha_iot_class: Local Polling
ha_domain: russound_rnet
ha_platforms:
  - media_player
ha_codeowners:
  - '@noahhusby'
ha_config_flow: true
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Russound RNET** {% term integration %} allows you to control Russound multi-zone audio systems that use the RNET protocol. Each enabled zone appears as a media player entity, allowing you to control power, volume, mute, and source selection from your Home Assistant dashboard.

## Supported devices

This integration supports Russound controllers that use the RNET protocol:

- Russound CAS44
- Russound CAA66
- Russound CAM6.6
- Russound CAV6.6

### Connection requirements

The RNET protocol uses a serial (RS-232) connection. To connect to Home Assistant, you need a TCP-to-Serial gateway (such as an IP-to-Serial adapter or [tcp_serial_redirect](https://github.com/pyserial/pyserial/blob/master/examples/tcp_serial_redirect.py)) that bridges the serial port to a TCP socket.

If you are using a Russound CAA66, use a null-modem cable for the serial connection.

## Multi-controller support

If you have multiple controllers connected via the RNET link ports, each controller adds 6 zones. For example, with 2 controllers you get zones 1–12: zones 1–6 map to controller 1, and zones 7–12 map to controller 2.

{% include integrations/config_flow.md %}

The setup consists of three steps:

1. **Connection and sources**: Enter the IP address and port of your TCP-to-Serial gateway, the number of controllers, and the names of your audio sources.
2. **Zone selection**: Select which zones to enable. Deselect any zones that are not in use.
3. **Zone naming**: Enter a descriptive name for each selected zone (for example, "Living Room" or "Kitchen").

{% configuration_basic %}
Host:
    description: The IP address or hostname of your TCP-to-Serial gateway.
Port:
    description: "The TCP port of your gateway (default: 9621)."
Controllers:
    description: "The number of Russound controllers connected (each supports 6 zones)."
Source 1–6:
    description: "Names for each audio source input (for example: TV, Radio, Sonos). Leave blank for unused sources."
{% endconfiguration_basic %}

## Configuration

After setup, you can reconfigure sources and enable or disable zones by selecting **Configure** on the integration card under {% my integrations title="**Settings** > **Devices & services**" %}.

## Data updates

This integration polls the Russound device every 30 seconds to retrieve the current state of all enabled zones. When a command is sent (such as turning a zone on or changing volume), the affected zone is polled immediately for fast feedback.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Known limitations

- The RNET protocol is request/response only — the device does not push state changes. There may be a short delay before changes made directly on the device (or via a physical keypad) are reflected in Home Assistant.
- The mute command toggles mute on/off. There is no way to explicitly set mute to a specific state.
- Volume range is 0–50 on the device, mapped to 0%–100% in Home Assistant.

## Troubleshooting

### Cannot connect during setup

- Verify the IP address and port of your TCP-to-Serial gateway are correct.
- Ensure the gateway is powered on and connected to the Russound controller's serial port.
- The integration retries the connection up to 3 times during setup. If it still fails, check your network connectivity.

### Zones show as unavailable

- The serial connection may have dropped. The integration will automatically reconnect on the next poll cycle (within 30 seconds).
- If using an IP-to-Serial bridge, ensure it is not configured to drop idle connections too aggressively.
