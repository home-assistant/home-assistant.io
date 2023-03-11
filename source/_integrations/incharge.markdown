---
title: Vattenfall InCharge
description: Instructions on how to integrate your Vattenfall InCharge managed charging stations within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.3.4
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tgriek'
ha_domain: incharge
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

This is a sensor to collect information from your charging station managed by Vattenfall InCharge using [Vattenfall InCharge](https://myincharge.vattenfall.com/).
The total energy consumption for all charging stations in your account is fetched every 5 minutes and usable in the energy dashboard.

{% include integrations/config_flow.md %}