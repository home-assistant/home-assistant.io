---
title: Zendure
description: Instructions on how to integrate Zendure energy storage devices into Home Assistant.
ha_categories:
  - energy.solar_batteries
ha_release: 2026.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@shinecodes-lala'
ha_domain: zendure
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Zendure** {% term integration %} lets you monitor Zendure home energy storage systems, such as the SolarFlow 2400 AC+, directly over your local network. It reads the battery level and the solar, grid, battery and home power flows of the device.

All communication stays on your local network. The integration does not use the Zendure cloud and does not need a Zendure account or app token.

## Supported devices

The following devices are known to be supported by the integration:

- SolarFlow 2400 AC+
- SolarFlow 5000 Max Pro

Other Zendure models are not supported yet. Adding an unsupported model fails with an "unsupported device" error.

## Prerequisites

- The device is connected to your Wi-Fi network with the Zendure app.
- Home Assistant can reach the device over your network (HTTP, port 80 on the device).
- We recommend reserving a fixed IP address for the device in your router (DHCP reservation). See [The device becomes unavailable after its IP address changed](#the-device-becomes-unavailable-after-its-ip-address-changed).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your Zendure device on your home network, for example `192.168.1.50`. You can find it in your router's list of connected devices."
{% endconfiguration_basic %}

## Data updates

The integration polls the device over the local network every 15 seconds. Each poll is a single small HTTP request that returns the full device state.

## Supported functionality

The integration provides the following sensors for the device. A sensor is only added when the device reports the value.

- **Battery**: the battery level of the device.
- **Solar input power**, and **Solar power 1** to **Solar power 4** for each solar input.
- **Grid input power**: power the device takes from the grid.
- **Output to home power**: power the device delivers to your home.
- **Off-grid power**: power on the off-grid socket.
- **Battery charge power** and **Battery discharge power**.
- **Battery state**: **Charging**, **Discharging**, or **Standby**.
- **Remaining discharge time**.

The following diagnostic sensors are also available:

- **Temperature**: the device temperature.
- **Battery packs**: the number of connected battery packs.
- **Maximum output power** and **Maximum charge power**: the current upper limits of the device.
- **Signal strength**: the Wi-Fi signal strength (disabled by default).

## Known limitations

- **No authentication on the local interface**: any device on your network can read the Zendure device's data, not only Home Assistant. Keep the device on a trusted network, or on a separate network (VLAN) that only Home Assistant can reach.
- **Read-only**: the integration does not change settings on the device yet. Use the Zendure app for that.
- **No automatic discovery**: you add the device with its IP address or hostname.
- **No firmware updates**: the integration does not update the device firmware. Use the Zendure app.

## Troubleshooting

### Can't set up the device

- Check that the device answers: open `http://<device-ip>/properties/report` in a browser on the same network. It should return JSON.
- If you get "This Zendure model is not supported yet", your model is not on the [supported devices](#supported-devices) list.

### The device becomes unavailable after its IP address changed

1. Reserve a fixed IP address for the device in your router.
2. Add the device again with its new IP address. Home Assistant recognizes it by its serial number and updates the address of the existing entry, so you keep your entities and their history.

### Entities briefly become unavailable

If the device does not answer a poll within 5 seconds, all its entities show as unavailable until the next successful poll. Occasional short drops usually come from a weak or busy Wi-Fi connection:

- Check the device's **Signal strength** sensor (enable it first, it is disabled by default).
- Move the access point closer, or reserve a fixed IP address for the device.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service_steps.md %}

Removing the integration does not reset the device. It stays connected to your Wi-Fi and keeps its current settings.
