---
title: ThermoPro
description: Instructions on how to integrate ThermoPro devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: thermopro
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [ThermoPro](https://buythermopro.com/) devices into Home Assistant.

## Supported devices

- [TP359](https://buythermopro.com/product/thermopro-tp59-bluetooth-wireless-thermometer-hygrometer-humidity-monitor/)
- [TP357](https://buythermopro.com/product/thermopro-tp357-bluetooth-digital-indoor-hygrometer-thermometer/)
- [TP358](https://buythermopro.com/product/tp358/)
- [TP393](https://buythermopro.com/product/tp393/)

The ThermoPro integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
