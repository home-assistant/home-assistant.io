---
layout: page
title: "NOAA/NWS Sensor"
description: "How to integrate NOAA/National Weather Service observations within Home Assistant."
date: 2019-04-15 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: noaa.png
ha_category:
  - Sensor
ha_release: 0.94
ha_iot_class: Cloud Polling
---

The `noaaweather` platform uses the [US NOAA/National Weather Service](https://www.weather.gov/) web service as a source for meteorological data for your location. The location is based on the `longitude` and `latitude` coordinates configured in your `configuration.yaml` file. The specific observation station for that area can be specified, or the closest station will be used. A majority of the observation stations are located at airports, and identified by the ICAO airport code.

## {% linkable_title Configuration %}

To add NOAA/NWS Weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: noaaweather
    useragent:	email@example.com
    monitored_conditions:
      - temperature
      - windSpeed
      - windDirection
```

{% configuration %}
name:
  description: Additional name for the sensors.
  required: false
  default: NOAAWeather
  type: string
latitude:
  description: Latitude coordinate to monitor weather of (required if **longitude** is specified). Note that the value is rounded to four decimal places.
  required: inclusive
  default: coordinates defined in your `configuration.yaml`
  type: float
longitude:
  description: Longitude coordinate to monitor weather of (required if **latitude** is specified). Note that the value is rounded to four decimal places.
  required: inclusive
  default: coordinates defined in your `configuration.yaml`
  type: float
stationcode:
  description: "The code for the NOAA/NWS weather reporting station. If it is specified, it must match one of the weather reporting stations listed by NOAA/NWS for the area around the point, typically those within 50-100 miles. The majority of thesei stations are airport locations, for which the station code is the ICAO airport code. Choices for the station codes for a location can be found by going to the weather.gov forecast page for the location and using the 'More Local WX' link to get a list of available stations. The station code is part of the URL provided for the station: the upper case characters just before the '.html' suffix is the station code."
  required: false
  type: string
  default: nearest weather reporting station to the specified point.
usahaweathercond:
  description: If `false`, the values provided for textDescription will be used as received from the NOAA/NWS response. If `true`, the values will be converted to Home Assistant's standard weather condition text values.
  required: false
  type: boolean
  default: false
useragent:
  description: The value supplied to the NOAA/NWS servers to indentify the source of the request. This should be set to a valid e-mail address, website URL or other contact information. In the future this might need to be an API key.
  required: false
  type: string
  default: ha-noaaweather
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    temperature:
      description: The air temperature.
    textDescription:
      description: Description in text of the current weather conditions.
    dewpoint:
      description: The dew point.
    windSpeed:
      description: The wind speed.
    windGust:
      description: The wind gust speed. This value is 'unknown' when the wind speed is 0.
    windDirection:
      description: The direction that the wind is coming **from** in degrees, with true north at 0° and progressing clockwise. If `wind speed` is 0, then this value is `unknown`.
    windChill:
      description: The temperature that the air feels like due to the impact of winds. This value is 'unknown' if the wind speed is less than 3 mph (4.8 km/h) and the temperature is over 50°F (10°C).
    heatIndex:
      description: The temperature that the air feels like due to the impact of humidity.
    relativeHumidity:
      description: The relative humidity.
    barometricPressure:
      description: The air pressure in millibars.
    seaLevelPressure:
      description: The air pressure at sea level in millibars.
    visibility:
      description: The average visibility.
    cloudLayers:
      description: The three character abbreviation for the lowest cloud layer.
    precipitationLastHour:
      description: The amount of precipitation measured in the last hour (as liquid).
    precipitationLast3Hours:
      description: The amount of precipitation measured in the previous three hours (as liquid). This value is only provided once every three hours, and only when there has been some precipitation measured during that three hour interval.
    precipitationLast6Hours:
      description: The amount of precipitation measured in the previous six hours (as liquid). This value is only provided once every six hours, and only when there has been some precipitation measured during that six hour interval.
    minTemperatureLast24Hours:
      description: The minimum temperature in the previous 24 hour period. This value is only provided once per 24 hours.
    maxTemperatureLast24Hours:
      description: The maximum temperature measured in the previous 24 hour period. This value is only provided once per 24 hours.
{% endconfiguration %}

### {% linkable_title Notes about measurements and stations %}

Most stations only report values once per hour, normally during the 10 minute period before the hour. Non-airport stations may report more frequently, and airport stations may also provide new values for some measurements when a significant change occurs during the rest of the hour. 

There are a variety of cases where the NOAA/NWS API returns 'unknown' for a measurement. If the station does not have the equipment to perform the measurement, 'unknown' will be returned. However, if there is no current measurement for some other reason (for example, no wind gusts), 'unknown' will also be returned. Also, a number of values are calculated from other values, so if one of the inputs to the calculation is 'unknown', the result is also 'unknown'. The component deals with this by not updating the state if the 'unknown' response is due to a lack of a value being available for this update. In cases where it is clear that the 'unknown' response is due to a lack of the ability to measure the value the state will be set to 'unknown'.

Each sensor value will include an attribute with the timestamp received with the measurement.

On startup, the component will process the last two hours of updates to try to ensure that a full update will be processed to minimize the initial 'unknown' values.
