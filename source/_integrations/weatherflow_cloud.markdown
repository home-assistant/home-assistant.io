---
title: WeatherflowCloud
description: Instructions on the Cloud based WeatherFlow integration
ha_release: 2024.3
ha_category:
  - Environment
  - Sensor
  - Weather
ha_platforms:
  - sensor
  - weather
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jeeftor'
ha_domain: weatherflow_cloud
ha_integration_type: hub
---

The **WeatherFlow Cloud** {% term integration %} provides access to cloud provided Weather Forecast of a user's Tempest Weather Stations. To access the station, you will need to configure the integration with an [Api Key](https://weatherflow.github.io/Tempest/api/).

### Which integration(s) should I use

There are two integrations for WeatherFlow devices, and you are not limited to selecting just one.

- [WeatherFlow](/integrations/weatherflow) is a *local only* `UDP`-based integration that will read data directly from the device. This integration does require the Home Assistant server and the WeatherFlow device to be on the same subnet.

- [WeatherFlow Cloud](/integrations/weatherflow_cloud) is a *cloud*-based integration that closely mirrors the data available via the Weatherflow Tempest mobile applications and is likely a good starting place for most users as it provides both **Forecast** and **Sensor** data. 
{% include integrations/config_flow.md %}

### Temperature sensors

| Sensor | Description |
| --- | --- |
| Dew point | The temperature to which air must be cooled to become saturated with water vapor. |
| Feels like | An index that combines temperature and humidity to determine the apparent temperature. |
| Heat index | A measure of how hot it feels when relative humidity is factored in with the actual air temperature. |
| Temperature | The degree or intensity of heat present in the area. |
| Wet bulb globe temperature | A composite temperature used to estimate the effect of temperature, humidity, wind speed, and solar radiation on humans. |
| Wet bulb temperature | The lowest temperature that can be reached under current ambient conditions by the evaporation of water only. |
| Wind chill | The lowering of body temperature due to the passing-flow of lower-temperature air. |

### Air sensors

| Sensor | Description |
| --- | --- |
| Air density | The mass per unit volume of Earth's atmosphere. |
| Pressure barometric | The pressure exerted by the atmosphere at the earth's surface. |
| Pressure sea level | The atmospheric pressure at mean sea level. |
| Pressure station | The atmospheric pressure at the station level. |

### Lightning sensors

| Sensor | Description |
| --- | --- |
| Lightning count | The total number of lightning strikes. |
| Lightning count last 1 hr | The number of lightning strikes in the last hour. |
| Lightning count last 3 hr | The number of lightning strikes in the last three hours. |
| Lightning last | The most recent lightning strike. |
| Lightning last distance | The distance of the most recent lightning strike. |

## Weather conditions

The Home Assistant `weather` entity reports its current state as one of a fixed set of condition values, listed under [Condition mapping](/integrations/weather/#condition-mapping) on the Weather integration page. The WeatherFlow API returns a larger set of condition identifiers, so this integration maps each WeatherFlow value to the closest Home Assistant condition. Because there is no one-to-one mapping between the two, the state shown in Home Assistant may differ slightly from the condition shown in the Tempest app.

The mapping from the WeatherFlow condition to the Home Assistant weather state is:

- `clear-day` is reported as `sunny`
- `clear-night` is reported as `clear-night`
- `cloudy` is reported as `cloudy`
- `foggy` is reported as `fog`
- `partly-cloudy-day` is reported as `partlycloudy`
- `partly-cloudy-night` is reported as `partlycloudy`
- `possibly-rainy-day` is reported as `rainy`
- `possibly-rainy-night` is reported as `rainy`
- `possibly-sleet-day` is reported as `snowy-rainy`
- `possibly-sleet-night` is reported as `snowy-rainy`
- `possibly-snow-day` is reported as `snowy`
- `possibly-snow-night` is reported as `snowy`
- `possibly-thunderstorm-day` is reported as `lightning-rainy`
- `possibly-thunderstorm-night` is reported as `lightning-rainy`
- `rainy` is reported as `rainy`
- `sleet` is reported as `snowy-rainy`
- `snow` is reported as `snowy`
- `thunderstorm` is reported as `lightning`
- `windy` is reported as `windy`
