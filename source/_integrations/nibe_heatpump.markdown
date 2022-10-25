---
title: Nibe Heat Pump
description: Instructions on how to integrate a Nibe Heat Pump into Home Assistant.
ha_category:
  - Climate
ha_release: '2022.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elupus'
ha_domain: nibe_heatpump
ha_platforms:
  - binary_sensor
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The Nibe Heat Pump integration allows you to control and monitor [Nibe Heat Pumps](https://www.nibe.eu/en-eu/products/heat-pumps) in Home Assistant.

Supported devices:

- F1145
- F1155
- F1245
- F1255
- F1345
- F1355
- F370
- F470
- F730
- F750
- SMO20
- SMO40
- VVM225
- VVM310
- VVM320
- VVM325
- VVM500

{% include integrations/config_flow.md %}

## Connection Methods

To communicate with the pump there are a few different connection methods available depending on hardware. At the moment the following methods are supported.

- [UDP Gateway using NibeGw](#udp-gateway-using-nibegw)

### UDP Gateway using NibeGw

The heat pump exposes an RS485 interface for communication with extensions. This can be used to speak to the pump by emulating the Nibe MODBUS40 accessory.

Since the pump will go into an error state if the accessory is not responding, dedicated hardware running a gateway software is the preferable choice.

This can be built using a Raspberry Pi with an RS485 hat, an Arduino with RS485 support or an ESP32 with RS485 converters.

#### ESPHome

A ESPHome base hardware solution also works well and integrate nicely into Home Assistant.

- [Homepage](https://github.com/elupus/esphome-nibe)

#### Arduino

An Arduino-based solution has been tested by OpenHAB community with Arduino uno + RS485 and Ethernet shields. The ProDiNo NetBoards are also supported. A ProDiNo has an Ethernet and RS-485 port on the board.

- [Documentation from OpenHAB](https://www.openhab.org/addons/bindings/nibeheatpump/#arduino)
- [Source code in OpenHAB Contrib](https://github.com/openhab/openhab-addons/tree/main/bundles/org.openhab.binding.nibeheatpump/contrib/NibeGW/Arduino/NibeGW)

#### Raspberry Pi / Linux

A standard Linux application for running the Nibe Gateway software is also available.

- [Documentation from OpenHAB](https://www.openhab.org/addons/bindings/nibeheatpump/#raspberry-pi-or-other-linux-unix-based-boards)
- [Source code in OpenHAB Contrib](https://github.com/openhab/openhab-addons/tree/main/bundles/org.openhab.binding.nibeheatpump/contrib/NibeGW/RasPi)
