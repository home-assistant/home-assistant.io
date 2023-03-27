---
title: easyEnergy
description: Instructions on how to integrate easyEnergy within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: easyenergy
ha_platforms:
  - diagnostics
  - sensor
ha_quality_scale: platinum
ha_integration_type: integration
---

The easyEnergy integration integrates the [easyEnergy](https://www.easyenergy.com) API platform with Home Assistant.

The integration makes it possible to retrieve the dynamic energy/gas prices
from easyEnergy in order to gain insight into the price trend of the day and
to adjust your consumption accordingly.

Companies that use the data from easyEnergy:

- [NieuweStroom](https://nieuwestroom.nl)

{% include integrations/config_flow.md %}

## Sensors

The easyEnergy integration creates a number of sensor entities for both gas
and electricity prices.

### Energy market prices

In terms of electricity you get two separate services, easyEnergy uses separate
prices for electricity that you use (buy) or return (sell). Every day around
**14:00 UTC time**, the new prices are published for the following day.

- The `current` and `next hour` electricity market price
- Average electricity price of the day
- Lowest energy price
- Highest energy price
- Time of day when the price is highest
- Time of day when the price is at its lowest
- Percentage of the current price compared to the maximum price

### Gas market price

For the dynamic gas prices, only entities are created that display the
`current` and `next hour` price because the price is always fixed for
24 hours; new prices are published every morning at **05:00 UTC time**.
