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
  - '@Lash-L'
ha_domain: oralb
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Oral-B](https://oralb.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Oral-B integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. 

The integration can discover most Bluetooth-enabled Oral-B toothbrushes. Brushes not listed as supported below may not be correctly identified or have some modes missing.

## Supported devices

- [IO Series 4](https://oralb.com/en-us/products/electric-toothbrushes/io-series-4-rechargeable-electric-toothbrush-blue/)
- [IO Series 6](https://oralb.com/en-us/products/electric-toothbrushes/io-series-6-electric-toothbrush-gray-opal/)
- [IO Series 7](https://oralb.com/en-us/products/electric-toothbrushes/io-series-7-electric-toothbrush-sapphire-blue/)
- [IO Series 8](https://oralb.com/en-us/products/electric-toothbrushes/io-series-8-electric-toothbrush-black-onyx/)
- [IO Series 9](https://oralb.com/en-us/products/electric-toothbrushes/io-series-9-rechargeable-electric-toothbrush-in-rose-quartz/)
- [Smart Series 4000](https://www.service.oralb.com/us/en/products/3754/)
- [Smart Series 6000](https://www.service.oralb.com/us/en/products/3754/)
- [Smart Series 7000](https://oralb.com/en-us/products/electric-toothbrushes/smart-7000-rechargeable-electric-toothbrush/)
- [Genius Series 8000](https://oralb.com/en-us/products/electric-toothbrushes/genius-8000-rechargeable-electric-toothbrush-pink/)
- [Genius Series 9000](https://www.service.oralb.com/us/en/products/3765/)
- [Genius Series 10000](https://www.service.oralb.com/us/en/products/3765/)
- [Triumph V2](https://www.service.oralb.com/us/en/products/3745/)
- [Genius X](https://www.service.oralb.com/us/en/products/3771/)

## Sensor

- Mode - selected cleaning mode e.g. daily clean.
- Number of sectors - brushing areas set in the **Set Pacer Visualisation** in the brushing preferences in the mobile app.
- Sector - the current sector of brush goal you are in (i.e. if brush goal is 2:00 minutes, and you are at 0:37, you are in sector 2)
- Time - total brushing time in seconds.
- Toothbrush state - whether the toothbrush is running, idle.
- Battery - toothbrush battery percentage.

{% important %}
Updates of the battery sensor require an active Bluetooth connection and relatively close proximity. If you use a <a href="/integrations/bluetooth/#remote-adapters-bluetooth-proxies/" target="_blank">Bluetooth proxy</a>, please ensure it supports active connections. All the other sensors update with active or passive connections.
{% endimportant %}
