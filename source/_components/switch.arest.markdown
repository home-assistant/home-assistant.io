---
layout: component
title: "aREST switch"
description: "Instructions how to integrate aREST switches within Home Assistant."
date: 2015-09-11 23:15
sidebar: true
comments: false
sharing: true
footer: true
logo: arest.png
ha_category: Switch
---


The arest switch platform allows you to toggle pins of your devices (like Arduino boards with a ethernet/wifi connection, ESP8266 based devices, and the Raspberry Pi) running the [aREST](http://arest.io/) RESTful framework.

To use your aREST enabled device in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: arest
  resource: http://IP_ADDRESS
  name: Office
  pins:
    11:
      name: Fan
    12:
      name: Light Desk
```

Configuration variables:

- **resource** (*Required*): IP address and schema of the device that is exposing an aREST API, eg. http://192.168.1.10.
- **name** (*Optional*): Let you overwrite the the name of the device. By default *name* from the device is used.
- **pins** (*Required*): An array with all used pins of your board.
  - **name** (*Required*): The name of the pin you wish to toggle.

Accessing one of the endpoints (eg. http://192.168.1.10/analog/2/) will give you a JSON response. The interesting part is `return_value` which represents the sensor's data.

```json
{"return_value": 34, "id": "sensor02", "name": "livingroom", "connected": true}
```

