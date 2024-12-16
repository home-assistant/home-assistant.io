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

## About ista SE

**ista SE** is a company based in Germany that provides metering services for lessors and property owners. Its solutions are designed for rented or self-inhabited multi-party properties, enabling accurate measurement, assignment, and billing of heating and water consumption for renters or individual property owners.

## How you can use this integration

The **ista EcoTrend** integration allows you to monitor your monthly heating and water usage in Home Assistant's energy dashboard. View historical usage trends, track monthly consumption, and receive notifications when new data is available. This integration helps you stay informed about your household's resource usage and make informed decisions about energy efficiency.

## Prerequisites

### For new users

1. If you received an activation code by mail, register at [ecotrend.ista.com](https://ecotrend.ista.com/).
2. If you did not receive an activation code after moving into a property with **ista** metering devices, contact your lessor or property manager.

### For existing users

1. Ensure you have an active **ista EcoTrend** account to set up the integration.
2. During the setup process in Home Assistant, enter the email address and password associated with your **ista EcoTrend** account.

{% note %}
The integration currently supports only the German EcoTrend service.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "Enter the email address associated with your ista EcoTrend account to connect it to Home Assistant."
Password:
  description: "Enter the password for your ista EcoTrend account to enable the connection with Home Assistant."
{% endconfiguration_basic %}

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

Not all values may be available in your ista EcoTrend account. Cost estimation is an optional service that has to be booked by your property manager or lessor. Therefore, the cost sensors are deactivated by default.

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

## Data updates

The integration checks for new readings every 24 hours.

## Known limitations

- The integration does not support two-factor authentication. To connect Home Assistant to **ista Ecotrend**, you must first disable two-factor authentication. To do this, navigate to **Menü -> Benutzerkonto -> Zwei-Stufen-Authentifizierung** and remove any registered authentication devices.
- Sensor values reflect the meter readings from the previous month, as **ista** publishes new readings a few days after the end of the billing period. Long-term statistics are adjusted to display these readings as of the last day of the corresponding month.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
