---
title: Yahoo Weather
description: Instructions on how to integrate Yahoo Weather within Home Assistant.
ha_category:
  - Weather
  - Sensor
ha_release: 0.24
ha_iot_class: Cloud Polling
ha_domain: yweather
---

<div class='note warning'>

The Yahoo Weather API is being [retired](https://developer.yahoo.com/weather/?guccounter=1). A replacement is the [`OpenWeatherMap` integration](/integrations/openweathermap).

</div>

The `yweather` platform uses [Yahoo Weather](https://www.yahoo.com/news/weather/) as a source for current meteorological data. The `forecast` will show you the condition for 5 days, 0 is the current day. You can use only `weather`, `temp_min`, and `temp_max` with forecast. It's important to note that a yweather sensor will only show ONE days forecast at a time so to show multiple days forecasts, you will need to use the 'name:' option and give each sensor a unique name.

<div class='note warning'>
Use of the Yahoo Weather API should not exceed reasonable request volume. Access is limited to 2000 signed calls per day.
</div>

The `woeid` (Where On Earth ID) for your location, as shown in the example below. You can find your WOEID by copying the numeric digits at the end of the URL for your location at [Yahoo Weather](https://www.yahoo.com/news/weather/). If you don't add a WOEID it is generated from Home Assistant's latitude and longitude.

To add Yahoo Weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yweather
    monitored_conditions:
      - weather
      - weather_current
      - temp_min
      - temp_max
      - wind_speed
      - pressure
      - visibility
      - humidity
      - temperature
```

{% configuration %}
woeid:
  required: false
  description: See above.
  type: string
  default: "Defaults to a WOEID generated from coordinates defined in your `configuration.yaml` file."
forecast:
  required: false
  description: Day of forecast. The default is the current day to display conditions.
  type: integer
  default: 0
name:
  required: false
  description: "The name of the sensor. To easily recognize each sensor when adding more than one Yahoo weather sensor, it is recommended to use the name option."
  type: string
  default: "`Yweather`"
monitored_conditions:
  required: true
  description: Conditions to display in the frontend.
  type: list
  keys:
    weather:
      description: A human-readable text summary with picture from yahoo.
    weather_current:
      description: A human-readable text summary with picture from yahoo from current condition.
    temperature:
      description: The current temperature.
    temp_min:
      description: The minimal temperature of this day.
    temp_max:
      description: The maximum temperature of this day.
    wind_speed:
      description: The wind speed.
    humidity:
      description: The relative humidity.
    pressure:
      description: The sea-level air pressure in millibars.
    visibility:
      description: The average visibility.
{% endconfiguration %}

Example of forecast using multiple days. In example, first sensor shows tomorrow's forecast, second sensor shows the next day and so on:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yweather
    forecast: 1
    name: yw_day1
    monitored_conditions:
      - weather
      - temp_min
      - temp_max
  - platform: yweather
    forecast: 2
    name: yw_day2
    monitored_conditions:
      - weather
      - temp_min
      - temp_max
  - platform: yweather
    forecast: 3
    name: yw_day3
    monitored_conditions:
      - weather
      - temp_min
      - temp_max
```

Details about the API are available in the [Yahoo! Developer Network](https://developer.yahoo.com/weather/).
