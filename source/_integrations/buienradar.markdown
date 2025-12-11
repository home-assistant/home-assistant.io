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
ha_integration_type: integration
---

The **Buienradar** {% term integration %} uses [buienradar.nl](https://buienradar.nl/) as a source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a web service that provides detailed weather information for users in The Netherlands.

The relevant weather station used will be automatically selected based on the location specified in the Home Assistant configuration (or in the Buienradar weather/sensor integration). A map of all available weather stations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0).

Besides the weather platform, there is currently support for the following additional device types:

- [Camera](#camera): Radar map
- [Sensor](#sensor): Extended weather data

{% include integrations/config_flow.md %}

## Camera

The `buienradar` camera platform uses [buienradar.nl](https://buienradar.nl/) as a source for the last rain radar map. The overview image of the whole of the Netherlands is loaded and shown as a camera in Home Assistant. The Netherlands is the default country and can be changed to Belgium (see [Options](#options)).

Internally, this integration uses the radar map image as [documented](https://www.buienradar.nl/overbuienradar/gratis-weerdata) on buienradar.nl.
The downloaded image is cached to prevent Home Assistant from making a new request to buienradar.nl multiple times a minute when Home Assistant checks for new stills from the camera.

The camera {% term entity %} is disabled by default and should be [enabled](/common-tasks/general/#enabling-entities) before it reads the camera images.

## Sensor

The **Buienradar** {% term integration %} will set up separate sensor {% term entities %} with more detailed weather data. The selected weather station will provide all-weather data, with the exception of the forecasted precipitation. The forecasted precipitation data will be retrieved from Buienradar using your actual GPS location (and not the location of the nearest weather station). The sensor entities are disabled by default and should be enabled before they will be updated with data.

The following {% term entities %} will be created:

- **Station name**: The name of the selected meteo-station
- **Barometer forecast**: A numeric barometric forecast (1 to 7)
- **Barometer forecast name**: A textual representation of the barometer forecast (eg: Thunderstorms, Stable, etc.)
- **Condition code**: A symbol and a unique code identifying the current weather condition 
  - `a`: sunny/clear
  - `b`: Mix of clear and medium or low clouds
  - `j`: Mix of clear and high clouds
  - `o/r`: Partly cloudy (increasing character increases the condition)
  - `c`: Heavily clouded
  - `p`: Cloudy
  - `d`: Alternating cloudy with local fog
  - `n`: Clear and local mist or fog
  - `f`: Alternatingly cloudy with some light rain
  - `h/k/l`: rainy (increasing character increases the condition)
  - `q`: Heavily clouded with rain
  - `w`: Heavily clouded with rain and winter precipitation
  - `m`: Heavily clouded with some light rain
  - `u`: Cloudy with light snow
  - `i/v`: Heavily clouded with light snowfall (increasing character increases the condition)
  - `t`: (Heavy snowfall)
  - `g`: (Clear with (possibly) some heavy lightning)
  - `s`: (Cloudy with (possibly) some heavy (thunderstorms) showers)
- **Condition**: A symbol and the current weather condition (`clear`, `cloudy`, `fog`, `rainy`, `snowy` or `lightning`)
- **Condition detailed**: A symbol and detailed current weather condition (`clear`, `partlycloudy`, `cloudy`, `partlycloudy-fog`, `partlycloudy-light-rain`, `partlycloudy-rain`, `light-rain`, `rainy`, `snowy-rainy`, `partlycloudy-light-snow`, `partlycloudy-snow`, `light-snow`, `snowy`, `partlycloudy-lightning` or `lightning`)
- **Condition exact**: A symbol with the full current weather condition (in English)
- **Symbol**: A symbol for the current weather with the full current condition (in Dutch)
- **Feel temperature**: The current wind chill factor (in [°C](https://en.wikipedia.org/wiki/Celsius))
- **Humidity**: The relative humidity (in %)
- **Temperature**: The current temperature (in [°C](https://en.wikipedia.org/wiki/Celsius))
- **Ground temperature**: The current ground temperature (in [°C](https://en.wikipedia.org/wiki/Celsius))
- **Wind speed**: The wind speed (in [km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour))
- **Wind force**: The wind speed/force (in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale))
- **Wind direction**: Where the wind is coming from: N (North), Z (south), NO (North-East), etc.
- **Wind azimuth**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise
- **Pressure**: The sea-level air pressure (in [hPa](https://en.wikipedia.org/wiki/Hectopascal))
- **Visibility**: Visibility (in [m](https://en.wikipedia.org/wiki/Metre))
- **Wind gust**: The wind speed of wind gusts ([km/h](https://en.wikipedia.org/wiki/Kilometres_per_hour))
- **Precipitation**: The amount of precipitation/rain (in mm/h)
- **Precipitation forecast average**: The average expected precipitation/rain within the given time-frame (in mm/h)
- **Precipitation forecast total**: The total expected precipitation/rain in mm within the given time-frame. The total expected rain in the configured time-frame will be equal to _precipitation_forecast_total_/_timeframe_ mm/min. So, with time-frame configured to 30 minutes and a value of 5, the expected rain is 5 mm in 30 minutes, which is the same as 10 mm/h. If time-frame is set to 90 minutes and a value of 5, the expected rain is 5 mm in 90 minutes, which is equal to 3.3 mm/h.
- **Irradiance**: Sun intensity in Watt per square meter ([W/m2](https://en.wikipedia.org/wiki/W/m2))
- **Rain last 24h**: The rain over the last 24 hours (in [mm](https://en.wikipedia.org/wiki/Millimeter))
- **Rain last hour**: The rain over the last hour (in [mm](https://en.wikipedia.org/wiki/Millimeter))
- **Temperature n days ahead**: The forecasted temperature n days ahead (in [°C](https://en.wikipedia.org/wiki/Celsius))
- **Minimum temperature n days ahead**: The forecasted minimum temperature n days ahead (in [°C](https://en.wikipedia.org/wiki/Celsius))
- **Rain chance n days ahead**: The forecasted chance for rain n days ahead (in %)
- **Sun chance n days ahead**: The forecasted chance for sun n days ahead (in %)
- **Rain n days ahead**: The forecasted amount of rain (in [mm](https://en.wikipedia.org/wiki/Millimeter)) n days ahead; the average of `Minimum rain n days ahead` and `Maximum rain n days ahead`
- **Minimum rain n days ahead**: The minimum forecasted amount of rain (in [mm](https://en.wikipedia.org/wiki/Millimeter)) n days ahead
- **Maximum rain n days ahead**: The maximum forecasted amount of rain (in [mm](https://en.wikipedia.org/wiki/Millimeter)) n days ahead
- **Wind azimuth n days ahead**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise for n days ahead (derived from `Wind direction n days ahead`)
- **Wind direction n days ahead**: Where the wind will be coming from n days ahead: N (North), Z (south), NO (North-East), etc.
- **Wind force n days ahead**: The expected wind force (in [Bft](https://en.wikipedia.org/wiki/Beaufort_scale)) n days ahead
- **Wind speed n days ahead**: The expected wind speed (in [m/s](https://en.wikipedia.org/wiki/M/s)) n days ahead (derived from `Wind force n days ahead`)
- **Condition code n days ahead**: Symbol and condition code of the expected condition n days ahead
- **Condition n days ahead**: Symbol and expected condition n days ahead
- **Detailed condition n days ahead**: Symbol and detailed expected condition n days ahead
- **Full condition n days ahead**: Symbol and full expected condition n days ahead

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

{% note %}

**Usage statement**
Buienradar makes free weather data available for use by individuals and businesses (website/intranet). The use of the weather data is allowed for **non-commercial purposes**. Please refer to the [full usage statement](https://www.buienradar.nl/overbuienradar/gratis-weerdata) to confirm your use or to request permission.

{% endnote %}
