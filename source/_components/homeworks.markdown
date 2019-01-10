---
layout: page
title: "Homeworks Hub"
description: "How to use Lutron Homeworks Series 4 & 8 with Home Assistant."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Hub
featured: False
ha_release: 0.85
ha_iot_class: "Local Push"
redirect_from:
 - /components/binary_sensor.homeworks/
---

[Lutron](http://www.lutron.com/) is an American lighting control company. The Lutron Homeworks Series 4 & 8 systems are relatively old (~2003), and use RS-232 connections to communicate with home automation systems.  The `homeworks` component in Home Assistant is responsible for communicating with the main controller for these systems.  Communication is through an ethernet to serial converter (NPort, for example).

Only a subset of the Homeworks system is supported - lights and keypads.

Lutron has created many systems over the years, each with their own unique interfacing protocol.  There are three Homeworks systems - QS, Series 4 & 8, and original.  This platform is only for Series 4 & 8.  There is another component [lutron](/components/lutron/) which handles Lutron RadioRA 2 systems.

Homeworks keypad buttons are momentary switches.  The button is pressed and released, meaning that there is no "state".  Buttons generate `homeworks_button_press` and `homeworks_button_release` events.  These events contain the "id", "name", and "button" of the button that was pressed.  "id" is derived from "name", and "button" is the number of the button on the keypad (starting at 1).

## {% linkable_title Configuration %}

The protocol for automatically extracting device information from the controller isn't documented, so the `homeworks` component must be configured manually. To use Lutron Homeworks devices in your installation, add the following to your `configuration.yaml` file:

``` yaml
# Example configuration.yaml entry
homeworks:
  host: IP_ADDRESS
  port: 4001
  dimmers:
    - addr: "[02:08:01:01]"
      name: "Foyer Sconces"
    - addr: "[02:08:01:02]"
      name: "Foyer Downlights"
      rate: 2

  keypads:
    - addr: "[02:08:02:01]"
      name: "Foyer Keypad"
```

{% configuration %}
host:
  description: The IP address of the ethernet to serial adapter.  It is assumed that the adaptor has been preconfigured.
  required: true
  type: string
port:
  description: The port of the ethernet to serial adapter.
  required: true
  type: port
dimmers:
  description: List of dimmers.
  required: false
  type: list
  keys:
    addr:
      description: The unique address of the dimmer on the controller. The quotes, brackets, and number formatting must be of the form `"[##:##:##:##]"`.
      required: true
      type: string
    name:
      description: The name of the sensor will be the title of the button +`"_"` + the name of the keypad/
      required: true
      type: string
    rate:
      description: The amount of time (in seconds) for the light to transition to a new brightness level.
      required: false
      type: float
      default: 1
keypads:
  description: List of keypads.
  required: false
  type: list
  keys:
    addr:
      description: The unique address of the keypad on the controller. The quotes, brackets, and number formatting must be of the form `"[##:##:##:##]"`.
      required: true
      type: string
    name:
      description: The name of the keypad.
      required: true
      type: string
{% endconfiguration %}
