---
layout: page
title: "Arduino Sensor"
description: "Instructions how to integrate Arduino boards pins as sensors within Home Assistant."
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


The `arduino` sensor platform allows you to get an numerical values from an analog input pin of an [Arduino](https://www.arduino.cc/) board. Usually the value is between 0 and 1024. 

To enable an Arduino sensor with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: arduino
  pins:
    1:
      name: Door switch
    0:
      name: Brightness
```

{% configuration %}
pins:
  description: List of pins to use.
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
{% endconfiguration %}

The 6 analog pins of an Arduino UNO are numbered from A0 to A5.

