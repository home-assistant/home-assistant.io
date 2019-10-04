---
title: "ESPHome"
description: "Support for ESPHome devices using the native ESPHome API."
featured: true
logo: esphome.png
ha_category:
  - DIY
ha_release: 0.85
ha_iot_class: Local Push
---

This integration allows you to connect your [ESPHome](https://esphome.io) devices directly into Home Assistant with the [native ESPHome API](https://esphome.io/components/api.html).

## Setup the integration via the integrations screen

Menu: *Configuration* -> *Integrations*

Press on **ESPHome** and configure the integration:

* Enter the address and port of your ESP. For example if the node is called `livingroom`, the address would be `livingroom.local` and the port number `6053` (default).
* Then Home Assistant will try to connect to the device. If you have a password set Home Assistant will additionally ask you for the password.

After that, all the entities you have configured on your ESPHome node will automatically show up in Home Assistant.
