---
title: NSW Fuel Station Price
description: Instructions on how to integrate NSW fuel station prices into Home Assistant.
ha_category:
  - Car
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@nickw444'
ha_domain: nsw_fuel_station
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `nsw_fuel_station` sensor platform uses the [NSW Fuel Check App](https://www.fuelcheck.nsw.gov.au/app) data as a source for current fuel price data.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name/address search:
  description: Enter a search string to find a station. Typically, this will be a suburb, street, or postcode.
Select station:
  description: Choose a station from the list matching the search. Note that not all will have every fuel type. Some are EV charger only.
{% endconfiguration_basic %}

