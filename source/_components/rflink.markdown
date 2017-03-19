---
layout: page
title: "RRLink"
description: "Instructions how to integrate RFLink gateway into Home Assistant."
date: 2016-01-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Hub
ha_release: 0.38
---

The `rflink` component support devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

The 433 Mhz spectrum is used by many manufacturers mostly using their own protocol/standard and includes devices like: light switches, blinds, weather stations, alarms and various other sensors.

RFLink Gateway supports a number of RF frequencies, using a wide range of low-cost hardware. Their website provides details for various RF transmitter, receiver and transceiver modules for 433Mhz, 868Mhz and 2.4 Ghz [here](http://www.nemcon.nl/blog2/wiring).
<p class='note'>
Note: Versions later than R44 adds support for Ikea Ansluta, Philips Living Colors Gen1, MySensors devices.
</p>

A complete list of devices supported by RFLink can be found [here](http://www.nemcon.nl/blog2/devlist)

This component is tested with the following hardware/software:

- Nodo RFLinkGateway V1.4/RFLink R46

To enable RFLink in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
```

Configuration variables:

- **port** (*Required*): The path to RFLink USB/serial device or TCP port in TCP mode.
- **host** (*Optional*): Switches to TCP mode, connects to host instead of to USB/serial.
- **wait_for_ack** (*Optional*): Wait for RFLink to acknowledge commands sent before sending new command (slower but more reliable). Defaults to `True`
- **ignore_devices** (*Optional*): List of devices id's to ignore. Supports wildcards (*) at the end.
- **reconnect_interval** (*Optional*): Time in seconds between reconnect attempts.

Complete example:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: False
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
```

### {% linkable_title TCP mode %}

TCP mode allows connect to a RFLink device over TCP/IP network. This is for example useful if placing the RFLink device next to the HA server is not optimal or desired (eg: bad reception).

To expose the usb/serial interface over TCP on a different host (Linux) the following command can be used:

```bash
$ socat /dev/ttyACM0,b57600 TCP-LISTEN:1234,reuseaddr
```

Other methods of exposing the serial interface over TCP are possible (eg: ESP8266 or using Arduino Wifi shield). Basically the serial stream should be directly mapped to the TCP stream.

```yaml
# Example configuration.yaml entry
rflink:
  host: 192.168.0.10
  port: 1234
```

### {% linkable_title Ignoring devices %}

Rflink platform can be configured to completely ignore a device on a platform level. This is useful when you have neighbors which also use 433 Mhz technology.

For example:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: False
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
    - kaku_1_*
```

This configuration will ignore the button `1` of the `newkaku` device with ID `000001`, all devices of the `digitech` protocol and all switches of the `kaku` protocol device with codewheel ID `1`.

Wildcards only work at the end of the ID, not in the middle of front!

### {% linkable_title Device support %}

Even though a lot of devices are supported by RFLink, not all have been tested/implemented. If you have a device supported by RFLink but not by this component please consider testing and adding support yourself or [create an issue](https://github.com/home-assistant/home-assistant/issues/new) and mention `@aequitas` in the description.

### {% linkable_title Device Incorrectly Identified %}

If you find a device is recognized differently, with different protocols or the ON OFF is swapped or detected as two ON commands, it can  be overcome with the RFLink 'RF Signal Learning' mechanism from RFLink Rev 46 (11 March 2017). http://www.nemcon.nl/blog2/faq#RFFind.

### {% linkable_title Technical overview %}

- The`RFLink` Python module a asyncio transport/protocol is setup that fires an callback for every (valid/supported) packet received by the RFLink gateway.
- This component uses this callback to distribute 'rflink packet events' over the HASS bus which can be subscribed to by entities/platform implementations.
- The platform implementations take care of creating new devices (if enabled) for unseen incoming packet id's.
- Device entities take care of matching to the packet ID, interpreting and performing actions based on the packet contents. Common entity logic is maintained in this main component.
