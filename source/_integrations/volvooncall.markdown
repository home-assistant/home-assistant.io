---
title: Volvo On Call
description: Instructions for how to integrate Volvo On Call into Home Assistant.
ha_category:
  - Car
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: volvooncall
ha_platforms:
  - binary_sensor
  - device_tracker
  - lock
  - sensor
  - switch
ha_codeowners:
  - '@molobrakos'
ha_integration_type: integration
ha_config_flow: true
---

> [!NOTE]
> This integration will be removed in Home Assistant 2026.3, because the Volvo On Call API has been disabled by Volvo. Migrate to the [Volvo integration](https://www.home-assistant.io/integrations/volvo/) instead.