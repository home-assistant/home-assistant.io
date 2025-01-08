---
title: GIOŚ
description: Instructions on how to integrate GIOŚ (Polish Chief Inspectorate Of Environmental Protection) air quality service into Home Assistant.
ha_category:
  - Health
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: gios
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The `gios` integration uses the [GIOŚ](http://powietrze.gios.gov.pl/pjp/current) web service as a source for air quality data for your location.

## Setup

To obtain ID of the measuring station, go to [GIOŚ](http://powietrze.gios.gov.pl/pjp/current) page, select the measuring station on the map and click the "More Info" link. The address of the opened page will look like this: `http://powietrze.gios.gov.pl/pjp/current/station_details/chart/291` and `291` will be ID of the measuring station.

{% include integrations/config_flow.md %}
