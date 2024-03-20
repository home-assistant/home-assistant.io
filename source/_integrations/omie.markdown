---
title: OMIE - Spain and Portugal electricity market data
description: Instructions on how to integrate OMIE day-ahead market prices within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2024.3'
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

- shifting energy usage to times where costs are lower, usually times of lower demand and/or
  higher renewable energy production,

- deciding whether to export locally-produced energy (for example from solar panels) to the grid
  depending on remuneration.


## Configuration

To add the **OMIE** integration to your Home Assistant instance, use this My button:

[![Open your Home Assistant instance and start setting up the OMIE integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=omie)

## Sensors

The **OMIE** integration will retrieve the results of the [day-ahead market](https://www.omie.es/en/mercado-de-electricidad) for Spain and Portugal on a daily basis and expose them to the following {% term sensors %}.

- **Marginal Price - Portugal**: the wholesale price in the day-ahead market for the current hour Portugal (€/MWh)
- **Marginal Price - Spain**: the wholesale price in the day-ahead market for the current hour Spain (€/MWh)

### Sensor attributes

In addition to the current marginal price, each sensor also has attributes containing hourly and average daily values 
for **today** and **tomorrow**. This enables making decisions or simply graphing future energy prices based on the 
day-ahead market results.

- **Today hours**: a mapping of all hours in the day to the marginal price in effect during the time period.
  Each time period is identified by its first second in ISO (example: `2024-01-18T10:00:00+00:00`). Remember that 
  on days when [Daylight saving time](https://en.wikipedia.org/wiki/Daylight_saving_time) begins or ends the day will
  have 23 or 25 hours, respectively.

- **Today average**: the arithmetic mean of all values in a day.

- **Today provisional**: indicates whether the attribute values for today are provisional or final. Provisional
  results occur when data is not available for all hours in a given day (for example, if the data for tomorrow data is not
  available yet).

Similarly, the **Tomorrow hours**, **Tomorrow average** and **Tomorrow provisional** attributes contain the same
information for the following day.

## Time zone handling

OMIE uses the [Central European Time (CET)](https://en.wikipedia.org/wiki/Central_European_Time) time zone as the 
reference time zone. Therefore, if the Home Assistant instance has a time zone configured in [Settings > System > General](https://my.home-assistant.io/redirect/general) that is not CET then this integration will map the data to the configured time zone as 
required. This is mostly transparent to users. Those not using CET, however, may benefit from understanding the following
key points:

- When comparing day-ahead market results against the sensor or sensor attributes, OMIE hour 1 does not normally
  correspond to 1 AM in your time zone.

- When using **today** or **tomorrow** attributes, your day does not necessarily begin and end in the same moment as
  the day with same date in CET.

The details and implications of this are explained in further detail below.

### Sensor state

The sensor state will contain the value that applies at any moment in time, as you would expect.
 
### Today & tomorrow

Attributes that contain information for **Today** and **Tomorrow** use the time zone configured in [Settings > System > General](https://my.home-assistant.io/redirect/general) as the reference time zone. This means that in Portugal, which uses [Western European Time](https://en.wikipedia.org/wiki/Western_European_Time), **Today hours** on date `D` contains OMIE hours 2-23 from date `D` and hour 1 from date `D+1`.

It follows that **Today** values for Portugal on date `D` are not fully known until the day-ahead market has concluded at
around 12:30 PM CET and the prices for `D+1` are known. You can use the **Today provisional** attribute to determine if that is the case.
