---
title: Aranet
description: Instructions on how to integrate Aranet devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.12
ha_iot_class: Local Push
ha_codeowners:
  - '@aschmitz'
  - '@thecode'
  - '@anrijs'
ha_domain: aranet
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

Integrates [Aranet](https://aranet.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Aranet integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Aranet2](https://aranet.com/products/aranet2/)
- [Aranet4](https://aranet.com/products/aranet4/)
- [Aranet Radiation](https://aranet.com/products/aranet-radiation-sensor/)
- [Aranet Radon Plus](https://aranet.com/products/aranet-radon-sensor)

  The Aranet integration requires that your Aranet device is updated to at least firmware version 1.2.0 and has the "Smart Home integration" feature enabled. Both of these can be done within the settings portion of the Aranet Home mobile application on both Android and iOS.
