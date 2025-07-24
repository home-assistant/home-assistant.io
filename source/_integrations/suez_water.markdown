---
title: Suez Water
description: Instructions on how to integrate Suez Water daily data within Home Assistant.
ha_release: 0.97
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ooii'
  - '@jb101010-2'
ha_domain: suez_water
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Suez Water** {% term integration %} fetches your water consumption data from the French water provider [Tout Sur Mon Eau](https://www.toutsurmoneau.fr) website.

## Sensors

- The **Water usage yesterday** sensor shows yesterday's water consumption data if that data is available.
- The **Water price** sensor shows the current water price in euros per cubic meter (€/m3).

### Extra attributes

Extra attributes of `Water usage yesterday` sensor:

- Daily consumption for the current month
- Daily consumption for the previous month
- Monthly consumption for the last 26 months
- Highest monthly consumption
- Last year total consumption
- Current year total consumption

## Energy

The integration provides statistics containing all available data from Suez.
The data is fetched every 12 hours and is updated once a day by Suez.

You can find the statistics in {% my developer_statistics title="**Developer Tools** > **Statistics**"%} and search for "suez_water".
**Note: Due to Suez's daily update schedule, data for the current day will not be available, and yesterday's data may be delayed depending on when you check**

At the initial setup, the integration pulls historical daily usage since the counter installation.

{% details "Prerequisites" %}

- The Energy dashboard must be enabled in your Home Assistant instance. If you haven't set it up yet, please refer to the [Energy dashboard documentation](/home-assistant-energy/).

{% enddetails %}

In the configuration of the energy dashboard ({% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}):

1. Select **Add consumption** for **Water source**.
2. Select **Suez water Consumption** followed by your counter ID (e.g., "Suez water Consumption 123456789") for the **consumed water**.
3. Select **Suez water Cost** followed by your counter ID for the **total price**

### Statistics details

- **Suez water consumption** (`suez_water_water_consumption_statistics_{counter_id}`):
  - Contains daily water consumption in liters
  - Provides both state and sum statistics for each day

- **Suez water cost** (`suez_water_water_cost_statistics_{counter_id}`):
  - Contains daily cost calculations in euros
  - Provides both state and sum statistics for each day
  - **Important**: Historical costs are calculated using the current water price since historical price information is not available. If water prices have changed over time, the calculated historical costs may not match your actual bills.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Counter ID:
  description: "The water counter ID. It should be found automatically during setup. If it was not found, the ID can be found on your _Tout Sur Mon Eau_ [user account](https://www.toutsurmoneau.fr/mon-compte-en-ligne/historique-de-consommation-tr).
  You need to be **authenticated** to access the page above.

  Follow these steps to find your counter ID:

   1. Open the browser's developer tools (usually F12 or right-click > **Inspect**).
   
   2. Open the **Network** tab in the developer tools.
   
   3. Navigate to the page or reload it if already open.
   
   4. In the **Network** tab, search for `https://www.toutsurmoneau.fr/public-api/cel-consumption/meters-list`.
   
   5. Select the request and open the **Preview** tab.
   
   6. Expand the `content > clientCompteursPro > list > compteursPro > list` path.
   
   7. Look for the `id_PDS` field - this value is your counter ID.
   
  "

{% endconfiguration_basic %}

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
