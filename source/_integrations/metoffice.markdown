---
title: Met Office
description: Instructions on how to integrate Met Office weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MrHarcombe'
ha_domain: metoffice
ha_config_flow: true
---

The `metoffice` weather platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data.

## Configuration

To add the Met Office weather platform to your installation, you'll need to register for a free API key at the link above and then go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Met Office**. Multiple entries can be configured, but a unique set of latitude and longitude must be supplied for each.

This integration creates a number of weather entities for each entry created in the configuration by location: one weather entity with a summary and a forecast, and twelve sensor entities for individual reporting on each of the individual measurements, for both 3-hourly and daily updates (to a grand total of 26 entities available). Note that only the two summary entities and the 3-hourly sensor entities flagged below are enabled by default, so your system isn't overrun on initial configuration. The time supplied for each forecast is the start time for the forecast.

|Entity|Description|Enabled by default|
|------|-----------|------------------|
|weather.met_office\_**site name**_**frequency**|Weather entity with state of the current weather condition and attributes of temperature, humidity, wind speed and visibility as well as forecast of upcoming weather.|Yes.|
|sensor.**site name**\_feels\_like\_temperature_**frequency**|Sensor entity giving the current forecast 'feels like' temperature.|No.|
|sensor.**site name**\_humidity_**frequency**|Sensor entity giving the current forecast humidity.|No.|
|sensor.**site name**\_probability\_of\_precipitation_**frequency**|Sensor entity giving the current forecast chance of rain.|Yes.|
|sensor.**site name**\_station\_name_**frequency**|Sensor entity giving the current forecast time interval since midnight UTC.|No.|
|sensor.**site name**\_temperature_**frequency**|Sensor entity giving the current forecast temperature.|Yes.|
|sensor.**site name**\_uv\_index_**frequency**|Sensor entity giving the current forecast UV index.|No.|
|sensor.**site name**\_visibility_**frequency**|Sensor entity giving the current forecast visibility classification.|No.|
|sensor.**site name**\_visibility\_distance_**frequency**|Sensor entity giving the current forecast visibility distance (as a range).|No.|
|sensor.**site name**\_weather_**frequency**|Sensor entity giving the current forecast weather conditions.|Yes.|
|sensor.**site name**\_wind\_direction_**frequency**|Sensor entity giving the current forecast wind direction.|No.|
|sensor.**site name**\_wind\_gust_**frequency**|Sensor entity giving the current forecast maximum wind gust.|No.|
|sensor.**site name**\_speed_**frequency**|Sensor entity giving the current forecast wind speed.|Yes.|

Details about the API are available in the [DataPoint API documentation](https://www.metoffice.gov.uk/services/data/datapoint/api-reference). The [DataPoint](https://github.com/EJEP/datapoint-python) library is used to retrieve data.
