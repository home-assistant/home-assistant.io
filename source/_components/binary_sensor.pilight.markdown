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
ha_category: Binary Sensor
ha_release: 0.44
ha_iot_class: "Local Polling"
---

The `pilight` binary sensor platform implement the
[pilight hub](/components/pilight/) binary sensor functionality.
Two type of Pilight binary sensor configuration available. A normal sensor which
send the on and off state cyclical and a trigger sensor which send only a
trigger when an event happened (for example lots of cheap PIR motion detector).

To enable a Pilight binary sensor in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    variable: 'state'
```

{% configuration %}
variable:
  description: The variable name in the data stream that defines the sensor value.
  required: true
  type: string
payload:
  description: >
    "Message payload identifiers.
    Only if all identifiers are matched the sensor value is set."
  required: true
  type: string
name:
  description: Name of the sensor.
  required: false
  type: string
payload_on:
  description: "Variable `on` value. The component will recognize this as logical '1'."
  required: false
  type: string
payload_off:
  description: "Variable `off` value. The component will recognize this as logical '0'."
  required: false
  type: string
disarm_after_trigger:
  description: Configure sensor as trigger type.
  required: false
  type: boolean
reset_delay_sec:
  description: >
    "Seconds before the sensor is disarmed if
    `disarm_after_trigger` is set to true."
  required: false
  type: int
  default: 30
{% endconfiguration %}

A full configuration example could look like this:

```yaml
# Example configuration.yml entry
binary_sensor:
  - platform: pilight
    name: 'Motion'
    variable: 'state'
    payload:
      unitcode: 371399
    payload_on: 'closed'
    disarm_after_trigger: true
    reset_delay_sec: 30
```
