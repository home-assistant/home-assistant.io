---
title: "Zehnder ComfoAir Ventilation"
description: "Instructions on how to integrate Zehnder ComfoAir 350 ventilation systems into Home Assistant."
logo: zehnder.png
ha_category:
  - Fan
  - Sensor
ha_release: 0.101
---

The `comfoair` integration lets you control Zehnder ComfoAir [350](https://www.international.zehnder-systems.com/products-and-systems/comfosystems/zehnder-comfoair-350) ventilation units from Home Assistant. A serial connection is needed to connect the unit to Home Assistant.

The integration has a fan platform to view and control the ventilation speed, and a sensors platform to read out various temperatures. It passively listens to messages exchanged between CC Ease control units and the system board. It can take control of the system temporarily to set fan speeds.

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
comfoair:
  serial_port: /dev/ttyUSB0
```

{% configuration %}
serial_port:
  description: The serial port or socket:// URL connected to the ComfoAir unit.
  required: true
  type: string
name:
  description: The name of this device as you want to see it in Home Assistant.
  required: false
  default: ComfoAir
  type: string
{% endconfiguration %}

## Service `virtualkey`

You can use the service virtualkey to emulate a keypress from a CC Ease control unit.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `mask` | No | Mask of keys to press: 1=fan, 2=mode, 4=clock, 8=temp, 16=plus, 32=minus |
| `type` | Yes | Event to send: PRESS_LONG or PRESS_SHORT (default). |

Example:

```yaml
service: comfoair.virtualkey
data:
  mask: 2
```
