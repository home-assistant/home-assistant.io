---
layout: page
title: "Pilight Binary Sensor"
description: "Instructions how to integrate pilight binary sensors within Home Assistant."
date: 2017-03-24 20:41
sidebar: true
comments: false
sharing: true
footer: true
logo: pilight.png
ha_category: Binary Sensor
ha_release: 0.44
ha_iot_class: Local Poll
---

This component implement the [pilight hub](https://github.com/home-assistant/home-assistant.github.io/source/_components/pilight.markdown)  binary sensor functionality.
Two type of pilight binary sensor configuration available. A normal sensor which send the on and off state cyclical and a trigger sensor which send only a trigger when an event happend (for example lots of cheap PIR motion detector) (see example configuration below).

```yaml
# Example configuration.yml entry
binary_sensor:
  - platform: pilight
    name: 'Motion'
    variable: 'state'
    payload:
      unitcode: 371399
    payload_on: 'closed'
    disarm_after_trigger: True  <-- use this if you want trigger type behavior
```

Configuration variables:
- **variable** (*Required*): The variable name in the data stream that defines the sensor value.
- **payload** (*Required*): Message payload identifiers. Only if all identifiers are matched the sensor value is set.
- **name** (*Optional*): Name of the sensor.
- **payload_on** (*Optional*): Variable `on` value. The component will recognize this as logical '1'.
- **payload_off** (*Optional*): Variable `off` value. The component will recognize this as logical '0'.
- **disarm_after_trigger:** (*Optional*): Configure sensor as trigger type.
