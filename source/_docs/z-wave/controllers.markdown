---
title: "Z-Wave adapters"
description: "Extended instructions how to set up Z-Wave."
related:
  - docs: /integrations/zwave_js/
    title: Z-Wave integration
  - docs: /connect/zwa-2/
    title: Home Assistant Connect ZWA-2
---

To use Z-Wave with Home Assistant, you need a compatible Z-Wave adapter.

## Recommended Z-Wave adapter

The [Home Assistant Connect ZWA-2](/connect/zwa-2/) is an 800 series Z-Wave adapter specifically developed to work with Home Assistant.

## Other supported Z-Wave adapters

This section lists devices that have been confirmed to work with Z-Wave JS.

A few recommendations if you are new to Z-Wave:

- Use an [800 series adapter](#800-series-usb-adapters) (with firmware updated to ≥ 7.23.2).
  - The 800 series adapters are the most future-proof and offer the best RF performance.
- Opt for a USB connection, not a module.
  - Passing a module through Docker is more complicated than passing a USB connector through.

### 800 series USB adapters

Before connecting the Z-Wave 800 series adapter to Home Assistant, make sure the adapter uses a compatible firmware and SDK version. Some 800 series Z-Wave adapters have bugs which impact the stability of the mesh and can cause the adapter to become unresponsive.

Upgrade the firmware of the 800 series adapter to a recommended version.

- Because there is no known firmware version that is completely fixed, it is recommended to choose a firmware based on the following criteria:
  - prefer SDK versions 7.23.x and newer
  - SDK versions 7.22.x are okay
  - SDK versions 7.17.2 to 7.19.x are okay
  - avoid SDK versions before 7.17.2
  - avoid SDK versions 7.20 to 7.21.3

- **Note**: The SDK version does not have to match the firmware version.
  - If you are unsure which SDK versions a firmware is based on, contact the manufacturer of your device.

#### List of supported 800 series adapters

The following 800 series USB adapters have been reported to work with Home Assistant if using the SDK and firmware versions mentioned above.

- [Home Assistant Connect ZWA-2](/connect/zwa-2/) (officially recommended adapter)
- HomeSeer SmartStick G8
- Zooz 800 Series Z-Wave Long Range S2 Stick (ZST39 LR)

### 700 series USB adapters


In general, using a 700 series USB adapter is not recommended.

Before connecting the Z-Wave 700 series adapter to Home Assistant, make sure the adapter uses a compatible firmware and SDK version. Some 700 series Z-Wave adapters have bugs which impact the stability of the mesh and can cause the adapter to become unresponsive.

Upgrade the firmware of the 700 series adapter to a recommended version:

- Because there is no known firmware version that is completely fixed, it is recommended to choose a firmware based on the following criteria:
  - prefer SDK versions 7.17.2 to 7.18.x or 7.21.6 and newer
  - SDK versions 7.19.x are okay
  - avoid SDK versions before 7.17.2
  - avoid SDK versions 7.20 to 7.21.5
- **Note**: The SDK version does not have to match the firmware version.
  - If you are unsure which SDK versions a firmware is based on, contact the manufacturer of your device.
- To upgrade the firmware, search for the instructions that match your system.
  - For Linux, the [Upgrade instructions from kpine](https://github.com/kpine/zwave-js-server-docker/wiki/700-series-Controller-Firmware-Updates-(Linux))can be helpful.

#### List of supported 700 series USB adapters

The following 700 series USB adapters have been reported to work with Home Assistant if using the SDK and firmware versions mentioned above:

- Aeotec Z-Stick 7 USB stick (ZWA010) (the EU version is not recommended due to RF performance issues)
- HomeSeer SmartStick+ G3
- HomeSeer Z-NET G3
- Silicon Labs UZB-7 USB Stick (Silabs SLUSB7000A / SLUSB001A)
- Zooz S2 Stick 700 (ZST10 700)
- Z-Wave.Me Z-Station

### 500 series USB adapters

The following 500 series USB adapters have been reported to work with Home Assistant:

- Aeotec Z-Stick Gen5 (see note below)
- Everspring USB stick - Gen 5
- GoControl HUSBZB-1 stick
- Sigma Designs UZB stick
- Vision USB stick - Gen5
- Z-Wave.Me UZB1 stick (see Aeotec Z-Stick note below)
- HomeSeer SmartStick+ G2
- HomeSeer Z-NET G2

### Raspberry Pi HAT adapters

- Aeotec Z-Pi 7 Raspberry Pi HAT/Shield (ZWA025, 700 series)
- Z-Wave.Me RaZberry 7 (ZME_RAZBERRY7, 700 series)
- Z-Wave.Me RaZberry 7 Pro (ZMEERAZBERRY7_PRO or ZMEURAZBERRY7_PRO, 700 series)
- Z-Wave.Me Razberry 2 (500 series)
- Z-Wave.Me Razberry 1 (300 series)

## Third-party hubs

For the best experience, it is recommended to use an adapter directly with Home Assistant. If this doesn't work for you, you can use a hub that supports Z-Wave. Home Assistant supports the following third-party hubs with Z-Wave support:

- [Vera](/integrations/vera/)
- [Fibaro](/integrations/fibaro/)
- [SmartThings](/integrations/smartthings/)
- [Z-Wave.Me Z-Way](/integrations/zwave_me)

## Adapter notes

### Aeotec Z-Stick

{% note %}

The Aeotec Z-Stick and some of its variants (e.g. Z-Wave.Me UZB1) are known to have compatibility issues with the Linux kernel because of their [non-compliant behavior](https://forums.raspberrypi.com/viewtopic.php?f=28&t=245031#p1502030). Plugging these adapters through a USB hub can serve as a workaround that sometimes mitigates the issue.

{% endnote %}

It's totally normal for your Z-Wave stick to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system.
