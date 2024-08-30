---
title: Melnor Bluetooth
description: Instructions on setting up Melnor Bluetooth devices within Home Assistant.
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_bluetooth: true
ha_release: 2022.9
ha_config_flow: true
ha_codeowners:
  - '@vanstinator'
ha_domain: melnor
ha_platforms:
  - number
  - sensor
  - switch
  - time
ha_integration_type: integration
---

The Melnor Bluetooth integration allows you to control your Melnor Bluetooth watering valves.
The devices are set up through Bluetooth and don't need any additional bridge or gateway.

1-zone, 2-zone, and 4-zone valves are supported.

These devices have been sold under at least the following brands:

- [Melnor](https://melnor.com/)
- [Eden](https://edengarden.com/)

{% include integrations/config_flow.md %}

The Melnor Bluetooth integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth/) integration is enabled and functional.

## Troubleshooting

### No devices found on the network

Make sure nothing else is connected to the valve. The valve will not respond to Bluetooth discovery requests from Home Assistant if another device, such as your phone, is already connected.
