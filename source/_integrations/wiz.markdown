---
title: WiZ
description: Instructions on setting up WiZ within Home Assistant.
ha_category:
  - Binary sensor
  - Light
  - Number
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: '2022.3'
ha_dhcp: true
ha_config_flow: true
ha_codeowners:
  - '@sbidy'
ha_domain: wiz
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The **WiZ** {% term integration %} allows you to control your WiZ lights and smart sockets.
The devices are set up through your Wi-Fi network and don't need any additional bridge or gateway.

These devices have been sold under at least the following brands:

- [4Lite](https://4liteuk.com/)
- AEG
- [Altair](https://altairlighting.com/default.dmx)
- [Ansell](https://ansell-lighting.com/)
- [Atom Lighting](https://atomlighting.com.au/)
- [ATX LED](https://atxledinc.com/)
- [Brilliant](https://www.brilliantlightsource.com/)
- [Designers Fountain](https://designersfountain.com/)
- [Evoluziona](https://tecnolite.mx/)
- [Fischer & Honsel](https://fischer-honsel.com/)
- [Gauss](https://gauss.ru/smartlight/products/)
- iDual
- [KSR](https://www.ksrlighting.com/)
- [Laurie Lumiere](https://www.laurielumiere.com/)
- [Lednify](https://lednify.com/)
- [Leyton](https://www.leyton-lighting.co.uk/)
- [Liteline](https://www.liteline.com/page/oncloud)
- [Lutec](https://www.lutec.com/segments/connected)
- [Philips Smart LED lights with WiZ Connected](https://www.usa.lighting.philips.com/consumer/smart-wifi-led)
- [Spex](https://spexlighting.com/pages/smart-lights)
- [SLV](https://www.slv.com/)
- [Trenz](https://trenzlighting.com/pages/smart-lights)
- [Trio](https://wiz.trio-lighting.com/)
- [Wofi](https://wofi-wiz.com/)

The {% term integration %} can report the state of occupancy sensors that have been linked to a device.

{% include integrations/config_flow.md %}

## Connect WiZ devices to your network

To connect a WiZ device to your Wi-Fi network, please follow the instructions in the [WiZ app](https://www.wizconnected.com/en-us/explore-wiz/app) (available for iOS and Android).
If you have further questions, please have a look at the [WiZ Support Page](https://www.wizconnected.com/en-us/support/faq).

### Enable local connectivity

The {% term integration %} needs to communicate locally with the WiZ device. This setting **Allow local communication** can be disabled or enabled in WiZ app.
This setting should be enabled by default.

Steps to enable:

1. Open the WiZ app on your phone.
2. Click on the settings menu in the upper-left corner.
3. Scroll down to the security settings.
4. Enable the switch **Allow local communication**.

### Occupancy sensors

The occupancy sensors will only be added once a motion event is detected. Home Assistant can detect the sensors if they turn on at least one device when the room is occupied, and turn off at least one device when the room is not occupied. Sensors that are not linked to a device cannot be detected.

When a device is linked to an occupancy sensor, by default, the sensor will be disabled for 30 minutes after manual control.

Devices linked to the occupancy sensor that was last controlled manually will show an unknown at startup. The state will be known the next time the light is controlled by the sensor.

### Power monitoring sensors

A power monitoring sensor is available on devices with the following hardware modules:

- ESP25_SOCKET_01
- ESP20_SHDW_31R
- ESP20_SHRGB_31R
- ESP20_SHTW_31R

### Effect speed

The speed of an effect can be controlled via a `number` {% term entity %}. The {% term entity %} will only be available when an effect has been set that allows the speed to be adjusted.
