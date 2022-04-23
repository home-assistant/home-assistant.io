---
title: Melnor Bluetooth
description: Instructions on setting up Melnor Bluetooth devices within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Poll
ha_release: '2022.5'
ha_config_flow: true
ha_codeowners:
  - '@vanstinator'
ha_domain: melnor
ha_platforms:
  - switch
ha_integration_type: integration
---

The Melnor Bluetooth integration allows you to control your Melnor Bluetooth watering valves.
The devices are set up through bluetooth and don't need any additional bridge or gateway.

1, 2, and 4 zone valves are supported.

These devices have been sold under at least the following brands:

- [Melnor](https://melnor.com/)
- [Eden](https://edengarden.com/)

{% include integrations/config_flow.md %}

## Troubleshooting

* No devices found on the network

Make sure nothing else is connected to the valve. The valve will not respond to bluetooth discovery requests from Home Assistant if another device, such as your phone, is already connected.
