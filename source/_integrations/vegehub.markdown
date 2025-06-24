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

## Setup

### WiFi

The VegeHub can be connected to WiFi *without* the need of additional apps or cloud accounts. When powered on, the VegeHub creates a WiFi access point called "Vege_XX_XX" where the XX are different for each device. Simply connect to this network from a phone, tablet, or other similar device. The default passphrase to connect to the access point is `vegetronix`. This can (and should) be changed in the WiFi settings.

Once connected to the network, you should automatically be directed by your device to log in to the network. Follow the prompt to be directed to the VegeHub's WiFi setup page, where you can scan for available networks, put in your WiFi network's credentials, change the device's name, and change the access point password.

{% warning %}
It is crucial to change the default access point password. If you don't, anyone can easily access your VegeHub and potentially compromise your WiFi network credentials.
{% endwarning %}

Press "Apply" and your VegeHub will reset the network connection and try to connect to the credentials you put in.

### Integration

The VegeHub integration will automatically detect VegeHub devices that are connected to the same network as your Home Assistant, and will present them in `Settings->Devices and Services`.

Alternatively, a VegeHub can be added manually by going to `Settings->Devices and Services`, then click the "Add Integration" button, search for the VegeHub integration, and click on it. If your VegeHub is not already listed here, click "Setup another instance of Vegetronix VegeHub" where you will be prompted for the device's IP address in order to continue setup.

There is currently no way to set up a VegeHub using {% term YAML %} in the `configuration.yaml` file.

### Device Settings

In the VegeHub integration page, if you click "1 device" under your VegeHub's listing, you will be taken to your Device Info page. Here you will see all the entities available from this VegeHub, and you can click the "Visit" link to be taken directly to the VegeHub's device settings interface. Here you can directly change setting on the VegeHub.

## Power Management

The VegeHub has two power modes:

- Battery mode (default): Device sleeps after five minutes of inactivity
- Power adapter mode: Device remains always active

When in Power Adapter mode, the device will use significantly more power, so this mode should not be used when powering from batteries, as they will quickly be drained.

To change the power mode, visit the [Hub's settings interface](#device-settings), go to the "Settings" page, and change the "Power source" to "Power adapter".

## Device Removal

To remove a VegeHub from Home Assistant, find and click on the VegeHub integration on the "Devices and Services" page, click the menu dots next to the device you want to remove, and select "Delete"

## Troubleshooting

### Device Wake-Up

If the device is unresponsive, wake it up using one of these methods:

- Press the button on the board
- Disconnect and reconnect power

### Setup is failing
  - Ensure the VegeHub is awake (see Device Wake-Up section)

### [Hub's settings interface](#device-settings) is not accessible

  - Ensure the VegeHub is awake (see Device Wake-Up section)

### Actuators are not responding

  - Ensure the VegeHub is awake (see Device Wake-Up section)
  - Consider switching to [power adapter mode](#power-management) for consistent response

