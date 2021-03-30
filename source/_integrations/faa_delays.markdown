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
---

The FAA Delays integration collects and displays information about delays at US Airports based on the
[FAA's National Airspace System Status](https://www.fly.faa.gov/ois/).

Data measured includes:

- Ground Delays
- Ground Stops
- Arrival/Departure Delays
- Closures

{% include integrations/config_flow.md %}

## Supported Airports

The airport entered must be a valid IATA
airport code for an airport in the US. You can find this by looking up the 
FAA Identifier at [Airnav](https://airnav.com/airports/). Officially the FAA
only supports the airports listed below, but all airports will return data.

Supported airports: BOS, LGA, TEB, EWR, JFK, PHL, PIT, IAD, BWI, DCA, RDU,
CLT, ATL, MCO, TPA, MCO, FLL, MIA, DTW, CLE, MDW, ORD, IND, CVG, BNA, MEM,
STL, MCI, MSP, DFW, IAH, DEN, SLC, PHX, LAS, SAN, LAX, SJC, SFO, PDX, SEA

## Additional Delay Information

Each airport added will expose 5 binary sensors, one for each type of delay. Within each sensor there is additional
information listed as attributes, which depends on the type of delay it is. Each delay type has the attributes
listed below:

- Ground Delay
  - Average Delay Time
  - Delay reason
- Ground Stop
  - Expected End Time for stop
  - Delay reason
- Arrival/Departure Delay
  - Minimum delay time
  - Maximum delay time
  - Delay trend (increasing/decreasing)
  - Delay reason
- Closure
  - Start of closure (begin)
  - End of closure (end)
  - Closure reason
