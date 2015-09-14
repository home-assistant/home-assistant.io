---
layout: page
title: "Arduino sensor support"
description: "Instructions how to integrate Arduino boards within Home Assistant."
date: 2015-09-14 18:28
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/arduino.png' class='brand pull-right' />
The arduino sensor platform allows allow you to get an numerical values from an analog input pin of an [Arduino](https://www.arduino.cc/) board. Usually the value is between 0 and 1024. 

To enable an Arduino sensor with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: arduino
  pins:
    1:
      name: Door switch
      type: analog
    0:
      name: Brightness
      type: analog
```

Configuration variables:

- **pins** (*Required*): Array of pins to use. The number corresponds with the pin numbering schema of your board.
  - **name**: Name that will be used in the frontend for the pin.
  - **type**: The type of the pin. At the moment only 'analog' is supported.

The 6 analog pins of an Arduino UNO are numbered from A0 to A5.

