---
layout: page
title: "NSW Fuel Station Price Sensor"
description: "Instructions on how to integrate NSW fuel station prices into Home Assistant."
date: 2018-06-02 18:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Fuel
ha_release: 0.71
ha_iot_class: "Cloud Polling"
---

The `nsw_fuel_station` sensor platform uses the [NSW Fuel Check App](https://www.fuelcheck.nsw.gov.au/app) data as a source for current fuel price data.

To add the NSW fuel station price sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
sensor:
  - platform: nsw_fuel_station
    station_name: BP Willoughby
    station_id: 1152
    fuel_types:
      - LPG
      - P98
      - E10
      - PDL
      - P95
  - platform: nsw_fuel_station
    station_id: 291
    station_name: Coles Express Cremorne
``` 

{% configuration %}
station_name:
  description: The name you would like to give to the fuel station
  required: true
  type: string
station_id:
  description: The ID of the station to track
  required: true
  type: string
fuel_types:
  description: A list of fuel types to track for the station. You can find available fuel types at [https://www.fuelcheck.nsw.gov.au/App/Home/FuelTypes](https://www.fuelcheck.nsw.gov.au/App/Home/FuelTypes).
  required: false
  default: By default, will create sensors for all fuel types: `["E10", "U91", "E85", "P95", "P98", "DL", "PDL", "B20", "LPG", "CNG", "EV"]`
  type: list
{% endconfiguration %}

To get the station ID for any NSW fuel station you will need to:
- Visit the [Fuel Check App](https://www.fuelcheck.nsw.gov.au/app)
- Open the developer console of your browser (for chrome, click View -> Developer -> Developer Tools). Click the "Network" tab in the developer console.
- In the Fuel Check App, search for your postcode or click "Fuel Near Me"
- In the developer console, you should see a request to `/FuelCheckApp/v1/fuel/prices/bylocation`. Open this request and preview the response. Find the station you wish to add, and copy down the `ServiceStationID` field.    
