---
layout: page
title: "KNX Binary Sensor"
description: "Instructions how to setup the KNX binary sensors within Home Assistant."
date: 2016-07-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Binary Sensor
ha_release: 0.24
ha_iot_class: "Local Polling"
---

The `knx` sensor platform allows you to monitor [KNX](http://www.knx.org) binary sensors.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: knx
    name: "Entrance.Motion.Sensor"
    address: '6/0/2'
    device_class: 'motion'
    #significant_bit: 2
    #reset_after: 100
```

Configuration variables:

- **name** (*Optional*): A name for this device used within Home Assistant.
- **address**: KNX group address of the binary sensor.
- **device_class** (Optional): HASS device class e.g. "motion".
- **significant_bit** (Optional): Specify which significant bit of the KNX value should be used. Default is 1.
- **reset_after** (Optional): Reset back to OFF state after specified milliseconds.

You can also attach actions to binary sensors (e.g., to switch on a light when a switch was pressed). In this example, one light is switched on when the button was pressed once and two others when the button was pressed a second time.

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: knx
    name: Livingroom.3Switch3
    address: '5/0/26'
    automation:
      - counter: 1
        hook: 'on'
        action:
          - entity_id: light.hue_color_lamp_1
            service: homeassistant.turn_on
      - counter: 2
        hook: 'on'
        action:
          - entity_id: light.hue_bloom_1
            service: homeassistant.turn_on
          - entity_id: light.hue_bloom_2
            service: homeassistant.turn_on
```

Configuration variables:

- **name** (*Optional*): A name for this device used within Home Assistant.
- **counter** (*Optional*): Set to 2 if your only want the action to be executed if the button was pressed twice. To 3 for three times button pressed. Defaults to 1.
- **hook** (Optional): Indicates if the automation should be executed on what state of the binary sensor. Values: "on" or "off". Defaults to "on".
- **action**: Specify a list of actions analog to the [automation rules](/docs/automation/action/).

