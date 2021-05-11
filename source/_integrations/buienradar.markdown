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

- **Station name**: The name of the selected meteo-station.
- **Barometer forecast**: A numeric barametric forecast (1 to 7)
- **Barometer forecast name**: "A textual representation of the barometer forecast (eg: Thunderstorms, Stable, etc.)."
- **Condition code**: "A symbol and a unique code identifying the current weather condition ([a..z])."
- **Condition**: A symbol and the current weather condition (`clear`, `cloudy`, `fog`, `rainy`, `snowy` or `lightning`).
- **Condition detailed**: A symbol and detailed current weather condition (`clear`, `partlycloudy`, `cloudy`, `partlycloudy-fog`, `partlycloudy-light-rain`, `partlycloudy-rain`, `light-rain`, `rainy`, `snowy-rainy`, `partlycloudy-light-snow`, `partlycloudy-snow`, `light-snow`, `snowy`, `partlycloudy-lightning` or `lightning`).
- **Condition exact**: A symbol with the full current weather condition (in English).
- **Symbol**: A symbol for the current weather with the full current condition (in Dutch).
- **Feel temperature**: "The current feel temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- **Humidity**: The relative humidity (%).
- **Temperature**: "The current temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- **Ground temperature**: "The current ground temperature (in [C](https://en.wikipedia.org/wiki/Celsius))."
- **Wind speed**: "The wind speed in [km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour)."
- **Wind force**: "The wind speed/force in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale)."
- **Wind direction**: "Where the wind is coming from: N (North), Z (south), NO (North-East), etc."
- **Wind azimuth**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
- **Pressure**: "The sea-level air pressure in [hPa](https://en.wikipedia.org/wiki/Hectopascal)."
- **Visibility**: "Visibility in meters ([m](https://en.wikipedia.org/wiki/Metre))."
- **Wind gust**: "The wind speed of wind gusts ([m/s](https://en.wikipedia.org/wiki/M/s))."
- **Precipation**: The amount of precipitation/rain in mm/h.
- **Precipation forecast average**: The average expected precipitation/rain in mm/h within the given time-frame.
- **Precipation forecast total**: The total expected precipitation/rain in mm within the given time-frame. The total expected rain in the configured time-frame will be equal to _precipitation_forecast_total_/_timeframe_ mm/min. So, with time-frame configured to 30 minutes and a value of 5, the expected rain is 5 mm in 30 minutes, which is the same as 10 mm/h. If time-frame is set to 90 minutes and a value of 5, the expected rain is 5 mm in 90 minutes, which is equal to 3.3 mm/h.
- **Irradiance**: "Sun intensity in Watt per square meter ([W/m2](https://en.wikipedia.org/wiki/W/m2))."
- **Rain last 24h**: The rail over the last 24 hours (in mm).
- **Rain last hour: The rail over the last hour (in mm). 
- **Temperature n days ahead**: "The forecasted temperature n days ahead (in [C](https://en.wikipedia.org/wiki/Celsius))."
- **Minimum temperature n days ahead**: "The forecasted minimum temperature n days ahead (in [C](https://en.wikipedia.org/wiki/Celsius))."
- **Rain chance n days ahead**: The forecasted chance for rain n days ahead (%).
- **Sun chance n days ahead**: The forecasted chance for sun n days ahead (%).
- **Rain n days ahead**: "The forecasted amount of rain in [mm] n days ahead (https://en.wikipedia.org/wiki/Millimetre); the average of minrain_1d and maxrain_1d."
- **Minimum rain n days ahead**: "The minimum forecasted amount of rain in [mm] n days ahead (https://en.wikipedia.org/wiki/Millimetre)."
- **Maximum rain n days ahead**: "The maximum forecasted amount of rain in [mm] n days ahead (https://en.wikipedia.org/wiki/Millimetre)."
- **Wind azimuth n days ahead**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise for n days ahead. (derived from winddirection_1d)
- **Wind direction n days ahead**: "Where the wind will be coming from n days ahead: N (North), Z (south), NO (North-East), etc."
- **Wind force n days ahead**: "The expected windforce in [Bft] n days ahead (https://en.wikipedia.org/wiki/Beaufort_scale)."
- **Wind speed n days ahead**: "The expected windspeed in [m/s] n days ahead (https://en.wikipedia.org/wiki/M/s) (derived from windforce_1d)."
- **Condition code n days ahead**: Symbol and condition code of the expected condition n days ahead.
- **Condition n days ahead**: Symbol and expected condition n days ahead.
- **Detailed condition n days ahead**: Symbol and detailed expected condition n days ahead.
- **Full condition (english) n days ahead**: Symbol and full expected condition n days ahead (in English).
- **Full condition (dutch) n days ahead**: Symbol and full expected condition n days ahead (in Dutch).

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
