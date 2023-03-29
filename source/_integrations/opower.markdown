title: Opower
description: Instructions on how to integrate Opower within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.4
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

More than 175 utilities use Opower but currently only the following ones are supported:

- [Pacific Gas and Electric Company (PG&E)](https://www.pge.com/)

To add this integration to your installation, you will need your login username and password for your utility website.

{% include integrations/config_flow.md %}

## Sensors

The integration adds the following sensors:

For electricity:

- Current bill electric usage to date
- Current bill electric cost to date
- Current bill electric forecasted usage
- Current bill electric forecasted cost
- Typical monthly electric usage
- Typical monthly electric cost

For gas:

- Current bill gas usage to date
- Current bill gas cost to date
- Current bill gas forecasted usage
- Current bill gas forecasted cost
- Typical monthly gas usage
- Typical monthly gas cost

## Energy

Because utilities only release usage/cost data with a 48 hour delay, data is inserted into statistic objects. At the initial setup the integration pulls historical monthly usage/cost since the account activation, daily usage/cost for the past 3 years and for electricity hourly usage/cost for the past 2 months.

In the configuration of the energy dashboard (Settings > Dashboards > Energy):

For electricity:

1. Click on add consumption for the Electricity grid.
2. Select 'Opower {utility name} elec {account number} consumption' for the consumed energy.
3. Select 'Opower {utility name} elec {account number} cost' for the entity with the total costs.

For gas:

1. Click on add gas source for the Gas Consumption.
2. Select 'Opower {utility name} gas {account number} consumption' for the gas usage.
3. Select 'Opower {utility name} gas {account number} cost' for the entity with the total costs.
