---
title: EARN-E P1 Meter
description: Monitor your smart meter's energy and gas data in real-time with the EARN-E P1 Meter integration.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.5
ha_iot_class: Local Push
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@Miggets7'
ha_domain: earn_e_p1
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
ha_dhcp: true
---

The **EARN-E P1 Meter** {% term integration %} connects to the [EARN-E energy monitor](https://earn-e.com/product/energiemonitor/), a device that reads your smart meter's P1 port and broadcasts real-time energy data via UDP on the local network. This integration listens for those broadcasts and exposes them as sensor entities.

No cloud connection or polling is needed — the device pushes data directly to Home Assistant over the local network.

## Supported devices

- [EARN-E energy monitor](https://earn-e.com/product/energiemonitor/)

## Supported functionality

The **EARN-E P1 Meter** integration provides the following entities.

### Real-time sensors (~1 second updates)

- **Power imported**: Current power being imported from the grid (kW)
- **Power exported**: Current power being exported to the grid (kW)
- **Voltage L1**: Voltage on phase 1 (V)
- **Current L1**: Current on phase 1 (A)

### Meter reading sensors (~60 second updates)

- **Energy imported tariff 1**: Total energy imported on tariff 1 (kWh)
- **Energy imported tariff 2**: Total energy imported on tariff 2 (kWh)
- **Energy exported tariff 1**: Total energy exported on tariff 1 (kWh)
- **Energy exported tariff 2**: Total energy exported on tariff 2 (kWh)
- **Gas consumed**: Total gas consumed (m³)
- **Wi-Fi RSSI**: Wi-Fi signal strength of the device (dBm)

## Prerequisites

The EARN-E energy monitor must be:

- Connected to your smart meter's P1 port
- Connected to the same local network as your Home Assistant instance
- Powered on and broadcasting UDP packets on port 16121

{% include integrations/config_flow.md %}

The EARN-E energy monitor is discovered automatically on your network using [DHCP discovery](/integrations/dhcp/). When it is detected, it appears in the **Discovered** section under **Settings** > **Devices & services**, ready to be set up with a single confirmation.

When adding the integration manually, it will automatically listen for UDP broadcasts for approximately 10 seconds. If your EARN-E device is found, you will see a confirmation screen with its IP address.

If no device is discovered (for example, if the meter is on a different subnet), you will be asked to enter the IP address manually. The integration will then listen for data from that IP address to verify connectivity.

{% configuration_basic %}
IP Address:
  description: "The local IP address of your EARN-E P1 Meter (for example, 192.168.1.100). Only required if auto-discovery does not find your device."
{% endconfiguration_basic %}

## Known limitations

- Only single-phase meters are supported (L1 voltage and current). Three-phase support depends on the EARN-E device firmware.
- The device must be on the same network subnet as Home Assistant, or UDP broadcast traffic must be routed between subnets.

## Troubleshooting

### No device discovered during setup

- Ensure the EARN-E device is powered on and connected to your network.
- Verify the device is on the same subnet as Home Assistant.
- Try entering the IP address manually instead of relying on auto-discovery.

### Sensors show as unavailable

- The device sends full meter data approximately every 60 seconds. Some sensors may take up to a minute to become available after setup.
- Check that the device is still powered on and connected to the network.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
