---
title: MikroTik BT5
description: Instructions on how to integrate MikroTik BT5 devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2024.6
ha_iot_class: Local Push
ha_codeowners:
  - '@anrijs'
ha_domain: mikrotik_bt5
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [MikroTik](https://mikrotik.com/) Bluetooth tags into Home Assistant.

{% include integrations/config_flow.md %}

The MikroTik BT5 integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [MikroTik TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in/)
- [MikroTik TB-BT5-OUT](https://mikrotik.com/product/tg_bt5_out/)

  The MikroTik BT5 integration requires that your MikroTik BT5 devices have MikroTik Beacon enabled. This can be done within the settings portion of the MikroTik Beacon Manager mobile application on both Android and iOS.
