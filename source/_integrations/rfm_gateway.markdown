---
title: RFM Gateway
description: Instructions on how to integrate the RFM Gateway radio-to-WiFi bridge into Home Assistant.
ha_category:
  - Radio Frequency
  - Hub
ha_release: 2026.5
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Phunkafizer'
ha_domain: rfm_gateway
ha_platforms:
  - radio_frequency
ha_integration_type: hub
---

The **RFM Gateway** {% term integration %} connects an RFM Gateway device to Home Assistant and exposes it as a radio frequency transmitter.

This lets other integrations send RF commands through the gateway. The integration uses the gateway HTTP API and supports auto-discovery through Zeroconf.

## Prerequisites

Before adding the integration, make sure:

1. Your RFM Gateway is connected to your network and reachable from Home Assistant.
2. The gateway firmware provides the required HTTP API endpoints:
   - `GET /api/rf/capabilities`
   - `POST /api/rf/transmit`
3. You know the gateway hostname or IP address (if Zeroconf discovery is not used).

You can find project and firmware details on the [RFM-Gateway project page](https://www.seegel-systeme.de/2023/09/15/rfm-wifi-gateway-a-radio-to-wifi-bridge/).

{% include integrations/config_flow.md %}

## Configuration

You can set up the integration in one of these ways:

- **Automatic discovery (recommended)**: If Zeroconf is available and the device advertises itself as an RFM Gateway, Home Assistant discovers it automatically.
- **Manual setup**: Enter the gateway host or IP address during setup.

{% configuration_basic %}
Gateway host or IP:
  description: "Hostname or IP address of the RFM Gateway device."
{% endconfiguration_basic %}

During setup, Home Assistant validates connectivity and reads gateway RF capabilities.

## Supported functionality

The integration creates one **Radio Frequency Transmitter** entity per configured gateway.

This entity:

- Sends raw RF commands to the gateway.
- Exposes supported frequency ranges reported by the firmware.
- Is used by RF-based integrations that require a Radio Frequency transmitter.

For details about radio frequency entities, refer to the [Radio frequency integration](/integrations/radio_frequency/).

## Data updates

This integration does not poll RF device states.

The entity updates availability based on whether sending commands to the gateway succeeds.

## Known limitations

- The integration is transmit-focused; it does not import received RF events from the gateway into Home Assistant yet.
- Supported frequencies and modulations depend on the installed radio module.

## Troubleshooting

### Cannot connect to the gateway

If setup shows a connection error:

1. Verify that the host/IP is correct.
2. Verify that Home Assistant can reach the gateway on HTTP port `80`.
3. Open the gateway URL in a browser and confirm the API is available.

### Gateway responded with invalid data

If setup reports invalid response:

1. Check that the firmware provides valid JSON for `/api/rf/capabilities`.
2. Confirm that the response contains supported frequency ranges.

### No RF action on target device

If commands are sent but the RF device does not react:

1. Verify your target integration uses the **RFM Gateway** Radio Frequency transmitter entity.
2. Verify that the required frequency and modulation are supported by your gateway firmware.
3. Verify radio range, antenna, and target device pairing.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}