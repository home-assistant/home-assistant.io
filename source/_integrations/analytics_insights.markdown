---
title: Home Assistant Analytics Insights
description: Instructions on how to integrate Home Assistant Analytics Insights within Home Assistant.
ha_category:
  - Sensor
ha_release: '2024.2'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: analytics_insights
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Analytics Insights** {% term integration %} allows you to get integration usage statistics into Home Assistant.
The data comes from [Home Assistant Analytics](https://analytics.home-assistant.io/).

Only integrations with one or more active installations will be displayed. This means it will take some time before newly released integrations are visible.

{% include integrations/config_flow.md %}
