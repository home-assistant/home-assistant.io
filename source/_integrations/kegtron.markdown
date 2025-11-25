---
title: Kegtron
description: Instructions on how to integrate Kegtron Smart Keg Monitor (Gen 1) into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@Ernst79'
ha_domain: kegtron
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Kegtron](https://kegtron.com/) Smart Keg Monitor (Gen 1) devices into Home Assistant.

Supported devices:

- KT-100
- KT-200

{% include integrations/config_flow.md %}

The Kegtron integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

The integration only supports Smart Keg Monitor devices of the 1st generation, which communicate via Bluetooth LE.
