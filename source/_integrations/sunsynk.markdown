---
title: "Sunsynk"
description: "Integration for Sunsynk inverter data"
ha_release: "2023.1.3"
ha_category:
  - Energy
  - Sensor
ha_iot_class: "Cloud Polling"
ha_config_flow: true
ha_domain: sunsynk
ha_platforms:
  - sensor
ha_codeowners:
  - '@jamesridgway'
---

The Sunsunk integration gets data from the [PowerView Inteless APIs](https://pv.inteless.com/) to allow you to get details from your Sunsynk inverter and integrate these in your Home Assistant installation.

{% include integrations/config_flow.md %}
