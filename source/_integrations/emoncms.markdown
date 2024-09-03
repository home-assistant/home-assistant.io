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
---

The `emoncms` sensor {% term integration %} creates sensors for the feeds available in your local or cloud based version of [Emoncms](https://emoncms.org).

To write information from Home Assistant to Emoncms, you can use the [`emoncms_history`](/integrations/emoncms_history) {% term integration %}.

{% include integrations/config_flow.md %}
