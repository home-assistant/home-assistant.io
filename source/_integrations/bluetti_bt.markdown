---
title: Bluetti BT
description: Instructions on setting up Bluetti Bluetooth devices within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_release: 2026.10
ha_config_flow: true
ha_codeowners:
  - '@Patrick762'
ha_domain: bluetti_bt
ha_platforms:
  - sensor
ha_integration_type: device
ha_bluetooth: true
ha_quality_scale: bronze
---

The **Bluetti BT** {% term integration %} allows you to integrate your [Bluetti Devices](https://bluetti.com/products) into Home Assistant.

## Supported devices

The following devices are known to be supported by the integration:

- AC70
- AC180
- EB3A
- EP600
- Handsfree 1

## Unsupported devices

The following devices are not supported by the integration:

- Balco260

## Prerequisites

To use this integration, it is required to have working [Bluetooth](/integrations/bluetooth) set up on the device running Home Assistant.
Shelly Bluetooth Proxies are not supported with this integration.

## Configuration

To add the **Bluetti BT** device to your Home Assistant instance, configure the discovered device.

Manual configuration is **not** possible.

## Supported functionality

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

### Sensor

The following sensors are added for each Bluetti device:

- Charge - Percent charge remaining in %

## Known Limitations

- Some devices don't support the Bluetooth protocols used by this integration. Those devices might get detected by the integration but you don't get any data from them.
- Since this integration is based on reverse engineering results, firmware updates might break this integration without any warning. In that case you can try to reconfigure the integration. If this doesn't help you can create a new issue.
