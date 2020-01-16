---
title: Velbus
description: Access and control your Velbus devices.
logo: velbus.png
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Sensor
  - Switch
  - Light
ha_iot_class: Local Push
ha_release: '0.50'
ha_config_flow: true
ha_codeowners:
  - '@cereal2nd'
---

The `velbus` integration is used to control [Velbus](https://www.velbus.eu/?lang=en) modules. It supports the Velbus USB, Velbus serial and a TCP/IP gateway.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Climate
- Sensor
- Switch
- Cover
- Light

The pushbutton LEDs of input modules are disabled by default. These can be enabled from the `Devices` panel in the `Configuration` page of the web interface.

## Configuration

There are 2 options in configuring the velbus integration:

- Via the Home Assistant user interface where it will let you enter the port string to connect to the Velbus bus.
- Via the Home Assistant `configuration.yaml` file.

```yaml
# Example configuration.yaml entry for a USB or serial interface
velbus:
  port: 'PORT_STRING'
```

## Port String

The port string used in the user interface or the configuration file can have 2 formats:

- For a serial device: /dev/ttyUSB00
- For a tcp/ip device: 127.0.0.1:3678

{% configuration %}
port:
  description: The port where your board is connected to your Home Assistant host.
  required: true
  type: string
{% endconfiguration %}

## Example automation

The Velbus integration allows you to link a Velbus button (i.e., a button of a [VMBGPOD](https://www.velbus.eu/products/view/?id=416302&lang=en) module) to a controllable entity of Home Assistant.
The actual linking can be realized by two automation rules. One rule to control the device using the push button and a second rule to update the LED state of the push button as soon as the entity state changes.

```yaml
# Control light living from Velbus push_button_10
- id: 'Control_light_living_from_Velbus'
  alias: Control light living using Velbus push_button_10
  trigger:
  - entity_id: binary_sensor.push_button_10
    platform: state
    to: 'on'
  condition: []
  action:
  - entity_id: light.living
    service: light.toggle

# Keep status LED push_button_10 in sync to status light living
- id: 'Update LED of push_button_10'
  alias: Update LED state of push_button_10
  trigger:
  - entity_id: light.living
    platform: state
    to: 'on'
  - entity_id: light.living
    platform: state
    to: 'off'
  condition: []
  action:
  - condition: or
    conditions:
    - condition: and
      conditions:
      - condition: state
        entity_id: light.led_push_button_10
        state: 'on'
      - condition: state
        entity_id: light.living
        state: 'off'
    - condition: and
      conditions:
      - condition: state
        entity_id: light.led_push_button_10
        state: 'off'
      - condition: state
        entity_id: light.living
        state: 'on'
  - entity_id: light.led_push_button_10
    service: light.toggle
```
