---
description: Monitor your smart meter's energy and gas data in real-time with the EARN-E P1 Meter integration.
ha_release: 2026.5
ha_domain: earn_e_p1
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
- **Voltage phase 1**: Voltage on phase 1 (V)
- **Voltage phase 2**: Voltage on phase 2 (V)
- **Voltage phase 3**: Voltage on phase 3 (V)
- **Current phase 1**: Current on phase 1 (A)
- **Current phase 2**: Current on phase 2 (A)
- **Current phase 3**: Current on phase 3 (A)

### Meter reading sensors (~60 second updates)

- **Energy imported tariff 1**: Total energy imported on tariff 1 (kWh)
- **Energy imported tariff 2**: Total energy imported on tariff 2 (kWh)
- **Energy exported tariff 1**: Total energy exported on tariff 1 (kWh)
- **Energy exported tariff 2**: Total energy exported on tariff 2 (kWh)
- **Gas consumed**: Total gas consumed (m³)
- **Wi-Fi RSSI**: Wi-Fi signal strength of the device (dBm)

Home Assistant only creates entities for the values your meter broadcasts. If you have a single-phase meter, the **Voltage phase 2**, **Voltage phase 3**, **Current phase 2**, and **Current phase 3** entities are not created. If no gas meter is connected to your smart meter, the **Gas consumed** entity does not appear.

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

## Adding the meter to the Energy dashboard

Home Assistant does not add the meter to the [Energy dashboard](/docs/energy/) automatically. Your meter reports energy per tariff, so add one grid connection per tariff:

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. On the **Electricity** tab, under **Electricity grid**, select **Add grid connection**.
3. For **Energy imported from grid**, select **Energy imported tariff 1**. For **Energy exported to grid**, select **Energy exported tariff 1**.
4. Optional: to show real-time power, set **Type of power measurement** to **Two sensors**. Select **Power imported** for **Power imported from grid** and **Power exported** for **Power exported to grid**.
5. Select **Save**.
6. Add a second grid connection with **Energy imported tariff 2** and **Energy exported tariff 2**. Leave out the power sensors, because each power sensor can only be used on one grid connection.
7. If your meter reports gas, go to the **Gas** tab, select **Add gas source**, and select **Gas consumed**.

## Known limitations

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
