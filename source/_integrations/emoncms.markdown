---
title: Emoncms
description: Instructions on how to integrate Emoncms feeds as sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.29
ha_iot_class: Local Polling
ha_domain: emoncms
ha_codeowners:
  - '@borpin'
  - '@alexandrecuer'
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The `emoncms` sensor {% term integration %} creates sensors for the feeds available in your local or cloud based version of [Emoncms](https://emoncms.org).

To write information from Home Assistant to Emoncms, you can use the [`emoncms_history`](/integrations/emoncms_history) {% term integration %}.

An API key, which you can find in your local or cloud based Emoncms account settings, is required to use this service. 

{% include integrations/config_flow.md %}

## Sensors

- **energy** in Wh, kWh
- **power** in W
- **voltage** in V
- **current** in A
- **apparent power** in VA
- **temperature** in °C, °F or K
- **frequency** in Hz
- **pressure** in hPa
