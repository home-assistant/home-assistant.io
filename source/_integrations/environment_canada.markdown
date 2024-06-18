---
title: Environment Canada
description: Weather data from Environment Canada.
ha_category:
  - Camera
  - Sensor
  - Weather
ha_platforms:
  - camera
  - diagnostics
  - sensor
  - weather
ha_release: 0.95
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@gwww'
  - '@michaeldavie'
ha_domain: environment_canada
ha_config_flow: true
ha_integration_type: integration
---

The **Environment Canada** {% term integration %} provides meteorological data for Canadian locations from [Environment and Climate Change Canada](https://weather.gc.ca/index_e.html).

{% include integrations/config_flow.md %}

## Location selection

The integration automatically determines the closest weather station based on the latitude and longitude specified. If integration-specific coordinates are not provided, the coordinates configured for Home Assistant are used.

You can also specify a weather station to use by providing an identification code of the form `AB/s0000123`, based on those listed in [this CSV file](https://dd.weather.gc.ca/citypage_weather/docs/site_list_towns_en.csv).

## Entities

The integration will create the entities listed below. Some of the entities are disabled by default and can be enabled via the integration's Entities page.

### Weather

- Current conditions and daily forecast
- Current conditions and hourly forecast (disabled by default)

### Camera

- Loop of radar imagery from the last 3 hours (disabled by default). Also, by default this entity uses the radar rain layer from 1 April to 30 November and the snow layer from 1 December to 31 March. The rain/snow layer can be changed using the service described below.

### Sensors

#### Conditions and forecasts

- Current condition
- Forecast summary
- [Icon code](https://dd.weather.gc.ca/citypage_weather/docs/Current_Conditions_Icons-Icones_conditions_actuelles.pdf) of current condition
- Barometric pressure
- Pressure tendency
- Humidity
- Visibility
- UV index
- Air quality (AQHI)

#### Temperature

- Temperature
- Forecast high temperature
- Forecast low temperature
- Dewpoint
- Wind chill (only at temperatures below 0ºC)
- Humidex (only at temperatures above 19ºC)

#### Wind

- Wind speed
- Wind gust
- Wind direction
- Wind bearing

#### Precipitation

- Probability of precipitation
- Precipitation yesterday

#### Alerts

- Warnings
- Watches
- Advisories
- Statements
- Endings

The alert sensors use the number of current alerts as their state, with an attribute containing the title of each alert.

## Solving problems

The Environment Canada service is very stable and provides high-quality data. Here are some steps that you can take before opening a problem report or posting on the forum.

### Service interruptions

Although infrequent, there have been some outages and instabilities of the Environment Canada service. If you see error messages in your logs similar to the one below, it is very unlikely to be a problem with this integration and is likely a problem with the Environment Canada service.

```txt
2022-10-05 12:25:08.619 ERROR (MainThread) [homeassistant.components.environment_canada] Timeout fetching environment_canada weather data
```

The first course of action should be to check if there are known problems with the service. Look for recent messages on the [Environment Canada mailing list](https://lists.ec.gc.ca/pipermail/dd_info/) ([example message](https://lists.ec.gc.ca/pipermail/dd_info/2022-October/000542.html)). The next course of action is to post on the forum. The answers are usually already known by someone.

### Sensor `unavailable` or `unknown`

Not all weather stations provide a complete set of weather/sensor data. The data that is retrieved by this integration can be found [here](https://dd.weather.gc.ca/citypage_weather/xml/). Browsing the XML data for your station will help you to understand what data is (un)available.

## Template sensors

The configuration snippet below adds a useful [template sensors](/integrations/template/) showing the current "feels like" temperature among air temperature, humidex, and wind chill.

Replace `NAME` with the name used to configure your integration.

{% raw %}

```yaml
template:
  - sensor:
    - name: "Feels Like"
      device_class: temperature
      unit_of_measurement: "°C"
      state: >
        {% if not is_state('sensor.NAME_humidex', 'unknown') %}
          {{ states('sensor.NAME_humidex') }}
        {% elif not is_state('sensor.NAME_wind_chill', 'unknown') %}
          {{ states('sensor.NAME_wind_chill') }}
        {% else %}
          {{ states('sensor.NAME_temperature') | round(0) }}
        {% endif %}
```

{% endraw %}


## Services

### Service `environment_canada.set_radar_type`

Sets the type of radar to retrieve for the camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | Camera to set the radar type for.
| `radar_type` | no | One of "Auto", "Rain", or "Snow".
