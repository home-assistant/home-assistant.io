---
title: Frank Energie
description: Instructions on how to integrate Frank Energie within Home Assistant.
ha_category:
  - Energy
ha_release: 2023.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bajansen'
  - '@DCSBL'
ha_domain: frank_energie
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Frank Energie integration connects the [Frank Energie](https://www.frankenergie.nl/) API platform with Home Assistant.

This integration allows you to access real-time energy and gas prices from Frank Energie, providing insights into daily price trends and enabling you to adjust your consumption accordingly. Additionally, it offers personalized pricing and invoice information.

{% include integrations/config_flow.md %}

## Sensors

The Frank Energie integration introduces several sensor entities for both gas and electricity prices.

### Market Prices

The following market price sensors are available:

- Current market price
- Current market price including tax 
- Current market price including tax and all other costs
- Highest, lowest, and average price for the day

### Personalized Costs

To access personalized costs, you need to sign in during the integration setup. The following personalized cost sensors are available:

- Invoice amounts for the current month, previous month, and next month (when available)
- Expected costs for the current month
- Actual costs for the current month
