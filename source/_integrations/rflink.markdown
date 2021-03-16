---
title: RFLink
description: Instructions on how to integrate RFLink gateway into Home Assistant.
ha_category:
  - Hub
ha_iot_class: Assumed State
ha_release: 0.38
ha_domain: rflink
ha_platforms:
  - binary_sensor
  - cover
  - light
  - sensor
  - switch
ha_codeowners:
  - '@javicalle'
---

The `rflink` integration supports devices that use [RFLink gateway firmware](http://www.rflink.nl/blog2/download), for example, the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink Gateway is an Arduino Mega firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

The 433 MHz spectrum is used by many manufacturers mostly using their own protocol/standard and includes devices like: light switches, blinds, weather stations, alarms and various other sensors.

RFLink Gateway supports a number of RF frequencies, using a wide range of low-cost hardware. [Their website](http://www.rflink.nl/blog2/) provides details for various RF transmitters, receivers and transceiver modules for 433MHz, 868MHz and 2.4 GHz.

<div class='note'>
Note: Versions later than R44 add support for Ikea Ansluta, Philips Living Colors Gen1 and MySensors devices.
</div>

A complete list of devices supported by RFLink can be found [here](http://www.rflink.nl/blog2/devlist).

This integration is tested with the following hardware/software:

- Nodo RFLink Gateway V1.4/RFLink R46

## Configuration

To enable RFLink in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
```

{% configuration %}
port:
  description: The path to RFLink USB/serial device or TCP port in TCP mode.
  required: true
  type: string
host:
  description: Switches to TCP mode, connects to host instead of to USB/serial.
  required: false
  type: string
wait_for_ack:
  description: Wait for RFLink to acknowledge commands sent before sending new command (slower but more reliable).
  required: false
  default: true
  type: boolean
ignore_devices:
  description: List of device id's to ignore. Supports wildcards (`*`, `?`).
  required: false
  type: [list, string]
reconnect_interval:
  description: Time in seconds between reconnect attempts.
  required: false
  default: 10
  type: integer
tcp_keepalive_idle_timer:
  description: Time in seconds to wait since last data packet was seen before a TCP KEEPALIVE is sent. Value of 0 will disable this feature.
  required: false
  default: 3600
  type: integer 
{% endconfiguration %}

### Full example

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: false
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
```

### TCP mode

TCP mode allows you to connect to an RFLink device over a TCP/IP network. This is useful if placing the RFLink device next to the HA server is not optimal or desired (eg: bad reception).

To expose the USB/serial interface over TCP on a different host (Linux) the following command can be used:

```bash
socat /dev/ttyACM0,b57600 TCP-LISTEN:1234,reuseaddr
```

Other methods of exposing the serial interface over TCP are possible (eg: ESP8266 or using Arduino Wifi shield). Essentially the serial stream should be directly mapped to the TCP stream.

Tested with Wifi serial bridge [esp-link V2.2.3](https://github.com/jeelabs/esp-link/releases/tag/v2.2.3) running on a NodeMCU (ESP8266 Wifi module) with ESP8266 TXD0 (pin D10) and RXD0 (pin D9) connected to Arduino MEGA 2560 RX (Pin 2) and TX (Pin 3) respectively.

<div class='note warning'>

Due to different logic levels, a voltage level shifter is required between the 3.3V NodeMCU and 5V Arduino MEGA 2560 pins. The BSS138 bidirectional logic level converter has been tested for serial pins and the [link](https://www.aliexpress.com/item/8CH-IIC-I2C-Logic-Level-Converter-Bi-Directional-Module-DC-DC-5V-to-3-3V-Setp/32238089139.html) is recommended for the CC2500 transceiver (used for IKEA Ansluta and Philips Living Colors)

</div>

<div class='note'>
When re-flashing the Arduino MEGA, disconnect the ESP8266 to avoid programming difficulties.
</div>

```yaml
# Example configuration.yaml entry
rflink:
  host: 192.168.0.10
  port: 1234
  tcp_keepalive_idle_timer: 600
```

### Adding devices Automatically

In order to have your devices discovered automatically, you need to add the following to the configuration.
When pressing the button on the physical remote, RFLink detects the signal and the device should be added automatically to Home Assistant.

```yaml
light:
  - platform: rflink
    automatic_add: true
sensor:
  - platform: rflink
    automatic_add: true
```

[RFLink Switches](/integrations/switch.rflink/) and [RFLink Binary Sensors](/integrations/binary_sensor.rflink/) cannot be added automatically.

The RFLink integration does not know the difference between a binary sensor, a switch and a light. Therefore all switchable devices are automatically added as light by default. However, once the ID of a switch is known, it can be used to configure it as a switch or a binary sensor type in Home Assistant, for example, to add it to a different group or configure a nice name.

### Ignoring devices

The RFLink platform can be configured to completely ignore a device on a platform level. This is useful when you have neighbors which also use 433 MHz technology.

For example:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: false
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
    - kaku_1_*
```

This configuration will ignore the button `1` of the `newkaku` device with ID `000001`, all devices of the `digitech` protocol and all switches of the `kaku` protocol device with codewheel ID `1`.

### Device support

Even though a lot of devices are supported by RFLink, not all have been tested/implemented. If you have a device supported by RFLink but not by this integration please consider testing and adding support yourself.

### Device Incorrectly Identified

If you find a device is recognized differently, with different protocols or the ON OFF is swapped or detected as two ON commands, it can  be overcome with the RFLink 'RF Signal Learning' mechanism from RFLink Rev 46 (11 March 2017). [Link to further detail.](http://www.rflink.nl/blog2/faq#RFFind)

### Technical Overview

- The`rflink` Python module is an asyncio transport/protocol which is setup to fire a callback for every (valid/supported) packet received by the RFLink gateway.
- This integration uses this callback to distribute 'rflink packet events' over [Home Assistant's event bus](/docs/configuration/events/) which can be subscribed to by entities/platform implementations.
- The platform implementation takes care of creating new devices (if enabled) for unseen incoming packet ID's.
- Device entities take care of matching to the packet ID, interpreting and performing actions based on the packet contents. Common entity logic is maintained in this main component.

### Debug Logging

For debugging purposes or context when investigating issues you can enable debug logging for RFLink with the following configuration snippet:

```yaml
logger:
  default: error
  logs:
    rflink: debug
    homeassistant.components.rflink: debug
```

This will give you output looking like this:

```bash
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: 20;00;Nod
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: o RadioFrequencyLink - R
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: FLink Gateway V1.1 - R45
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: ;
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] got packet: 20;00;Nodo RadioFrequencyLink - RFLink Gateway V1.1 - R45;
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] decoded packet: {'firmware': 'RFLink Gateway', 'revision': '45', 'node': 'gateway', 'protocol': 'unknown', 'hardware': 'Nodo RadioFrequencyLink', 'version': '1.1'}
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] got event: {'version': '1.1', 'firmware': 'RFLink Gateway', 'revision': '45', 'hardware': 'Nodo RadioFrequencyLink', 'id': 'rflink'}
17-03-07 20:12:05 DEBUG (MainThread) [homeassistant.components.rflink] event of type unknown: {'version': '1.1', 'firmware': 'RFLink Gateway', 'revision': '45', 'hardware': 'Nodo RadioFrequencyLink', 'id': 'rflink'}
```
