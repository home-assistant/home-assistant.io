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
- [INKBIRD Bluetooth Hygrometer Thermometer ITH-11-B](https://inkbird.com/products/bluetooth-hygrometer-thermometer-ith-11-b)
- [INKBIRD Bluetooth Hygrometer Thermometer ITH-13-B](https://inkbird.com/products/bluetooth-hygrometer-thermometer-ith-13-b)
- [INKBIRD Bluetooth Hygrometer Thermometer ITH-21-B](https://inkbird.com/products/bluetooth-hygrometer-thermometer-ith-21-b)
- [INKBIRD Bluetooth Wireless 4-in-1 Air Quality Monitor IAM-T1](https://inkbird.com/collections/air-quality-monitors/products/smart-indoor-air-quality-monitor-iam-t1)
- [INKBIRD Bluetooth 3-in-1 Indoor Air Quality Monitor IAM-T2](https://inkbird.com/products/bluetooth-3-in-1-indoor-air-quality-monitor-iam-t2)
- [Nutrichef Smart Wireless Grill Thermometer](https://nutrichefkitchen.com/products/pwirbbq40)
- [Nutrichef Smart Bluetooth BBQ Grill Thermometer](https://nutrichefkitchen.com/products/pwirbbq80-1)

While many devices can be updated without active scans, some entities, including the battery sensor require active scans.

## Discovery

The INKBIRD integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

Most devices require active scans to be discovered.

{% include integrations/config_flow.md %}

## Troubleshooting

The IAM-T1 model only reports the temperature unit periodically and may display outdated temperature readings. If the values seem outdated, press the **°C/°F** button (located under the cover) **twice** to refresh the data.
