---
title: Sun WEG
description: Instructions on how to integrate your Sun WEG server solar inverter within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@rokam'
ha_domain: sunweg
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

This is a sensor to collect information from your WEG inverters using [Sun WEG server](https://sunweg.net/).

This will log into your Sun WEG account to choose one "Plant", after which it collects the inverters on this plant and creates sensors for that plant and inverters.

{% include integrations/config_flow.md %}
