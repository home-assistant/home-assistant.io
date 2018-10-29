---
layout: page
title: "LegrandInOne"
description: "Instructions on how to integrate LegrandInOne gateway into Home Assistant."
date: 2018-01-04
sidebar: true
comments: false
sharing: true
footer: true
logo: myopen.png
ha_category: Hub
ha_release: 0.XX
---

The `legrandinone` platform supports devices that use Legrand 88213 PLC to USB gateway, Might be extended to work with Legrand 88328 USB to Zigbee interface.

This component supports driving OpenWebNet devices like shutters, light switches, and light variators.

This component is tested with the following hardware/software:

- Legrand 88213 USB to PLC

To enable LegrandInOne in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
legrandinone:
  port: /dev/serial/by-id/usb-id01234
```

Configuration variables:

- **port** (*Required*): The path to Legrand 88213 USB/serial device or TCP port in TCP mode.
- **host** (*Optional*): Switches to TCP mode, connects to host instead of to USB/serial.
- **reconnect_interval** (*Optional*): Time in seconds between reconnect attempts.

Complete example:

```yaml
# Example configuration.yaml entry
legrandinone:
  port: /dev/serial/by-id/usb-id01234
```

### {% linkable_title TCP mode %}

TCP mode allows you to connect to an LegrandInOne device over a TCP/IP network. This is useful if placing the RFLink device next to the HA server is not optimal or desired (eg: bad reception).

To expose the USB/serial interface over TCP on a different host (Linux) the following command can be used:

```bash
$ socat /dev/ttyACM0,b115200 TCP-LISTEN:1234,reuseaddr
```

Other methods of exposing the serial interface over TCP are possible (eg: ser2net tool under linux). Essentially the serial stream should be directly mapped to the TCP stream.

```yaml
# Example configuration.yaml entry
legrandinone:
  host: 192.168.0.10
  port: 1234
```

### {% linkable_title Adding devices Automatically %}

In order to have your devices discovered automatically, you need to add the following to the configuration.
When any remote device transmits a message on bus, LegrandInOne detects the signal and the device should be added automatically to Home Assistant.

```yaml
light:
  - platform: legrandinone
    automatic_add: true
cover:
  - platform: legrandinone
    automatic_add: true
```

### {% linkable_title Device support %}

Even though a lot of devices are supported by LegrandInOne, not all have been tested/implemented. If you have a device supported by LegrandInOne but not by this component please consider testing and adding support yourself.

### {% linkable_title Technical Overview %}

- The`iobl` Python module is an asyncio transport/protocol which is setup to fire a callback for every (valid/supported) packet received by the LegrandInOne gateway.
- This component uses this callback to distribute 'iobl packet events' over [Home Assistant's event bus](/docs/configuration/events/) which can be subscribed to by entities/platform implementations.
- The platform implementation takes care of creating new devices (if enabled) for unseen incoming LegrandInOne ID's.
- Device entities take care of matching to the packet ID, interpreting and performing actions based on the packet contents. Common entity logic is maintained in this main component.

### {% linkable_title Debug Logging %}

For debugging purposes or context when investigating issues you can enable debug logging for LegrandInOne with the following config snippet:

```yaml
logger:
  default: error
  logs:
    iobl: debug
    homeassistant.components.legrandinone: debug
```

This will give you output looking like this:

```bash
17-03-07 20:12:05 DEBUG (MainThread) [iobl.protocol] received data: *2*1*0#15786305##
17-03-07 20:12:05 DEBUG (MainThread) [iobl.protocol] got packet: *2*1*0#15786305##
17-03-07 20:12:05 DEBUG (MainThread) [iobl.protocol] decoded packet: {'command': '', 'media': 'plc', 'type': 'bus_command', 'mode': 'broadcast', 'who': 'automation', 'legrand_id': '986644', 'what': 'move_up', 'unit': '1'}
17-03-07 20:12:05 DEBUG (MainThread) [iobl.protocol] got packet: {'command': '', 'media': 'plc', 'type': 'bus_command', 'mode': 'broadcast', 'who': 'automation', 'legrand_id': '986644', 'what': 'move_up', 'unit': '1'}
17-03-07 20:12:05 DEBUG (MainThread) [homeassistant.components.iobl] event of type bus_command: {'command': '', 'media': 'plc', 'type': 'bus_command', 'mode': 'broadcast', 'who': 'automation', 'legrand_id': '986644', 'what': 'move_up', 'unit': '1'}
```
