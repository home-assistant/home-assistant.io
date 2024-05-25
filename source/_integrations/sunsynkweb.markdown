
---
title: Sunsynk web
description: HomeAssistant integration to gather statistics from [Sunsynk connect](http://sunsynk.org) REST API
ha_category:
  - Energy
  - Sensor
ha_release: TBD
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@francoisverbeek'
ha_domain: sunsynkweb
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

This is an integration to gather statistics from [Sunsynk connect](http://sunsynk.org). It exposes real-time and historical information.

This will log into your Sunsynk account and will collate the information of any plants or inverters and present the main sensors for the plant, real-time and historical.

{% include integrations/config_flow.md %}
