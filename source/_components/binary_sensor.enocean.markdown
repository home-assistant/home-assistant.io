---
layout: page
title: "EnOcean Binary Sensor"
description: "Instructions on how to set up EnOcean binary sensors within Home Assistant."
date: 2016-05-25 23:49
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Binary Sensor
ha_release: 0.21
ha_iot_class: "Local Push"
---

This can typically be one of those batteryless wall switches. Currently only one type has been tested: Eltako FT55 which uses the EnOcean PTM 215 module. All switches using this module are expected to work. Other devices will most likely not work without changing the Home Assistant code.

To use your EnOcean device, you first have to set up your [EnOcean hub](/components/enocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

Configuration variables:

- **id** (*Required*): The ID of the device. This is the 4 bytes long number written on the dimmer.
- **name** (*Optional*): An identifier for the switch in the frontend.
- **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.

EnOcean binary sensors only generate 'button_pressed' events. The event data has following four fields:

 - **id**: The ID of the device (see configuration).
 - **pushed**: `1` for a button press, `0` for a button release.
 - **which**: Always `0` when using the single rocket.  `0` or `1` when using the dual rocket switch.
 - **onoff**: `0` or `1` for either side of the rocket.

Sample automation to switch lights on and off:

```yaml
# Example automation to turn lights on/off on button release
automation:
  - alias: hall light switches
    trigger:
      platform: event
      event_type: button_pressed
      event_data:
        id: [0xYY, 0xYY, 0xYY, 0xYY]
        pushed: 0
    action:
      service_template: "{% raw %}{% if trigger.event.data.onoff %} light.turn_on {% else %} light.turn_off {%endif %}{% endraw %}"
      data_template:
        entity_id: "{% raw %}{% if trigger.event.data.which == 1 %} light.hall_left {% else %} light.hall_right {%endif %}{% endraw %}"
```
