---
title: Kraken
description: Instructions on how to integrate Kraken.com sensors into Home Assistant.
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2021.7
ha_config_flow: true
ha_quality_scale: gold
ha_codeowners:
  - '@eifinger'
ha_domain: kraken
ha_platforms:
  - sensor
---

The `kraken` integration allows you to monitor exchange rates on [kraken.com](https://www.kraken.com/).
For a list of tradable asset pairs check this [this kraken support article](https://support.kraken.com/hc/en-us/articles/201893658-Currency-pairs-available-for-trading-on-Kraken).

### Extra configuration of the integration

You can configure the update rate and tracked asset pairs options through the integration options flow by clicking the gear icon on the top right of the integration details page.

| Option | Description |
| -------| ----------- |
| Update interval | Seconds between updates. |
| Tracked Asset Pairs | Select the assets you want to track. This list is automatically updated with a list of tradable assets on kraken.com |
