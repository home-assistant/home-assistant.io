---
title: OSO Energy
description: Instructions on how to integrate OSO Energy devices with Home Assistant.
ha_release: '2024.1'
ha_category:
  - Sensor
  - Water Heater
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@osohotwateriot'
ha_domain: osoenergy
ha_platforms:
  - water_heater
ha_config_flow: true
ha_integration_type: integration
---

The OSO Energy integration for Home Assistant allows you to interact with supported devices and services offered by [OSO Energy](https://www.osoenergy.no)

This OSO Energy integration uses a subscription key, which a user can create for his account on the [OSO Energy website](https://portal.osoenergy.no/), to configure it within Home Assistant. Once configured Home Assistant will detect and add all OSO Energy devices.

{% include integrations/config_flow.md %}

## Platforms

### Water Heater

The OSO Energy water heater platform integrates your OSO Energy devices into Home Assistant.

The platform supports the following OSO Energy devices:

- Water Heaters
