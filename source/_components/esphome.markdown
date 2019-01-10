---
layout: page
title: "ESPHome"
description: "Support for ESPHome devices using the native ESPHome API."
date: 2018-12-16 14:20
sidebar: true
comments: false
sharing: true
footer: true
logo: esphome.png
ha_category: DIY
ha_release: 0.85
ha_iot_class: "Local Push"
redirect_from:
 - /components/binary_sensor.esphome/
 - /components/cover.esphome/
 - /components/fan.esphome/
 - /components/light.esphome/
 - /components/switch.esphome/
---

This component allows you to connect your [ESPHome](https://esphomelib.com/esphomeyaml/index.html) devices directly into Home Assistant with the [native ESPHome API](https://esphomelib.com/esphomeyaml/components/api.html).

## {% linkable_title Setup the component via the integrations screen %}

Menu: *Configuration* -> *Integrations*

Press on **ESPHome** and configure the integration:

* Enter the address and port of your ESP. For example if the node is called `livingroom`, the address would be `livingroom.local` and the port number `6053` (default).
* Then Home Assistant will try to connect to the device. If you have a password set Home Assistant will additionally ask you for the password.

After that, all the entities you have configured on your ESPHome node will automatically show up in Home Assistant.
