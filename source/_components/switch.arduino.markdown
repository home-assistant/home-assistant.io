---
layout: page
title: "Arduino Switch"
description: "Instructions how to integrate Arduino boards pins as switches within Home Assistant."
date: 2015-09-14 18:28
sidebar: true
comments: false
sharing: true
footer: true
logo: arduino.png
ha_category: DIY
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `arduino` switch platform allows you to control the digital pins of your [Arduino](https://www.arduino.cc/) board. Support for switching pins is limited to high/on and low/off of the digital pins. PWM (pin 3, 5, 6, 9, 10, and 11 on an Arduino Uno) is not supported yet.

To enable the Arduino pins with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: arduino
  pins:
    11:
      name: Fan Office
    12:
      name: Light Desk
      initial: true
      negate: true
```

{% configuration %}
pins:
  description: List of of pins to use.
  required: true
  type: map
  keys:
    pin_number:
      description: The pin number that corresponds with the pin numbering schema of your board.
      required: true
      type: map
      keys:
        name:
          default: Name that will be used in the frontend for the pin.
          type: string
          required: false
        initial:
          default: The initial value for this port.
          type: boolean
          required: false
          default: false
        negate:
          default: If this pin should be inverted.
          type: boolean
          required: false
          default: false
{% endconfiguration %}

The digital pins are numbered from 0 to 13 on a Arduino UNO. The available pins are 2 till 13. For testing purposes you can use pin 13 because with that pin you can control the internal LED.

