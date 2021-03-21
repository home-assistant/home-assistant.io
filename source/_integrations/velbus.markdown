---
title: Velbus
description: Access and control your Velbus devices.
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
  - '@Cereal2nd'
  - '@brefra'
ha_domain: velbus
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - sensor
  - switch
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

{% include integrations/config_flow.md %}

The port string used in the user interface or the configuration file can have 2 formats:

- For a serial device: `/dev/ttyUSB00`
- For a TCP/IP device: `127.0.0.1:3678`
- For the VMBSIG module: `tls://192.168.1.9:27015`

## Services

- `velbus.sync clock`: Synchronize Velbus time to local clock.
- `velbus.set_memo_text`: Show memo text on Velbus display modules.

### Service `velbus.sync_clock`

You can use the service `velbus.sync clock` to synchronize the clock of the Velbus modules to the clock of the machine running Home Assistant. This is the same as the 'sync clock' button at the VelbusLink software.

### Service `velbus.set_memo_text`

You can use the service `velbus.set_memo_text` to provide the memo text to be displayed at Velbus modules like VMBGPO(D) and VMBELO.

| Service data attribute | Optional | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `address`              | no       | The module address in decimal format, which is displayed at the device list at the integration page. |
| `memo_text`            | yes      | Text to be displayed on module. When no memo text is supplied the memo text will be cleared. |

Example:

```yaml
script:
  trash_memo:
    alias: "Trash memo text"
    sequence:
    - data:
        address: 65
        memo_text: "It's trash day"
      service: velbus.set_memo_text
```

## Example automation

The Velbus integration allows you to link a Velbus button (i.e., a button of a [VMBGPOD](https://www.velbus.eu/products/view/?id=416302&lang=en) module) to a controllable entity of Home Assistant.
The actual linking can be realized by two automation rules. One rule to control the device using the push button and a second rule to update the LED state of the push button as soon as the entity state changes.

```yaml
# Control light living from Velbus push_button_10
- id: 'Control_light_living_from_Velbus'
  alias: "Control light living using Velbus push_button_10"
  trigger:
  - entity_id: binary_sensor.push_button_10
    platform: state
    to: "on"
  condition: []
  action:
  - entity_id: light.living
    service: light.toggle

# Keep status LED push_button_10 in sync to status light living
- id: 'Update LED of push_button_10'
  alias: "Update LED state of push_button_10"
  trigger:
  - entity_id: light.living
    platform: state
    to: "on"
  - entity_id: light.living
    platform: state
    to: "off"
  condition: []
  action:
  - condition: or
    conditions:
    - condition: and
      conditions:
      - condition: state
        entity_id: light.led_push_button_10
        state: "on"
      - condition: state
        entity_id: light.living
        state: "off"
    - condition: and
      conditions:
      - condition: state
        entity_id: light.led_push_button_10
        state: "off"
      - condition: state
        entity_id: light.living
        state: "on"
  - entity_id: light.led_push_button_10
    service: light.toggle
```
