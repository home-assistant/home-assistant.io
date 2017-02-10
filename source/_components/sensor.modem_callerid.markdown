---
layout: page
title: "Caller ID Sensor"
description: "Instructions how to integrate the Caller ID sensor into Home Assistant."
date: 2017-02-09 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: ""
ha_release: 0.38
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
- **code** (*Optional*): Hayes AT command string to enable caller ID. Defaults to `AT#CID=1`.

