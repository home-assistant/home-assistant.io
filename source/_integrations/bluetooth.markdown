---
title: Bluetooth Monitoring and Discovery
description: Discover and monitor bluetooth devices.
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

The Bluetooth Monitoring and Discovery integration will detect nearby bluetoth devices. Discovered devices will show up in the discovered section on the integrations page in the configuration panel.

{% include integrations/config_flow.md %}

## Configuration

While this integration is part of [`default_config:`](/integrations/default_config/) to enable automatic discovery of the Bluetooth Adapter, it will only be enabled by setting up the configuration flow, or manually adding it to your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
bluetooth:
```

## Installing a USB Bluetooth Adapter

Some systems may not come with Bluetooth and require a USB adapter. Installing an adapter for the first time may require multiple restarts for the device to be fully recognized.

### Known working adapters

- ASUS USB-BT400
- ASUS USB-BT500

### Unsupported adapters

- tp-link UB500 - Frequent connection failures

## Integrations that require exclusive use of the Bluetooth Adapter

While newer integrations can share the Bluetooth Adapter, some legacy integrations require exclusive use of the adapter. Enabling this integration may prevent an integration that has not been updated to use newer methods from functioning.

Deleting the config entry for this integration will release control of the adapter and allow another integration to gain exclusive use of the Bluetooth adapter. If you have manually added `bluetooth:` to your `configuration.yaml`, you must also remove it to prevent the configuration from being recreated.

## Bluetooth interference with other devices

Devices that are using the 2.4 GHz band, like Wi-Fi, Zigbee, and USB3 devices (and their cable connections) are known to affect Bluetooth reception. Especially external SSD drives with USB3 cables are known to block the Bluetooth signal. Also, metal casings can decrease the Bluetooth performance of internal Bluetooth Adapters.

The following tips may improve reception of the Bluetooth Adapter:

- Try to place USB3 devices (SSD, etc.) as far away as possible from your Bluetooth Adapter, e.g., by using an extension cable.
- Use a USB3 extension cable with proper shielding and ferrite clamps.
- Use a (good quality) external Bluetooth adapter with an antenna.

