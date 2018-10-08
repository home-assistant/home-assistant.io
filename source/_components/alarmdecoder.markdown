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
  panel_display: On
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
type:
  description: The type of AlarmDecoder device, optional values: `socket`, `serial` or `USB`
  required: true
  type: map
host:
  description: The IP address of the AlarmDecoder device on your home network, if using socket type. Default: `localhost`
  required: false
  type: map
port:
  description: The port of the AlarmDecoder device on your home network, if using socket type. Default: `10000`
  required: false
  type: integer
path:
  description: The path of the AlarmDecoder device, if using socket type. Default: `/dev/ttyUSB0`
  required: false
  type: string
baudrate:
  description: The baud rate of the AlarmDecoder device, if using serial type. Default: `115200`
  required: false
  type: string
panel_display:
  description: Create a sensor called sensor.alarm_display to match the Alarm Keypad display. Default: `off`
  required: false
  type: boolean
zones:
  description: AlarmDecoder has no way to tell us which zones are actually in use, so each zone must be configured in Home Assistant. For each zone, at least a name must be given. For more information on the available zone types, take a look at the [Binary Sensor](/components/binary_sensor.alarmdecoder/) docs. *Note: If no zones are specified, Home Assistant will not load any binary_sensor components.* 
  required: false
  type: string
rfid:
  description: The RF serial-number associated with RF zones. Providing this field allows Home Assistant to associate raw sensor data to a given zone, allowing direct monitoring of the state, battery, and supervision status.
  required: false
  type: string
relayaddr:
  description: Address of the relay expander board to associate with the zone. (ex: 12, 13, 14, or 15). Typically used in cases where a panel will not send bypassed zones such as motion during an armed home state, the Vista 20P is an example of this. Alarmdecoder can emulate a zone expander board and the panel can be programmed to push zone events to this virtual expander. This allows the bypassed zone binary sensors to be utilized. One example is using bypassed motion sensors at night for motion-based automated lights while the system is armed with the motion sensor bypassed.
  required: inclusive
  type: string
relaychan:
  description: Channel of the relay expander board to associate with the zone. (ex: 1, 2, 3, or 4)
  required: inclusive
  type: string
{% endconfiguration %}
