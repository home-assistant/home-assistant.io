---
title: Environment Canada
description: Weather data from Environment Canada.
ha_category:
  - Weather
  - Sensor
  - Camera
ha_release: 0.95
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@michaeldavie'
ha_domain: environment_canada
ha_platforms:
  - camera
  - sensor
  - weather
---

The `environment_canada` weather platforms provide meteorological data for Canadian locations from [Environment Canada](https://weather.gc.ca/index_e.html).

The following device types and data are supported:

- [Location Selection](#location-selection)
- [Weather](#weather)
- [Sensor](#sensor)
  - [Alert TTS Script](#alert-tts-script)
- [Camera](#camera)

## Location Selection

The `weather` and `sensor` platforms automatically determine which weather station's data to use. However, as station coordinates provided by Environment Canada are somewhat imprecise, in some cases you may need to override the automatic selection to use the desired station.

For these platforms, the location to use is determined according to the following hierarchy:

- Location ID specified in platform configuration (optional)
- Closest station to latitude/longitude specified in platform configuration (optional)
- Closest station to latitude/longitude specified in Home Assistant configuration (default)

The `camera` platform dynamically builds imagery using a latitude/longitude as a center point. Radar station IDs are also supported for backwards compatibility.

For this platform, the location to use is determined according to the following hierarchy:

- Station ID specified in platform configuration (optional)
- Latitude/longitude specified in platform configuration (optional)
- Latitude/longitude specified in Home Assistant configuration (default)


## Weather

The `environment_canada` weather platform populates a weather card with Environment Canada current conditions and forecast [data](https://weather.gc.ca/canada_e.html).

To add Environment Canada weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: environment_canada
```

- The platform checks for new data every 10 minutes, and the source data is typically updated hourly within 10 minutes after the hour.
- If no name is given, the weather entity will be named `weather.<station_name>`.
- The platform automatically determines which weather station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify either:
    - A specific station code of the form `AB/s0000123` based on those listed in [this CSV file](https://dd.weather.gc.ca/citypage_weather/docs/site_list_towns_en.csv), or
    - A specific latitude/longitude

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
station:
  description: The station code of a specific weather station to use. Station codes must be in the form `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored.
  required: false
  type: string
name:
  description: Name to be used for the entity ID, e.g.,  `weather.<name>`.
  required: false
  type: string
forecast:
  description: Specify hourly or daily forecasts. Valid values are 'daily' and 'hourly'.
  required: false
  type: string
  default: daily
{% endconfiguration %}

## Sensor

The `environment_canada` sensor platform creates sensors based on Environment Canada [current conditions](https://weather.gc.ca/canada_e.html) and [alerts](https://weather.gc.ca/warnings/index_e.html).

To add Environment Canada sensors to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: environment_canada
```

- A sensor will be created for each of the following conditions, with a default name like `sensor.temperature`:
    - `temperature` - The current temperature, in ºC.
    - `dew_point` - The current dewpoint, in ºC.
    - `wind_chill` - The current wind chill, in ºC.
    - `humidex` - The current humidex, in ºC.
    - `air_quality_health_index` - The current Air Quality Health Index score
    - `pressure` - The current air pressure, in kPa.
    - `tendency` - The current air pressure tendency, e.g.,  "Rising".
    - `humidity` - The current humidity, in %.
    - `visibility` - The current visibility, in km.
    - `condition` - A brief text statement of the current weather conditions, e.g.,  "Sunny".
    - `icon_code` - A two-digit number corresponding to a condition icon, as specified in these [image to description](https://dd.weather.gc.ca/citypage_weather/docs/Current_Conditions_Icons-Icones_conditions_actuelles.pdf) and [code to description](https://dd.weather.gc.ca/citypage_weather/docs/current_conditions_icon_code_descriptions_e.csv) mappings.
    - `wind_speed` - The current sustained wind speed, in km/h.
    - `wind_gust` - The current wind gust, in km/h.
    - `wind_direction` - The current cardinal wind direction, e.g.,  "SSW".
    - `wind_bearing` - The current wind direction in degrees.
    - `high_temperature` - The next forecast high temperature, in ºC.
    - `low_temperature` - The next forecast low temperature, in ºC.
    - `uv_index` - The next forecast UV index.
    - `chance_of_precip` - The next forecast probability of precipitation, in %.
    - `forecast` - A textual description of the next forecast period, e.g.,  "Tonight. Mainly cloudy. Low -12."
    - `precipitation_yesterday` - The total amount of precipitation that fell the previous day.
    - `warnings` - Current warning alerts.
    - `watches` - Current watch alerts.
    - `advisories` - Current advisory alerts.
    - `statements` - Current special weather statements.
    - `endings` - Alerts that have recently ended.
- The platform automatically determines which weather station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify either:
    - A specific station code of the form `AB/s0000123` based on those listed in [this CSV file](https://dd.weather.gc.ca/citypage_weather/docs/site_list_towns_en.csv), or
    - A specific latitude/longitude
- In the case of multiple alerts in the same category, the titles of each are concatenated together with a pipe (`|`) separator.

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest weather station.
  required: inclusive
  type: float
station:
  description: The station code of a specific weather station to use. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored. Station codes must be in the form of `AB/s0000123`, where `AB`is a provincial abbreviation and `s0000123` is a numeric station code.
  required: false
  type: string
language:
  description: Language to use for entity display names and textual data (English or French).
  required: false
  type: string
  default: english
scan_interval:
  description: The time between updates in seconds.
  required: false
  type: integer
  default: 600
{% endconfiguration %}

### Alert TTS Script

If you would like to have alerts announced via a text-to-speech service, you can use a script similar to the following:

{% raw %}

```yaml
weather_alert_tts:
  sequence:
   - service: tts.amazon_polly_say
      data:
        message: "{{ states('sensor.warnings') }} in effect."
```

{% endraw %}

## Camera

The `environment_canada` camera platform displays Environment Canada meteorological [radar imagery](https://weather.gc.ca/radar/index_e.html).

To add Environment Canada radar imagery to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: environment_canada
```

- If no name is given, the camera entity will be named `camera.environment_canada_radar`.
- The platform dynamically builds imagery based on a latitude/longitude center point. This center point can be specified using:
    - The latitude/longitude of the Home Assistant installation (default)
    - A specific latitude/longitude for the platform (optional)
    - A specific radar station ID from [this table](https://en.wikipedia.org/wiki/Canadian_weather_radar_network#List_of_radars). The code must be in the form `XXX` or `CXXXX`, i.e., remove the leading `C` only if the result forms a three-letter code, otherwise, include it. Valid values include `XFT` for Ottawa or `CASBV` for Montreal. (optional, for backwards compatibility)

{% configuration %}
latitude:
  description: Part of a set of coordinates to use as the center point.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use as the center point.
  required: inclusive
  type: float
station: 
  description: The station code of a specific radar station to use. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored. Must be in the form `XXX` or `CXXXX`.
  required: false
  type: string
name:
  description: Name to be used for the entity ID, e.g.,  `camera.<name>`.
  required: false
  type: string
loop:
  description: Boolean setting to determine whether to display an animated GIF of images from the last 2 hours. If `false`, the latest still image will be displayed.
  required: false
  default: true
  type: boolean
precip_type:
  description: Determines whether to use the intensity bands for rain or snow. Valid values are RAIN and SNOW.
  required: false
  type: string
  default: RAIN from April to October, SNOW from November to March
{% endconfiguration %}
