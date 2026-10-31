---
description: Instructions on how to integrate Aranet devices into Home Assistant.
ha_release: 2022.12
ha_domain: aranet
---

Integrates [Aranet](https://aranet.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Aranet integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Aranet2](https://aranet.com/products/aranet2/)
- [Aranet4](https://aranet.com/products/aranet4/)
- [Aranet Radiation](https://aranet.com/products/aranet-radiation-sensor/)
- [Aranet Radon Plus](https://aranet.com/products/aranet-radon-sensor)
- [Aranet Radon One](https://aranet.com/en/home/products/aranet-radon-one-green)

  The Aranet integration requires that your Aranet device is updated to at least firmware version 1.2.0 and has the "Smart Home integration" feature enabled. Both of these can be done within the settings portion of the Aranet Home mobile application on both Android and iOS.
