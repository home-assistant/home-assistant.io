---
title: Southern Company
description: Instructions on how to integrate Southern Company within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Lash-L'
ha_domain: southern_company
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Southern Company sensor platform allows you to get energy information from [Southern Company Energy Companies.](https://www.southerncompany.com/about/our-companies.html)

Supported companies (tested):

- [Georgia Power](https://www.georgiapower.com/)

Untested companies:

- [Alabama Power](https://www.alabamapower.com/)
- [Mississippi Power](https://www.mississippipower.com/)

Southern Company natural gas companies are not currently supported.

To add this platform to your installation, You will need your southern company login email and password.

{% include integrations/config_flow.md %}

## Sensors

- Monthly cost: The most recent update of your current bill total
- Monthly consumption: The most recent update of your current energy usage
- Average daily usage: How much energy you have used on average in this billing cycle
- Average daily cost: How much it cost on average to run your electricity in this billing cycle
- Lower Projected monthly Usage: The lower bounds of how much energy southern company projects you will use.
- Higher projected monthly usage: The upper bounds of how much energy southern company projects you will use.
- Lower projected monthly cost: The lower bounds of how much energy Southern Company projects your bill will cost
- Higher projected monthly cost: The upper bounds of how much energy southern company projects your bill will cost

## Energy

Because Southern Company only releases usage/cost data with a 48 hour delay, data is inserted into a statistic object. To add the statistic object to your Energy dashboard, you need to select 'southern_company:energy_cost_{ACCOUNT_NUMBER}' for the energy cost and 'southern_company:energy_usage_{ACCOUNT_NUMBER}' for the energy usage.
