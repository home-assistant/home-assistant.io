---
layout: page
title: "Pilight Binary Sensor"
description: "Instructions on how to integrate Pilight binary sensors within Home Assistant."
date: 2017-03-24 20:41
sidebar: true
comments: false
sharing: true
footer: true
logo: pilight.png
ha_category: DIY
ha_release: 0.44
ha_iot_class: "Local Polling"
---

The `pilight` binary sensor platform implement the [pilight hub](/components/pilight/) binary sensor functionality. Two type of Pilight binary sensor configuration available. A normal sensor which send the on and off state cyclical and a trigger sensor which send only a trigger when an event happened (for example lots of cheap PIR motion detector).

## {% linkable_title Configuration %}

To enable a Pilight binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    variable: 'state'
```

Configuration variables:

- **variable** (*Required*): The variable name in the data stream that defines the sensor value.
- **payload** (*Required*): Message payload identifiers. Only if all identifiers are matched the sensor value is set.
- **name** (*Optional*): Name of the sensor.
- **payload_on** (*Optional*): Variable `on` value. The component will recognize this as logical '1'.
- **payload_off** (*Optional*): Variable `off` value. The component will recognize this as logical '0'.
- **disarm_after_trigger:** (*Optional*): Configure sensor as trigger type.
- **reset_delay_sec** (*Optional*): Seconds before the sensor is disarmed if `disarm_after_trigger` is set to true. Default is 30 seconds.

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    name: 'Motion'
    variable: 'state'
    payload:
      unitcode: 371399
    payload_on: 'closed'
    disarm_after_trigger: True
    reset_delay_sec: 30
```
