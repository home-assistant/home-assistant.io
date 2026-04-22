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
ha_integration_type: hub
ha_quality_scale: legacy
---

The **Russound RNET** {% term integration %} allows you to control Russound multi-zone audio systems that use the RNET protocol. Each enabled zone appears as a media player entity, allowing you to control power, volume, mute, and source selection from your Home Assistant dashboard.

## Supported devices

This integration supports Russound controllers that use the RNET protocol:

- Russound CAV6.6
- Russound CAM6.6
- Russound CAA66
- Russound CAS44
- Russound MCA-C5
- Russound MCA-C3
- Russound ACA-E5

### Connection methods

The RNET protocol uses a serial (RS-232) connection. You can connect to Home Assistant in two ways:

- **TCP**: Use a TCP-to-Serial gateway (such as an IP-to-Serial adapter or [tcp_serial_redirect](https://github.com/pyserial/pyserial/blob/master/examples/tcp_serial_redirect.py)) that bridges the serial port to a TCP socket.
- **Serial**: Connect the Russound controller directly to a serial port on the Home Assistant host.

If you are using a Russound CAA66, use a null-modem cable for the serial connection.

## Multi-controller support

Some Russound models (CAV6.6, CAM6.6, CAA66, MCA-C5, MCA-C3, ACA-E5) support daisy-chaining multiple controllers via the RNET link ports. During setup, the zone naming step shows all zones across all supported controllers for your model.

{% include integrations/config_flow.md %}

The setup consists of six steps:

1. **Transport type**: Choose between TCP or Serial connection.
2. **Connection details**: Enter the IP address and port (TCP) or serial device path (Serial).
3. **Model selection**: Select your Russound controller model. This determines the number of available zones, sources, and controllers.
4. **Number of controllers**: Enter the number of controllers in your system. This step is skipped for models that only support a single controller (CAS44).
5. **Source naming**: Enter a name for each audio source input (for example: TV, Radio, Sonos). Leave blank for unused sources.
6. **Zone naming**: Enter a descriptive name for each zone (for example, "Living Room" or "Kitchen"). Leave blank for unused zones.

## Migrating from YAML

If you previously configured this integration via YAML under `media_player: - platform: russound_rnet`, a repair issue will appear prompting you to migrate. The repair flow will guide you through selecting your model, naming sources, and naming zones. Once complete, a second repair issue will remind you to remove the deprecated YAML configuration.

## Data updates

This integration polls the Russound device every 30 seconds to retrieve the current state of all enabled zones. When a command is sent (such as turning a zone on or changing volume), the affected zone is polled immediately for fast feedback.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Known limitations

- The RNET protocol is request/response only — the device does not push state changes. There may be a short delay before changes made directly on the device (or via a physical keypad) are reflected in Home Assistant.
- The RNET protocol does not report mute state. Mute is tracked locally within Home Assistant. If mute is toggled externally (for example, via a physical keypad), Home Assistant may be out of sync until the next volume change.
- Volume range is 0–50 on the device, mapped to 0%–100% in Home Assistant.

## Troubleshooting

### Cannot connect during setup

- Verify the IP address and port of your TCP-to-Serial gateway are correct, or that your serial device path is valid.
- Ensure the gateway is powered on and connected to the Russound controller's serial port.
- The integration retries the connection up to 3 times during setup. If it still fails, check your network connectivity.

### Zones show as unavailable

- The serial connection may have dropped. The integration will automatically reconnect on the next poll cycle (within 30 seconds).
- If using an IP-to-Serial bridge, ensure it is not configured to drop idle connections too aggressively.
