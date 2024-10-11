---
title: Suez Water
description: Instructions on how to integrate Suez Water daily data within Home Assistant.
ha_release: 0.97
ha_category:
  - Binary sensor
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ooii'
  - '@jb101010-2'
ha_domain: suez_water
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Suez Water integration fetches your water consumption from the French water provider [Tout Sur Mon Eau](https://www.toutsurmoneau.fr) website.

- **Binary sensor**: reports whether or not there are any alerts.
  - leak alert
  - over-consumption alert, configurable on suez website
- **Sensor**: reports on daily water consumption and water price.
  - Water usage last day, last known daily consumption given by suez
  - Water price, price in € per  m3 of consumed water
  - Water usage yesterday (deprecated), same as previous sensor, plus containing aggregated data attributes
- **Statistics**:
  - Consumption, all available day consumption provided by suez
  - Cost (in €), all daily cost, computed using price sensor
  - Both statistics can be added directly to energy dashboard

{% include integrations/config_flow.md %}

`counter_id` is the water counter id.
It should be found automatically during setup.
If not it can be found on your _Tout Sur Mon Eau_ [user account](https://www.toutsurmoneau.fr/mon-compte-en-ligne/historique-de-consommation-tr). Look in the source code of the page for something similar to `url: '/mon-compte-en-ligne/statMData' + '/123456789'`. The `counter_id` in this case is `123456789`.

## Information ##

Consumption data (last day and statistics) are provided with 24 to 48 hours after the end of day by Suez.

### Historical sensor (Deprecated) ###

Extra attributes of `Water usage yesterday` sensor:

- Daily consumption for the current month
- Daily consumption for the previous month
- Monthly consumption for the last 26 months
- Highest monthly consumption
- Last year total consumption
- Current year total consumption
