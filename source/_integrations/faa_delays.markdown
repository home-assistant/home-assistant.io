---
title: FAA Delays
description: Instructions on how to use FAA Delays data within Home Assistant
ha_category:
  - Transport
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ntilley905'
ha_domain: faa_delays
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The FAA Delays integration collects and displays information about delays at US Airports based on the
[FAA's National Airspace System Status](https://nasstatus.faa.gov/).

Data measured includes:

- Ground Delays
- Ground Stops
- Arrival/Departure Delays
- Closures

{% include integrations/config_flow.md %}

## Supported Airports

The airport entered must be a valid IATA
airport code for an airport in the US. You can find this by looking up the 
FAA Identifier at [Airnav](https://airnav.com/airports/).

## Additional Delay Information

Each airport added will expose 5 binary sensors, one for each type of delay. Within each sensor there is additional
information listed as attributes, which depends on the type of delay it is. All sensors include an update time attribute, which is the last time the advisory was updated, *not* the last time the data was fetched. Each delay type also has the attributes
listed below:

- Ground Delay
  - Average Delay Time
  - Delay reason
  - Maximum delay time
  - GDP start time
  - GDP end time
  - URL to the ATCSCC advisory
  - Departure scope
- Ground Stop
  - Expected End Time for stop
  - Delay reason
  - URL to the ATCSCC advisory
  - Included facilities
  - Included flights
  - Probability of extension (low, medium, or high)
- Arrival/Departure Delay
  - Minimum delay time
  - Maximum delay time
  - Delay trend (increasing/decreasing)
  - Delay reason
  - Average delay
- Closure
  - Start of closure (begin)
  - End of closure (end)
  - NOTAM of closure
