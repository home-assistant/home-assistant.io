---
layout: page
title: "esphomelib"
description: "Support for esphomelib devices using the native esphomelib API."
date: 2018-12-16 14:20
sidebar: true
comments: false
sharing: true
footer: true
logo: esphomelib.png
ha_category: DIY
ha_release: 0.85
---

This component allows you to connect your [esphomelib](https://esphomelib.com/esphomeyaml/index.html) devices directly into Home Assistant with the [native esphomelib API](https://esphomelib.com/esphomeyaml/components/api.html).

## {% linkable_title Setup the component via the integrations screen %}

Menu: *Configuration* -> *Integrations*

Press on **esphomelib** and configure the integration:

* Enter your the **address** and **port** of the ESP. For example if the node is called `livingroom`, the address would be `livingroom.local` and the port number `6053` (default).
* Then Home Assistant will try to connect to the device. If you have a password set Home Assistant will additionally ask you for the password.

After that, all the entities you have configured on your esphomelib node will automatically show up in Home Assistant.
