---
title: Analytics Insights
description: Instructions on how to integrate Analytics Insights within Home Assistant.
ha_category:
  - Sensor
ha_release: '2024.2'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: homeassistant_analyitcs
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Analytics Insights** {% term integration %} allows you to get integration usage statistics into Home Assistant.

Only integrations with more than 0 active installations will be displayed. This means it will take some time until new integrations are showing in the integration.

{% include integrations/config_flow.md %}
