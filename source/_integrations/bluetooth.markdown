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

## Configuration

```yaml
# Example configuration.yaml entry
bluetooth:
```

## Installing a USB Bluetooth Adapter

Some systems may not come with Bluetooth and require a USB adapter. Installing an adapter for the first time may require multiple restarts for the device to be fully recognized.

### Known working adapters

ASUS USB-BT400
ASUS USB-BT500

### Unsupported adapters

tp-link UB500 - Frequent connection failures
