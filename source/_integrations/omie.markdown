---
title: OMIE
description: Monitor OMIE day-ahead electricity market prices for Spain and Portugal directly in Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.5
ha_iot_class: Cloud Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@luuuis'
ha_domain: omie
ha_platforms:
  - sensor
ha_integration_type: service
---

[OMIE](https://www.omie.es/en) is the electricity market operator for the day-ahead and intraday energy markets in Spain and Portugal. The **OMIE** {% term integration %} retrieves day-ahead market prices from the OMIE APIs and makes them available within Home Assistant.

Having the wholesale electricity prices within Home Assistant enables a range of use cases, such as:

- Calculating electricity bills ahead of time (for those on variable-price tariffs that are linked to the wholesale price)
- Deciding whether to export locally produced energy (for example from solar panels) to the grid

{% include integrations/config_flow.md %}

## Sensors

The **OMIE** integration retrieves the results of the [day-ahead market](https://www.omie.es/en/mercado-de-electricidad) for Spain and Portugal daily and exposes them as the following {% term sensors %}.

- **Portugal spot price**: Current quarter-hour electricity spot price in Portugal, in €/kWh.
- **Spain spot price**: Current quarter-hour electricity spot price in Spain, in €/kWh.

## Data updates

The OMIE integration {% term polling polls %} OMIE for new data at the start of each quarter-hour (in Central European Time).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
