---
layout: page
title: "aREST Switch"
description: "Instructions on how to integrate aREST switches within Home Assistant."
date: 2015-09-11 23:15
sidebar: true
comments: false
sharing: true
footer: true
logo: arest.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.16
---

The `arest` switch platform allows you to toggle pins of your devices (like Arduino boards with an Ethernet/Wifi connection, ESP8266 based devices, and the Raspberry Pi) running the [aREST](http://arest.io/) RESTful framework.

To use your aREST enabled device with pins in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: arest
    resource: http://IP_ADDRESS
    pins:
      11:
        name: Fan
      13:
        name: Switch
        invert: true
```

If you want to use custom functions, then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: arest
    resource: http://IP_ADDRESS
    name: Office
    functions:
      function1:
        name: Light Desk
```
{% configuration %}
resource:
  description: IP address and schema of the device that is exposing an aREST API, e.g., http://192.168.1.10 (no-trailing slash)
  required: true
  type: string
name:
  description: Let you overwrite the name of the device. By default *name* from the device is used.
  required: optional
  type: string
pins:
  description: An array with all used pins.
  required: false
  type: map
  keys:
    name:
      description: The name of the pin to use in the frontend.
      required: true
      type: string
    invert:
      description: If the logic for on/off should be inverted.
      required: false
      type: boolean
      default: false
functions:
  description: An array with all used functions.
  required: false
  type: map
  keys:
    name:
      description: The name to use in the frontend.
      required: true
      type: string
{% endconfiguration %}

You can still switch your pins with a web browser or a command line tool. Use the URL http://192.168.1.10/digital/8/1 to set pin 8 to high/on, the JSON response will give you the feedback.

```json
{"message": "Pin D8 set to 1", "id": "sensor02", "name": "livingroom", "connected": true}
```
