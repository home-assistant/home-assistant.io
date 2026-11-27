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

## Data updates

The Aranet integration does not connect to your device. It listens for the Bluetooth advertisements the device broadcasts when the **Smart Home integration** feature is enabled, and updates the sensors each time a new advertisement is received.

Because the data is pushed by the device, Home Assistant only receives measurements while the device is within range of a [Bluetooth](/integrations/bluetooth) adapter or proxy. When the device is out of range, its sensors become unavailable.

## Known limitations

The integration does not import the measurement history stored on the device. Measurements taken while the device was out of range, or while Home Assistant was not running, are not backfilled when the connection is restored, and show up as gaps in the history. This differs from the Aranet Home app, which downloads the stored measurements when it reconnects to the device.
