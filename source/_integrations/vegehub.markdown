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
  - switch
ha_integration_type: integration
related:
  - url: https://www.vegetronix.com/Products/VG-HUB-RELAY/
    title: VegeHub product page
  - url: https://www.vegetronix.com/Products/VG-HUB-GEN2/QuickStart
    title: VegeHub Quick Start Guide
  - url: https://vegetronix.com/Products/VG-HUB-GEN2/Manual
    title: VegeHub Manual
---

The **Vegetronix VegeHub** {% term integration %} allows you to control your [VegeHub](https://www.vegetronix.com/Products/VG-HUB-RELAY/) and gather data from its attached sensors.

There is currently support for the following platforms within Home Assistant:

- Sensor - Gathers data from sensor channels on a VegeHub and stores the values in Home Assistant
- Switch - Allows you to view the status of relays on a VegeHub, and control them.

{% include integrations/config_flow.md %}

## Supported devices

- [Vegetronix VegeHub](https://www.vegetronix.com/Products/VG-HUB-RELAY/) - Firmware **4.0 or later** - All variants

## Prerequisites

The VegeHub can be connected to Wi-Fi *without* the need for additional apps or cloud accounts. When powered on, the VegeHub creates a Wi-Fi access point called "Vege_XX_XX" where the XX are different for each device. Connect to this network from a phone, tablet, or other similar device. The default passphrase to connect to the access point is `vegetronix`. This can (and should) be changed in the Wi-Fi settings.

Once connected to the network, you should automatically be directed by your device to log in to the network. Follow the prompt to be directed to the VegeHub's Wi-Fi setup page, where you can scan for available networks, enter your Wi-Fi network's credentials, change the device's name, and change the access point password.

{% important %}
It is crucial to change the default access point password. If you don't, anyone can easily access your VegeHub and potentially compromise your Wi-Fi network credentials.
{% endimportant %}

Select **Apply** and your VegeHub will reset the network connection and try to connect to the credentials you put in.

{% include integrations/config_flow.md %}

### Device settings

To open the VegeHub's device settings interface on their website, go to {% my integrations title="Settings > Devices & services" %}, and on the integration card, select 1 device to open the device page. Under Device info, select Visit to open the website with the settings.

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
