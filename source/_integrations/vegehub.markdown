---
title: Vegetronix VegeHub
description: Instructions on how to integrate a VegeHub device with Home Assistant.
ha_category:
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 2025.7
ha_iot_class: Local Push
ha_codeowners:
  - '@ghowevege'
ha_domain: vegehub
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - url: https://vegetronix.com/Products/ha/VG-HUB-RELAY/
    title: VegeHub product page
  - url: https://vegetronix.com/Products/VG-HUB-GEN2/QuickStart
    title: VegeHub Quick Start Guide
  - url: https://vegetronix.com/Products/VG-HUB-GEN2/Manual
    title: VegeHub Manual
ha_quality_scale: bronze
ha_zeroconf: true
---

The **[Vegetronix VegeHub](https://vegetronix.com/Products/ha/VG-HUB-RELAY/)** is a compact, network-connected device designed for agricultural monitoring and control. It supports a variety of environmental sensors—including *soil moisture, soil temperature, light, and more*—making it suitable for use in gardening, landscaping, and precision agriculture. In addition to monitoring, the VegeHub can also control actuators such as *relays, pumps, or water valves*, enabling automation of irrigation and other systems. This {% term integration %} allows Home Assistant to receive real-time data from VegeHub devices and optionally control connected outputs.

The VegeHub is available in the [standard configurations](https://vegetronix.com/Products/ha/VG-HUB-RELAY/), as well as the [sprinkler control variation](https://vegetronix.com/Products/ha/VG-SPRINKLER-4L/). Both are supported by this integration.

There is currently support for the following platforms within Home Assistant:

- Sensor: Collects data from VegeHub sensor channels.
- Switch:  Shows actuator states and lets you control them.

## Supported devices

- [Sensor Based WiFi Controller](https://vegetronix.com/Products/ha/VG-HUB-RELAY/) - Firmware 4.0 or later - All variants
- [Sensor Based WiFi Data Logger](https://vegetronix.com/Products/ha/VG-HUB/) - Firmware 4.0 or later - All variants
- [Sensor Based WiFi Sprinkler Valve Controller](https://vegetronix.com/Products/ha/VG-SPRINKLER-4L/) - Firmware 4.0 or later - All variants

## Prerequisites

The VegeHub can be connected to Wi-Fi *without* the need for additional apps or cloud accounts. When powered on, the VegeHub creates a Wi-Fi access point called "Vege_XX_XX" where the XX are different for each device. Connect to this network from a phone, tablet, or other similar device. The default passphrase to connect to the access point is `vegetronix`. This can (and should) be changed in the Wi-Fi settings.

Once connected to the network, you should automatically be directed by your device to log in to the network. Follow the prompt to be directed to the VegeHub's Wi-Fi setup page, where you can scan for available networks, enter your Wi-Fi network's credentials, change the device's name, and change the access point password.

{% important %}
It is crucial to change the default access point password. If you don't, anyone can easily access your VegeHub and potentially compromise your Wi-Fi network credentials.
{% endimportant %}

Select **Apply**, and your VegeHub will reset its network connection and try to connect using the credentials you entered.

### Connecting to Home Assistant

Home Assistant monitors your network for VegeHub devices. As soon as your VegeHub is connected to the same network as Home Assistant, it should be detected automatically. Go to {% my integrations title="**Settings** > **Devices & services**" %} in Home Assistant, where you should see your VegeHub listed under **Discovered** devices.

{% important %}
The VegeHub device relies on your Home Assistant instance keeping the same IP address. If your Home Assistant device changes its IP address, the VegeHub will no longer be able to send updates until you update its configuration with the new IP address.

To avoid issues, it is recommended to assign a static IP address or DHCP reservation to your Home Assistant device on your network. If you ever change your Home Assistant device's IP address, remember to update the VegeHub's configuration so it can continue sending updates.
{% endimportant %}

We recommend adding devices through Home Assistant's automatic detection, but you can also add devices manually if needed.

{% include integrations/config_flow.md %}

### Device settings

To open the VegeHub settings page, navigate to {% my integrations title="**Settings** > **Devices & services**" %}, choose the VegeHub device card, and under **Device info** select **Visit**.

## Power management

The VegeHub has two power modes:

- Battery mode (default): Device sleeps after five minutes of inactivity
- Power adapter mode: Device remains always active

When in Power Adapter mode, the device will use significantly more power, so this mode should not be used when powering from batteries, as they will quickly be drained.

To change the power mode, visit the [Hub's settings interface](#device-settings), go to the **Settings** page, and change the **Power source** to **Power adapter**.

## Troubleshooting

### Device is unresponsive

If the device is unresponsive, wake it up using one of these methods:

- Press the button on the board.
- Disconnect and reconnect power.

### Setup is failing

  - Ensure the VegeHub is awake (see Device Wake-Up section)

### [Hub's settings interface](#device-settings) is not accessible

  - Ensure the VegeHub is awake (see Device Wake-Up section).

### Actuators are not responding

  - Ensure the VegeHub is awake (see Device Wake-Up section).
  - Consider switching to [power adapter mode](#power-management) for consistent response.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
