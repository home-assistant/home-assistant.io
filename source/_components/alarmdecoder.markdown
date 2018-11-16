---
layout: page
title: "AlarmDecoder Alarm"
description: "Instructions on how to integrate a DSC/Honeywell alarm panel with Home Assistant using an AlarmDecoder device."
date: 2017-04-02 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: alarmdecoder.png
ha_category: Hub
ha_release: 0.43
ha_iot_class: "Local Push"
---

The `alarmdecoder` component will allow Home Assistant users who own either a DSC or Honeywell alarm panel to leverage their alarm system and its sensors to provide Home Assistant with rich information about their homes. Connectivity between Home Assistant and the alarm panel is accomplished through a device produced by Nu Tech Software Solutions, known as the AlarmDecoder. The AlarmDecoder devices provide a serial, TCP/IP socket or USB interface to the alarm panel, where it emulates an alarm keypad.

Please visit the [AlarmDecoder website](https://www.alarmdecoder.com/) for further information about the AlarmDecoder devices.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.alarmdecoder/): Reports on zone status
- [Sensor](/components/sensor.alarmdecoder/): Emulates a keypad display
- [Alarm Control Panel](/components/alarm_control_panel.alarmdecoder/): Reports on alarm status, and can be used to arm/disarm the system

This is a fully event-based component. Any event sent by the AlarmDecoder device will be immediately reflected within Home Assistant.

An `alarmdecoder` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
alarmdecoder:
  device:
    type: socket
    host: 192.168.1.20
    port: 10000
  panel_display: false
  zones:
    01:
      name: 'Smoke Detector'
      type: 'smoke'
      rfid: '0123456'
    02:
      name: 'Front Door'
      type: 'opening'
```

{% configuration %}
device:
  description: List of variables for the AlarmDecoder device.
  required: true
  type: list
  keys:
    type:
      description: "The type of AlarmDecoder device: socket, serial or USB."
      required: true
      default: socket
      type: string
    host:
      description: The IP address of the AlarmDecoder device on your home network, if using socket type.
      required: false
      default: localhost
      type: string
    port:
      description: The IP address of the AlarmDecoder device on your home network, if using socket type.
      required: false
      default: 10000
      type: integer
    path:
      description: The path of the AlarmDecoder device, if using serial type.
      required: false
      default: "/dev/ttyUSB0"
      type: string
    baudrate:
      description: The baud rate of the AlarmDecoder device, if using serial type.
      required: false
      default: 115200
      type: string
panel_display:
  description: Create a sensor called sensor.alarm_display to match the Alarm Keypad display.
  required: false
  default: false
  type: boolean
zones:
  description: "AlarmDecoder has no way to tell us which zones are actually in use, so each zone must be configured in Home Assistant. For each zone, at least a name must be given. For more information on the available zone types, take a look at the [Binary Sensor](/components/binary_sensor.alarmdecoder/) docs. *Note: If no zones are specified, Home Assistant will not load any binary_sensor components.*"
  required: false
  type: list
  keys:
    name:
      description: A name for the zone.
      required: true
      type: string
    type:
      description: "A type for the zone. Here you can find a list of [Device Classes](https://www.home-assistant.io/components/binary_sensor/#device-class)."
      required: false
      default: opening
      type: string
    rfid:
      description: The RF serial-number associated with RF zones. Providing this field allows Home Assistant to associate raw sensor data to a given zone, allowing direct monitoring of the state, battery, and supervision status.
      required: false
      type: string
    loop:
      description: The loop number associated with RF zones (1, 2, 3, or 4). Providing this field allows Home Assistant to read open/closed status from the raw sensor data in addition to from the panel display, meaning it can correctly show a bypassed RF zone as open or closed when the alarm is armed. (This is an alternative to relayaddr/relaychan below for RF zones.)
      required: false
      type: integer
    relayaddr:
      description: "Address of the relay expander board to associate with the zone. (ex: 12, 13, 14, or 15). Typically used in cases where a panel will not send bypassed zones such as motion during an armed home state, the Vista 20P is an example of this. Alarmdecoder can emulate a zone expander board and the panel can be programmed to push zone events to this virtual expander. This allows the bypassed zone binary sensors to be utilized. One example is using bypassed motion sensors at night for motion-based automated lights while the system is armed with the motion sensor bypassed."
      required: inclusive
      type: integer
    relaychan:
      description: "Channel of the relay expander board to associate with the zone. (ex: 1, 2, 3, or 4)"
      required: inclusive
      type: integer
{% endconfiguration %}
