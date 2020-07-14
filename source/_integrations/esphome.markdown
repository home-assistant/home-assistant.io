---
title: ESPHome
description: Support for ESPHome devices using the native ESPHome API.
featured: true
ha_category:
  - DIY
ha_release: 0.85
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@OttoWinter'
ha_domain: esphome
---

This integration allows you to connect your [ESPHome](https://esphome.io) devices directly to Home Assistant with the [native ESPHome API](https://esphome.io/components/api.html).

## Set up the integration via the integrations screen

Menu: *Configuration* > *Integrations*

Press on **ESPHome** and configure the integration:

* Enter the address and port of your node. For example, if the node is called `livingroom`, the address would be `livingroom.local` and the port number would be `6053` (default).

Home Assistant will then try to connect to the device. If you have a password set, Home Assistant will also ask you for it. After that, all the entities you have configured on your ESPHome node will automatically appear in Home Assistant.
