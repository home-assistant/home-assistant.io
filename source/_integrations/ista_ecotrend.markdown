---
title: ista EcoTrend
description: Instructions on how to integrate ista EcoTrend with Home Assistant.
ha_release: '2024.6'
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tr4nt0r'
ha_domain: ista_ecotrend
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The **ista EcoTrend** integration for Home Assistant allows you to import your monthly meter readings from the [ista EcoTrend](https://ecotrend.ista.de) service.


{% include integrations/config_flow.md %}


## Sensors

The **ista EcoTrend** integration exposes the last monthly readings as sensors. It provides the following sensors:

- **Heating**: readings from your heat cost allocators (measured in units)
- **Heating energy**: estimated value in kWh
- **Heating costs**: estimated costs in EUR
- **Hot water**: consumption readings in m³
- **Hot water energy**: estimated value in kWh
- **Hot water costs**: estimated costs in EUR
- **Water**: consumption readings in m³
- **Water costs**: estimated costs in EUR

Not all values might be available in your ista EcoTrend account. Cost estimations is an optional service and has to be booked by your property manager. The cost sensors are therefore deactivated by default.

## Statistics

The **ista EcoTrend** integration will additionally import all historical monthly consumption readings as statistics that can be used in the energy dashboard. New consumption readings usually become available in the first week of the following month. In contrast to the sensors, values in the statistics are corrected and added on the last day of their corresponding month. 

Make sure to select the correct statistics in the energy dashboard. You can differentiate the statistics from the sensors by their prefix `ista_ecotrend`
