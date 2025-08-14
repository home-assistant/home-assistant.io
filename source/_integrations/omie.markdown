---
title: OMIE - Spain and Portugal electricity market data
description: Instructions on how to integrate OMIE day-ahead market prices within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2025.9'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@luuuis'
ha_domain: omie
ha_platforms:
  - sensor
ha_integration_type: integration
---

[OMIE](https://www.omie.es/en) is the electricity market operator for Spain and Portugal's day-ahead and
intraday energy markets.

The **OMIE** {% term integration %} retrieves day-ahead market results from [OMIE](https://www.omie.es/en) APIs
 and makes them available within Home Assistant. Having the wholesale electricity prices within Home Assistant
 in turn enables a range of use cases, such as:

- calculating electricity bills ahead of time (for those on variable-price tariffs that are linked
  to the wholesale price),

- deciding whether to export locally-produced energy (for example from solar panels) to the grid
  depending on remuneration.


## Configuration

To add the **OMIE** integration to your Home Assistant instance, use this My button:

[![Open your Home Assistant instance and start setting up the OMIE integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=omie)

## Sensors

The **OMIE** integration will retrieve the results of the [day-ahead market](https://www.omie.es/en/mercado-de-electricidad) for Spain and Portugal on a daily basis and expose them to the following {% term sensors %}.

- **Marginal Price - Portugal**: the wholesale price in the day-ahead market for the current hour Portugal (€/KWh)
- **Marginal Price - Spain**: the wholesale price in the day-ahead market for the current hour Spain (€/KWh)
