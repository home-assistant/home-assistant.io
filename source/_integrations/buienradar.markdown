---
title: Buienradar
description: Instructions on how to integrate buienradar.nl weather within Home Assistant.
ha_category:
  - Camera
  - Weather
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mjj4791'
  - '@ties'
  - '@Robbie1221'
ha_domain: buienradar
ha_platforms:
  - camera
  - sensor
  - weather
---

The Buienradar integration uses [buienradar.nl](https://buienradar.nl/) as a source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a web service that provides detailed weather information for users in The Netherlands.

The relevant weather station used will be automatically selected based on the location specified in the Home Assistant configuration (or in the Buienradar weather/sensor component).  A map of all available weather stations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0).

Besides the weather platform, there is currently support for the following additional device types:

- [Camera](#camera): Radar map
- [Sensor](#sensor): Extended weather data

{% include integrations/config_flow.md %}

## Camera

The `buienradar` camera platform uses [buienradar.nl](https://buienradar.nl/) as a source for the last rain radar map. The overview image of the whole of the Netherlands is loaded and shown as a camera in Home Assistant. The Netherlands is the default country and can be changed to Belgium (see [Setting options](#setting-options)).

Internally this component uses the radar map image as [documented](https://www.buienradar.nl/overbuienradar/gratis-weerdata) on buienradar.nl.
The downloaded image is cached to prevent Home Assistant from making a new request to buienradar.nl multiple times a minute when Home Assistant checks for new stills from the camera.

The camera entity is added disabled by default and should first be enabled before it starts reading the camera images.

## Sensor

The Buienradar integration will set up separate sensor entities with more detailed weather data. The selected weather station will provide all-weather data, with the exception of the forecasted precipitation. The forecasted precipitation data will be retrieved from Buienradar using your actual GPS location (and not the location of the nearest weather station). The sensor entities are disabled by default and should be enabled before they will be updated with data.

The following entities will be created:

- `stationname`: The name of the selected meteo-station.
- `barometerfc`: A numeric barametric forecast (1 to 7)
- `barometerfcname`: "A textual representation of the barometer forecast (eg: Thunderstorms, Stable, etc.)."
- `conditioncode`: "A symbol and a unique code identifying the current weather condition ([a..z])."
- `condition`: A symbol and the current weather condition (`clear`, `cloudy`, `fog`, `rainy`, `snowy` or `lightning`).
- `conditiondetailed`: A symbol and detailed current weather condition (`clear`, `partlycloudy`, `cloudy`, `partlycloudy-fog`, `partlycloudy-light-rain`, `partlycloudy-rain`, `light-rain`, `rainy`, `snowy-rainy`, `partlycloudy-light-snow`, `partlycloudy-snow`, `light-snow`, `snowy`, `partlycloudy-lightning` or `lightning`).
- `conditionexact`: A symbol with the full current weather condition (in English).
- `symbol`: A symbol for the current weather with the full current condition (in Dutch).
- `feeltemperature`: "The current feel temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- `humidity`: The relative humidity (%).
- `temperature`: "The current temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- `groundtemperature`: "The current ground temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- `windspeed`: "The wind speed in [km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour)."
- `windforce`: "The wind speed/force in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale)."
- `winddirection`: "Where the wind is coming from: N (North), Z (south), NO (North-East), etc."
- `windazimuth`: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
- `pressure`: "The sea-level air pressure in [hPa](https://en.wikipedia.org/wiki/Hectopascal)."
- `visibility`: "Visibility in meters ([m](https://en.wikipedia.org/wiki/Metre))."
- `windgust`: "The wind speed of wind gusts ([m/s](https://en.wikipedia.org/wiki/M/s))."
- `precipitation`: The amount of precipitation/rain in mm/h.
- `precipitation_forecast_average`: The average expected precipitation/rain in mm/h within the given time-frame.
- `precipitation_forecast_total`: The total expected precipitation/rain in mm within the given time-frame. The total expected rain in the configured time-frame will be equal to _precipitation_forecast_total_/_timeframe_ mm/min. So, with time-frame configured to 30 minutes and a value of 5, the expected rain is 5 mm in 30 minutes, which is the same as 10 mm/h. If time-frame is set to 90 minutes and a value of 5, the expected rain is 5 mm in 90 minutes, which is equal to 3.3 mm/h.
- `irradiance`: "Sun intensity in Watt per square meter ([W/m2](https://en.wikipedia.org/wiki/W/m2))."
- `rainlast24hour`: The rail over the last 24 hours (in mm).
- `rainlasthour`: The rail over the last hour (in mm). 
- `temperature_1d` `temperature_2d` `temperature_3d` `temperature_4d` `temperature_5d`: "The forecasted temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- `mintemp_1d` `mintemp_2d` `mintemp_3d` `mintemp_4d` `mintemp_5d`: "The forecasted minimum temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- `rainchance_1d` `rainchance_2d` `rainchance_3d` `rainchance_4d` `rainchance_5d`: The forecasted chance for rain (%).
- `sunchance_1d` `sunchance_2d` `sunchance_3d` `sunchance_4d` `sunchance_5d`: The forecasted chance for sun (%).
- `rain_1d` `rain_2d` `rain_3d` `rain_4d` `rain_5d`: "The forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre); the average of minrain_1d and maxrain_1d."
- `minrain_1d` `minrain_2d` `minrain_3d` `minrain_4d` `minrain_5d`: "The minimum forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre)."
- `maxrain_1d` `maxrain_2d` `maxrain_3d` `maxrain_4d` `maxrain_5d`: "The maximum forecasted amount of rain in [mm](https://en.wikipedia.org/wiki/Millimetre)."
- `windazimuth_1d` `windazimuth_2d` `windazimuth_3d` `windazimuth_4d` `windazimuth_5d`: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise. (derived from winddirection_1d)
- `winddirection_1d` `winddirection_2d` `winddirection_3d` `winddirection_4d` `winddirection_5d`: "Where the wind will be coming from: N (North), Z (south), NO (North-East), etc."
- `windforce_1d` `windforce_2d` `windforce_3d` `windforce_4d` `windforce_5d`: "The expected windforce in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale)."
- `windspeed_1d` `windspeed_2d` `windspeed_3d` `windspeed_4d` `windspeed_5d`: "The expected windspeed in [m/s](https://en.wikipedia.org/wiki/M/s) (derived from windforce_1d)."
- `conditioncode_1d` `conditioncode_2d` `conditioncode_3d` `conditioncode_4d` `conditioncode_5d`: Symbol and condition code of the expected condition.
- `condition_1d` `condition_2d` `condition_3d` `condition_4d` `condition_5d`: Symbol and expected condition.
- `conditiondetailed_1d` `conditiondetailed_2d` `conditiondetailed_3d` `conditiondetailed_4d` `conditiondetailed_5d`: Symbol and detailed expected condition.
- `conditionexact_1d` `conditionexact_2d` `conditionexact_3d` `conditionexact_4d` `conditionexact_5d`: Symbol and full expected condition (in English).
- `symbol_1d` `symbol_2d` `symbol_3d` `symbol_4d` `symbol_5d`: Symbol and full expected condition (in Dutch).

## Setting options

{% include integrations/option_flow.md %}

{% configuration_basic %}
country_code:
  description: You can specify the country code (NL or BE) of the
    country to display on the camera.
delta:
  description: Time interval in seconds between camera image updates
timeframe:
  description: Minutes to look ahead for precipitation forecast sensors (minimum 5, maximum 120).
{% endconfiguration_basic %}

_[Usage statement:](https://www.buienradar.nl/overbuienradar/gratis-weerdata)
Buienradar makes free weather data available for use by individuals and businesses (website/intranet). The use of the weather data is allowed for **non-commercial purposes**. Please refer to the full usage statement linked above to confirm your use or to request permission._
