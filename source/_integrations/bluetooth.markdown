---
title: Bluetooth
description: Discover, connect, and monitor bluetooth devices.
ha_category:
  - Utility
ha_iot_class: Local Push
ha_release: 2022.8
ha_domain: bluetooth
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: integration
---

The Bluetooth Monitoring and Discovery integration will detect nearby bluetooth devices. Discovered devices will show up in the discovered section on the integrations page in the configuration panel.

{% include integrations/config_flow.md %}

## Configuration

While this integration is part of [`default_config:`](/integrations/default_config/) to enable automatic discovery of the Bluetooth Adapter, it will only be enabled by setting up the configuration flow, or manually adding it to your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
bluetooth:
```

## D-Bus and BlueZ are required on Linux

For Bluetooth to function on Linux systems, the [D-Bus](https://en.wikipedia.org/wiki/D-Bus) socket must be accessible to Home Assistant. The Bluetooth adapter must be accessible to D-Bus and running [BlueZ](http://www.bluez.org/) >= 5.43.

- Home Assistant Operating System: no additional steps are required. Home Assistant OS version 8.4 or later is recommended for performance reasons.
- Home Assistant Container: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container.
- Home Assistant Supervised: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container.
- Home Assistant Core: The system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant.

## Installing a USB Bluetooth Adapter

Some systems may not come with Bluetooth and require a USB adapter. Installing an adapter for the first time may require multiple restarts for the device to be fully recognized.

If you experience an unreliable Bluetooth connection, installing a [USB extension cable with a Ferrite Bead](https://a.co/d/fRnFIwy) may improve reliability.

### Known working adapters

- ASUS USB-BT400
- ASUS USB-BT500
- Avantree DG45
- Maxuni BT-501
- SUMEE BT501
- UGREEN CM390
- XDO BT802 (Long Range)
- ZEXMTE BT-505 (Long Range)
- ZEXMTE BT-DG54

### Unsupported adapters

- tp-link UB400 - Frequent connection failures
- tp-link UB500 - Frequent connection failures

{% include integrations/option_flow.md %}

### Multiple adapters

Support for multiple Bluetooth adapters is available on Linux systems only. Select the adapter you wish to use via the options flow on the integrations page. The adapter selection only affects integrations that use the Bluetooth integration interfaces.

## Integrations that require exclusive use of the Bluetooth Adapter

While newer integrations can share the Bluetooth Adapter, some legacy integrations require exclusive use of the adapter. Enabling this integration may prevent an integration that has not been updated to use newer methods from functioning.

Deleting the config entry for this integration will release control of the adapter and allow another integration to gain exclusive use of the Bluetooth adapter. If you have manually added `bluetooth:` to your `configuration.yaml`, you must also remove it to prevent the configuration from being recreated. Consider adding a second Bluetooth adapter on Linux systems if you need to continue using legacy integrations, as more integrations will move to use the Bluetooth integration in the future.

## Bluetooth interference with other devices

Devices that are using the 2.4 GHz band, like Wi-Fi, Zigbee, and USB3 devices (and their cable connections) are known to affect Bluetooth reception. Especially external SSD drives with USB3 cables are known to block the Bluetooth signal. Also, metal casings can decrease the Bluetooth performance of internal Bluetooth Adapters.

The following tips may improve reception of the Bluetooth Adapter:

- Try to place USB3 devices (SSD, etc.) as far away as possible from your Bluetooth Adapter, e.g., by using an extension cable.
- Use a USB3 extension cable with proper shielding and ferrite clamps.
- Use a (good quality) external Bluetooth adapter with an antenna.

