---
title: alpha innotec Luxtronik
description: Instructions on how to integrate alpha innotec Luxtronik 2.0/2.1 heatpump controller components into Home Assistant.
ha_category:
  - Water Heater
ha_release: 2023.2.0
ha_iot_class: Local Polling
ha_domain: luxtronik
ha_config_flow: true
ha_ssdp: false
ha_platforms:
  - water_heater
ha_codeowners:
  - '@BenPru'
ha_integration_type: hub
---

The alpha innotec Luxtronik integration for Home Assistant allows you to integrate [Luxtronik 2.0/2.1 heatpumps](https://files.ait-group.net/alp/01%20Waermepumpen/05%20Regler/LUX/) devices like water heater.

There is currently support for the following device types within Home Assistant:

- Water Heater

Additionally, we also support to trigger smarthome templates.

#### Tested Devices

- [Novelan LAD7](https://www.novelan.com/endkunde/produktloesungen/waermepumpen/produktkatalog/detailseite/lad-7-csd.html)

{% include integrations/config_flow.md %}
