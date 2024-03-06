---
title: aWATTar
description: Instructions on how to integrate aWATTar prices within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
ha_domain: awattar
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The aWATTar integration integrates the [aWATTar](https://www.awattar.at) API platform 
with Home Assistant.

The integration makes it possible to retrieve the dynamic energy prices
from aWATTar in order to gain insight into the price trend of the day and
to adjust your consumption accordingly.

## Sensors

The aWATTar integration creates a number of sensor entities for electricity prices and 
prices for various timeslot sizes.

The prices for the following day are available every day around **14:00 UTC time**. 
Depending on the time of day you either get prices until end of this day (before 14:00) or 
prices until end of next day.

Either way you get the following sensors for the integration:

- The `current` and `next hour` price
- Average electricity price of the period (either end of this day or end of next day)
- Lowest energy price of the period
- Highest energy price of the period

For timespans from 2 to 6 hours you get the information when the price is lowest:

- Time of Day when the timeslot begins
- Average price you would have to pay within this timeslot

With this you can easily create an automation to start consumption for a given period at 
the lowest possible price to e.g. heat up the boiler or charge a battery.

The API is free of charge and gets polled every hour.
