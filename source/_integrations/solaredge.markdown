---
title: SolarEdge
description: Instructions on how to integrate SolarEdge sensor within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: solaredge
ha_dhcp: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@frenck'
  - '@bdraco'
ha_integration_type: device
---

The SolarEdge integration allows you to get details from your SolarEdge solar power setup and integrate these in your Home Assistant installation.

To integrate it, you need your installation ID and an API key. You can get these by logging in to your [SolarEdge web portal](https://monitoring.solaredge.com/). Note: if your portal is not in English, the labels will be different.

- Click on Admin and scroll down to API Access
- Click on "Generate key"
- Click on Save

Data is updated every 15 minutes to stay within the daily rate limit of 300 requests per day.

{% include integrations/config_flow.md %}
