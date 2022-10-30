---
title: Aranet4
description: Instructions on how to integrate Aranet4 devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.11
ha_iot_class: Local Push
ha_codeowners:
  - '@aschmitz'
ha_domain: aranet4
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Aranet4](https://aranet.com/products/aranet4/) devices into Home Assistant.

The Aranet4 integration requires that your Aranet4 device is updated to at least firmware version 1.2.0 and has the "Smart Home integration" feature enabled. Both of these can be done within the settings portion of the Aranet4 mobile application on both Android and iOS.

{% include integrations/config_flow.md %}

The Aranet4 integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.
