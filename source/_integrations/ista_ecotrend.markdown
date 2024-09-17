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

## Long-term statistics

The **ista EcoTrend** integration allows you to import all your historical consumption readings from your ista EcoTrend account into long-term statistic entities. These entities can be displayed in your Home Assistant energy dashboard, providing a comprehensive view of your consumption data over time.

### Identifying ista EcoTrend statistic entities

The statistic entities imported via this integration have a `ista_ecotrend:` prefix. This prefix helps you identify and distinguish these entities from other sensor statistics when setting up the long-term statistics in the energy dashboard.

### Setting up long-term statistics in the energy dashboard

To set up the **ista EcoTrend** long-term statistics in your Home Assistant energy dashboard, follow these steps:

- **Access the energy configuration panel**
  - Go to the [energy configuration panel](https://my.home-assistant.io/redirect/config_energy/) of your Home Assistant instance.

    [![Open your Home Assistant instance and show your energy configuration panel.](https://my.home-assistant.io/badges/config_energy.svg)](https://my.home-assistant.io/redirect/config_energy/)

- **Add heating energy usage**
  - Go to **Gas consumption**.
  - Select **Add gas source**.
  - Choose your **Heating energy** entity (for example, `ista_ecotrend:luxemburger_str_1_heating_energy`).
  - For cost tracking, select the **Use an entity tracking the total costs** option.
  - Select the corresponding **Heating costs** entity (for example, `ista_ecotrend:luxemburger_str_1_heating_cost`).
- **Add hot water energy usage**
  - To track hot water energy usage and costs (for example, `ista_ecotrend:luxemburger_str_1_hot_water_energy` and `ista_ecotrend:luxemburger_str_1_hot_water_cost`), repeat the above steps for your **Hot water energy** and **Hot water costs** entities.
- **Add hot water consumption**
  - Go to **Water consumption**.
  - Select **Add water source**.
  - Choose the **Hot water** entity (for example, `ista_ecotrend:luxemburger_str_1_hot_water`).
  - For cost tracking, select the **Use an entity tracking the total costs** option.
  - Select the corresponding **Hot water costs** entity (for example, `ista_ecotrend:luxemburger_str_1_hot_water_cost`).
- **Add water consumption**
  - To track cold water consumption and costs (for example, `ista_ecotrend:luxemburger_str_1_water` and `ista_ecotrend:luxemburger_str_1_water_cost`), repeat the above steps for your **Water** and **Water costs** entities.
