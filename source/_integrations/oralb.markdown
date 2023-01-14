---
title: Oral-B
description: Instructions on how to integrate Oral-B devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.11
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@conway220'
ha_domain: oralb
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Oral-B](https://oralb.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Oral-B integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [IO 4 Series](https://oralb.com/en-us/products/electric-toothbrushes/oralbio)
- [IO 6 Series](https://oralb.com/en-us/products/electric-toothbrushes/io-series-6-electric-toothbrush-gray-opal/)
- [IO 7 Series](https://oralb.com/en-us/products/electric-toothbrushes/oralbio)
- [IO 8 Series](https://oralb.com/en-us/products/electric-toothbrushes/oralbio)
- [IO 9 Series](https://oralb.com/en-us/products/electric-toothbrushes/oralbio)
- Smart Series 4000
- Smart Series 6000
- [Smart Series 7000](https://oralb.com/en-us/products/electric-toothbrushes/smart-7000-rechargeable-electric-toothbrush/)
- Smart Series 8000
- [Genius Series 9000](https://oralb.com/en-us/products/electric-toothbrushes/genius-9600-rechargeable-electric-toothbrush-white/)
- Triumph V2

## Sensor

* Mode - selected cleaning mode e.g. daily clean.
* Number of sectors - brushing areas set in the **Set Pacer Visualisation** in the brushing preferences in the mobile app.
* Sector - the current sector of brush goal you are in (i.e. if brush goal is 2:00 minutes, and you are at 0:37, you are in sector 2)
* Time - total brushing time in seconds.
* Toothbrush state - whether the toothbrush is running, idle.
* Battery - toothbrush battery percentage.
