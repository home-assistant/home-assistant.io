---
layout: page
title: "Caller ID Sensor"
description: "Instructions how to integrate the Caller ID sensor into Home Assistant."
date: 2017-02-20 22:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: ""
ha_release: 0.39
---


The `modem_callerid` sensor platform uses an available modem for collecting caller ID information.

To enable the sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: modem_callerid

```

Configuration variables:

- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `modem_callerid`.
- **device** (*Optional*): Device port name. Defaults to `/dev/ttyACM0`.

To find the path of your USB modem, run:

`$ ls /dev/ttyACM*`

If `hass` runs with another user (e.g. *homeassistant* on Hassbian) give access to the stick with:

`$ sudo usermod -a -G dialout homeassistant`

Depending on what's plugged into your USB ports, the name found above may change. You can lock in a name, such as `/dev/modem`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/).


