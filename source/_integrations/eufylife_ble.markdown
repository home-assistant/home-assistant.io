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

The EufyLife integration allows you to integrate Eufy smart scales with Home Assistant.

## Supported devices

- [Smart Scale (T9140)](https://support.eufy.com/s/product/a085g000000Nm5FAAS/smart-scale(t9140))
- [Smart Scale C1 (T9146)](https://us.eufy.com/products/t9146)
- [Smart Scale P1 (T9147)](https://us.eufy.com/products/t9147)
- [Smart Scale P2 (T9148)](https://us.eufy.com/products/t9148)
- [Smart Scale P2 Pro (T9149)](https://us.eufy.com/products/t9149111)

{% note %}
This integration does not support the Wi-Fi capabilities of the P2 and P2 Pro. It can only connect to your smart scale via Bluetooth.
{% endnote %}

## Features

All smart scale models provide a weight sensor entity and a real-time weight sensor entity. The real-time weight entity updates in real time while the scale is taking a weight measurement. The weight entity updates with the final weight value only when the scale is finished taking a weight measurement.

The Smart Scale P2 Pro additionally provides a heart rate sensor entity that will display the most recent heart rate measurement taken by the scale.

The EufyLife integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. Alternatively, follow the steps below to add the integration manually.

{% include integrations/config_flow.md %}
