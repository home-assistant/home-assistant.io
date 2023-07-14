---
title: Opower
description: Instructions on how to integrate Opower within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tronikos'
ha_domain: opower
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Opower integration allows you to get energy information from utilities that use [Opower](https://www.oracle.com/industries/utilities/opower-energy-efficiency/).

More than 175 utilities use Opower. Currently only the following ones are supported:

- Evergy
- Exelon subsidiaries
  - Atlantic City Electric
  - Baltimore Gas and Electric (BGE)
  - Commonwealth Edison (ComEd)
  - Delmarva Power
  - PECO Energy Company (PECO)
  - Potomac Electric Power Company (Pepco)
- Pacific Gas & Electric (PG&E)
- Puget Sound Energy (PSE)

To add this integration to your installation, you will need your login username and password for your utility website. Two-factor authentication is not supported.

{% include integrations/config_flow.md %}

## Sensors

The integration adds the following sensors:

For electricity:

- Current bill electric usage to date
- Current bill electric cost to date
- Current bill electric forecasted usage (for the first few days of the bill this is 0)
- Current bill electric forecasted cost (for the first few days of the bill this is 0)
- Typical monthly electric usage
- Typical monthly electric cost

For gas:

- Current bill gas usage to date
- Current bill gas cost to date
- Current bill gas forecasted usage (for the first few days of the bill this is 0)
- Current bill gas forecasted cost (for the first few days of the bill this is 0)
- Typical monthly gas usage
- Typical monthly gas cost

## Energy

Because utilities only release usage/cost data with a 48-hour delay, the integration inserts data into statistic objects. At the initial setup, the integration pulls historical monthly usage/cost since the account activation, daily usage/cost for the past 3 years, and for electricity hourly usage/cost for the past 2 months. After the initial setup, the integration keeps pulling hourly data for electricity and daily data for gas for the past 30 days to allow for any corrections in the data from the utilities.

In the configuration of the energy dashboard (**{% my energy title="Settings > Dashboards > Energy" %}**):

For electricity:

1. Select **Add consumption** for the **Electricity grid**.
2. Select **Opower {utility name} elec {account number} consumption** for the **consumed energy**.
3. Select **Opower {utility name} elec {account number} cost** for the **entity with the total costs**.

For gas:

1. Select **Add gas source** for the **Gas consumption**.
2. Select **Opower {utility name} gas {account number} consumption** for the **gas usage**.
3. Select **Opower {utility name} gas {account number} cost** for the **entity with the total costs**.
