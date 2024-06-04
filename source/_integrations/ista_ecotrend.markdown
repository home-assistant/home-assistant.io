---
title: ista EcoTrend
description: Instructions on how to integrate ista EcoTrend with Home Assistant.
ha_release: 2024.7
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

The **ista EcoTrend** {% term integration %} for Home Assistant allows you to import your monthly meter readings from the [ista EcoTrend](https://ecotrend.ista.de) service.


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

Not all values may be available in your ista EcoTrend account. Cost estimation is an optional service that has to be booked by your property manager. Therefore, the cost sensors are deactivated by default.
