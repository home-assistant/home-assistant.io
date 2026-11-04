---
description: Instructions on how to integrate NSW fuel station prices into Home Assistant.
ha_release: 0.72
ha_domain: nsw_fuel_station
---

The **NSW Fuel Station Price** {% term integration %} uses the [NSW Fuel Check App](https://www.fuelcheck.nsw.gov.au/app) data as a source for current fuel price data.

## Setup

To get the station ID for any NSW fuel station you will need to:

- Visit the [Fuel Check App](https://www.fuelcheck.nsw.gov.au/app).
- Open the developer console of your browser (for Chrome, click View -> Developer -> Developer Tools). Click the "Network" tab in the developer console.
- In the Fuel Check App, search for your postcode or click "Fuel Near Me".
- In the developer console, you should see a request to `/FuelCheckApp/v1/fuel/prices/bylocation`. Open this request and preview the response. Find the station you wish to add, and copy down the `ServiceStationID` field.

Alternatively:

- Select a station you wish to find the ID for.
- Select "Report this Station".
- In the URL of the new page opened, locate `serviceStationId`.

## Configuration

To add the NSW fuel station price sensor to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
sensor:
  - platform: nsw_fuel_station
    station_id: 291
```

To track more than one station, add a separate `nsw_fuel_station` entry for each station. You can also specify several fuel types for each station. The following example requests six fuel types for each of four stations. A sensor is created only when price data is available for that station and fuel type.

The station IDs in this example are illustrative. Replace them with the IDs of the stations you want to monitor, using the steps above.

```yaml
sensor:
  - platform: nsw_fuel_station
    station_id: 2069
    fuel_types:
      - "E10"
      - "U91"
      - "P95"
      - "P98"
      - "DL"
      - "PDL"
  - platform: nsw_fuel_station
    station_id: 101
    fuel_types:
      - "E10"
      - "U91"
      - "P95"
      - "P98"
      - "DL"
      - "PDL"
  - platform: nsw_fuel_station
    station_id: 1539
    fuel_types:
      - "E10"
      - "U91"
      - "P95"
      - "P98"
      - "DL"
      - "PDL"
  - platform: nsw_fuel_station
    station_id: 20246
    fuel_types:
      - "E10"
      - "U91"
      - "P95"
      - "P98"
      - "DL"
      - "PDL"
```

{% configuration %}
station_id:
  description: The ID of the station to track
  required: true
  type: string
fuel_types:
  description: A list of fuel types to track for the station. Must be one of `["E10", "U91", "E85", "P95", "P98", "DL", "PDL", "B20", "LPG", "CNG", "EV"]`. Descriptions of fuel types can be found [here](https://www.fuelcheck.nsw.gov.au/App/Home/FuelTypes).
  required: false
  default: "`['E10', 'U91']`"
  type: list
{% endconfiguration %}
