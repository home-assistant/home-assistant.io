---
title: EufyLife
description: Instructions on how to integrate your EufyLife Bluetooth device with Home Assistant.
ha_release: '2023.2'
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_domain: eufylife_ble
ha_platforms:
  - sensor
ha_integration_type: device
---

The **EufyLife** {% term integration %} allows you to integrate Eufy smart scales with Home Assistant.

## Supported devices

- [Smart Scale (T9140)](https://service.eufy.com/product-description/a085g000000Nm5FAAS)
- [Smart Scale A1 (T9120)](https://service.eufy.com/product-description/a08J1000000XqjzIAC)
- [Smart Scale C1 (T9146)](https://service.eufy.com/product-description/a085g000000NxQJAA0)
- [Smart Scale C20 (T9130)](https://service.eufy.com/product-description/a08J1000000XnJ9IAK/)
- [Smart Scale P1 (T9147)](https://service.eufy.com/product-description/a085g000000NxQIAA0)
- [Smart Scale P2 (T9148)](https://service.eufy.com/product-description/a085g000004wnz4AAA)
- [Smart Scale P2 Pro (T9149)](https://service.eufy.com/product-description/a085g000004wpGjAAI)
- [Smart Scale P3 (T9150)](https://service.eufy.com/product-description/a085g000004zMopAAE)

{% note %}
This integration does not support the Wi-Fi capabilities of the P2, P2 Pro and P3. It can only connect to your smart scale via Bluetooth.
{% endnote %}

## Features

All smart scale models provide a weight sensor entity and a real-time weight sensor entity. The real-time weight entity updates in real time while the scale is taking a weight measurement. The weight entity updates with the final weight value only when the scale is finished taking a weight measurement.

The Smart Scale P2 Pro additionally provides a heart rate sensor entity that will display the most recent heart rate measurement taken by the scale.

The EufyLife integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. Alternatively, follow the steps below to add the integration manually.

{% include integrations/config_flow.md %}
