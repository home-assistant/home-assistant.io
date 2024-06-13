---
title: Kraken
description: Instructions on how to integrate Kraken.com sensors into Home Assistant.
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2021.6
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
ha_domain: kraken
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Kraken integration allows you to monitor exchange rates on [kraken.com](https://www.kraken.com/).
For a list of tradable asset pairs check [this kraken support article](https://support.kraken.com/hc/articles/201893658-Currency-pairs-available-for-trading-on-Kraken).

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Update interval:
  description: "Seconds between updates"
Tracked Asset Pairs:
  description: "Select the assets you want to track. This list is automatically updated with a list of tradable assets on kraken.com"
{% endconfiguration_basic %}
