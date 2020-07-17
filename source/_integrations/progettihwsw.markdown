---
title: progettihwsw
description: Instructions on how to integrate the ProgettiHWSW remote relay boards into Home Assistant.
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.114
ha_iot_class: Local Polling
ha_domain: progettihwsw
---

The `progettihwsw` integration brings the automation experience with ProgettiHWSW boards to Home Assistant.

## Binary Sensor

The `progettihwsw` binary sensor platform allows you to read input values of of a [ProgettiHWSW Board](http://www.progetti-hw-sw.it/).

To use your remote board in Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: progettihwsw
    host: IP_ADDRESS_OF_BOARD
    inputs:
      1: Sensor 1
      2: Sensor 2
```

{% configuration %}
host:
  description: IP address and port of remote board
  required: true
  type: string
inputs:
  description: List of input pins.
  required: true
  type: map
  keys:
    "port: name":
      description: The input numbers and names of your choice.
      required: true
      type: string
{% endconfiguration %}

The input numbers for sensors are shown on the board's enclosure and PCB.

## Switch

The `progettihwsw` switch platform allows you to control relays of a [ProgettiHWSW Board](http://www.progetti-hw-sw.it/).

To use your remote board in Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: progettihwsw
    host: IP_ADDRESS_OF_BOARD
    outputs:
      1:
        name: Relay 1
        mode: bistable
      2:
        name: Relay 2
        mode: monostable
```

{% configuration %}
host:
  description: IP Address of remote Raspberry Pi.
  required: true
  type: string
outputs:
  description: List of relay pins with keys as relay numbers.
  required: true
  type: map
  keys:
      name:
        description: Name to use in the frontend.
        required: false
        type: string
      mode:
        description: Relay mode selection between monostable and bistable.
        required: false
        type: string
{% endconfiguration %}

For more information about the boards, visit [our website](http://www.progetti-hw-sw.it/).

### Troubleshooting

There are no known errors with this integration yet. Feel free to submit them to us.
