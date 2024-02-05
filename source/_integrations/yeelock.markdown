---
title: Yeelock BLE
description: Instructions on how to integrate Yeelock Bluetooth devices into Home Assistant.
ha_category:
  - Lock
ha_release: 2024.X
ha_domain: yeelock
ha_bluetooth: true
ha_codeowners:
  - '@codyc1515'
ha_config_flow: true
ha_platforms:
  - lock
ha_iot_class: Local Push
ha_integration_type: integration
---

Integrates [Yeelock](https://www.yeeloc.com) Bluetooth devices into Home Assistant.

{% include integrations/config_flow.md %}

The **Yeelock** {% term integration %} will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

Devices must have been set-up first in the Yeelock app in order to function with this {% term integration %}.
