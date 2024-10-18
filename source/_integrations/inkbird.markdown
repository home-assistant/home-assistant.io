---
title: INKBIRD
description: Instructions on how to integrate INKBIRD devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: inkbird
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [INKBIRD](https://www.inkbird.com/) devices into Home Assistant.

## Supported devices

- [INKBIRD Bluetooth Thermometer IBS-TH1](https://inkbird.com/products/bluetooth-thermometer-ibs-th1)
- [INKBIRD Bluetooth Pool Thermometer IBS-P01B](https://inkbird.com/products/bluetooth-pool-thermometer-ibs-p01b)
- [INKBIRD Temperature and humidity Hygrometer IBS-TH2](https://inkbird.com/products/hygrometer-ibs-th2)
- [INKBIRD Bluetooth Smart Sensor ITH-12S](https://inkbird.com/products/bluetooth-smart-sensor-ith-12s)
- [INKBIRD Bluetooth BBQ Thermometer IBT-6XS](https://inkbird.com/products/bluetooth-bbq-thermometer-ibt-6xs)
- [INKBIRD Bluetooth Grill Thermometer IBT-4XS](https://inkbird.com/products/bluetooth-grill-thermometer-ibt-4xs)
- [INKBIRD Bluetooth Grill Thermometer IBT-2X](https://inkbird.com/products/bluetooth-grill-thermometer-ibt-2x)
- [Nutrichef Smart Wireless Grill Thermometer](https://nutrichefkitchen.com/products/pwirbbq40)
- [Nutrichef Smart Bluetooth BBQ Grill Thermometer](https://nutrichefkitchen.com/products/pwirbbq80-1)

The INKBIRD integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
