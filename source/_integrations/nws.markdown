---
title: National Weather Service (NWS)
description: Instructions on how to integrate National Weather Service data within Home Assistant.
logo: nws.png
ha_category: Weather
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MatthewFlamm'
---

The `nws` platform uses the [National Weather Service](https://www.weather.gov) web API as a source for meteorological data for your location.

## Configuration

According to the [API documentation](https://www.weather.gov/documentation/services-web-api/), a string is required for the API key, and an email address is suggested to be included within the string.

To add NWS to your installation using the closest station, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: nws
    api_key: YOUR_API_KEY
```

To specify a station, for example, KADW (Andrews Air Force Base), use the following:

```yaml
# Example configuration.yaml entry
weather:
  - platform: nws
    api_key: YOUR_API_KEY
    station: KADW
```

A list of nearby stations is printed to the log with level `DEBUG` if no station is supplied. Stations can also be found on the [NOAA website](https://www.cnrfc.noaa.gov/metar.php). Codes with only three characters, for example, `ADW` should be prefixed with the letter K, `KADW`.

The default forecast is day and night, `mode: daynight`, while `mode: hourly` gives the forecast hourly.  The forecast is obtained from the latitude and longitude value, not the station.

{% configuration %}
api_key:
  description: "Your API key. Any string, but an email address is suggested to be included."
  required: true
  type: string
latitude:
  description: "Manually specify latitude. By default, the value will be taken from the Home Assistant configuration."
  required: false
  type: float
  default: "Provided by Home Assistant configuration."
longitude:
  description: Manually specify longitude. By default, the value will be taken from the Home Assistant configuration.
  required: false
  type: float
  default: "Provided by Home Assistant configuration."
name:
  description: "Name to use in the frontend."
  required: false
  type: string
  default: "Station name."
mode:
  description: "The forecast type. Can be `daynight` or `hourly`."
  required: false
  type: string
  default: daynight
station:
  description: "METAR station code."
  required: false
  type: string
  default: "Closest station to `latitude` and `longitude` as returned by NWS API."
{% endconfiguration %}

Details about the API are available in the [NWS API documentation](https://www.weather.gov/documentation/services-web-api). The [pynws](https://github.com/MatthewFlamm/pynws) library is used to retrieve data.
