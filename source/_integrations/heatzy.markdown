---
title: Heatzy
description: Instructions on how to integrate the Heatzy climate within Home Assistant.
ha_category:
  - Climate
ha_domain: heatzy
ha_release: 2022.12.0
ha_codeowners:
  - '@cyr-ius'
ha_config_flow: true
ha_platforms:
  - climate
  - switch
ha_iot_class: Cloud Polling
---

Heatzy is a connected programmer that allows converting convectors with a pilot wire into a connected system.

For more information on the product [Heatzy](https://heatzy.com/).

{% include integrations/config_flow.md %}

## Integration Entities

Thermal integration will add a climate sensor for each convector with the following options:

    - hvac modes : heat, off
    - preset_modes: none, comfort, eco, away
