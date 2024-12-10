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
  - button
  - climate
  - number
  - select
  - sensor
  - switch
  - water_heater
ha_integration_type: integration
---

The Nibe Heat Pump integration allows you to control and monitor [Nibe Heat Pumps](https://www.nibe.eu/en-eu/products/heat-pumps) in Home Assistant.

Supported devices:

- F1145/F1155
- S1145/S1155
- F1245/F1255
- F1355/F1355
- S2125
- S320/S325
- F370
- F470
- F730
- S735
- F750
- S1255
- SMO40
- SMOS40
- VVM225
- VVM310
- VVM320
- VVM325
- VVM500

{% include integrations/config_flow.md %}

## Connection Methods

To communicate with the pump there are a few different connection methods available depending on hardware. At the moment the following methods are supported.

- [Connection Methods](#connection-methods)
  - [UDP Gateway using NibeGw](#udp-gateway-using-nibegw)
    - [ESPHome](#esphome)
    - [Arduino](#arduino)
    - [Raspberry Pi / Linux](#raspberry-pi--linux)
  - [Modbus Connection](#modbus-connection)
    - [TCP/IP](#tcpip)
    - [RCU](#rcu)

### UDP Gateway using NibeGw

The heat pump exposes an RS485 interface for communication with extensions. This can be used to speak to the pump by emulating the Nibe MODBUS40 accessory.

Since the pump will go into an error state if the accessory is not responding, dedicated hardware running a gateway software is the preferable choice.

This can be built using a Raspberry Pi with an RS485 hat, an Arduino with RS485 support or an ESP32 with RS485 converters.

#### ESPHome

An ESPHome base hardware solution also works well, and integrate nicely into Home Assistant.

- [Homepage](https://github.com/elupus/esphome-nibe)

#### Arduino

An Arduino-based solution has been tested by OpenHAB community with Arduino uno + RS485 and Ethernet shields. The ProDiNo NetBoards are also supported. A ProDiNo has an Ethernet and RS-485 port on the board.

- [Documentation from OpenHAB](https://www.openhab.org/addons/bindings/nibeheatpump/#arduino)
- [Source code in OpenHAB Contrib](https://github.com/openhab/openhab-addons/tree/main/bundles/org.openhab.binding.nibeheatpump/contrib/NibeGW/Arduino/NibeGW)

#### Raspberry Pi / Linux

A standard Linux application for running the Nibe Gateway software is also available.

- [Documentation from OpenHAB](https://www.openhab.org/addons/bindings/nibeheatpump/#raspberry-pi-or-other-linux-unix-based-boards)
- [Source code in OpenHAB Contrib](https://github.com/openhab/openhab-addons/tree/main/bundles/org.openhab.binding.nibeheatpump/contrib/NibeGW/RasPi)

### Modbus Connection

Home Assistant support connecting to Nibe heat pumps over Modbus over either TCP or RCU like connections. When connecting to the pump inside a Home Assistant, the Modbus connection string must be specified.

#### TCP/IP

The newer S-series pump exposes a built-in TCP Modbus server that can be used to communicate with the pump. To enable support for this integration, the pump must be connected to your local network and network (5.2 - Network settings) and Modbus (7.5.9 - Modbus TCP/IP) must be enabled. More details on the Modbus support in the pump can be found in Nibe document [M12676EN](https://www.nibe.eu/download/18.3db69dc1795e0d992c5722/1622634529178/Modbus%20S-series%20EN%20M12676EN-1.pdf).

- `tcp://[IP OR HOSTNAME]`
- `tcp://[IP OR HOSTNAME]:502`

#### RCU

If your system is equipped with a MODBUS40 accessory, this can be used to control your pump. To connect Home Assistant to the MODBUS40 accessory, a RS485 USB dongle is needed, which can be locally connected to your Home Assistant system, or on a separate computer exposed via [ser2net](https://linux.die.net/man/8/ser2net)

- `serial://[DEVICE PATH]` for direct local connection
- `rfc2217://[IP OR HOSTNAME]:[PORT]` for a [ser2net](https://linux.die.net/man/8/ser2net) type proxy

{% note %}
Support for RCU-based communication is currently untested.
{% endnote %}
