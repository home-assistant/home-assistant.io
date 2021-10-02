---
title: Environment Canada Weather and Radar
description: Weather data from Environment Canada.
ha_category:
  - Weather
  - Sensor
  - Camera
  - Health
ha_platforms:
  - camera
  - sensor
  - weather
ha_release: 0.95
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@michaeldavie'
  - '@gwww'
ha_domain: environment_canada
ha_config_flow: true
ha_quality_scale: gold
---

The `environment_canada` integration provides meteorological data for Canadian locations from [Environment and Climate Change Canada](https://weather.gc.ca/index_e.html).

{% include integrations/config_flow.md %}

## Location Selection

The integration automatically determines the closest weather station based on the latitude and longitude specified. If integration-specific coordinates are not provided, the coordinates configured for Home Assistant are used.

You can also specify a weather station to use by providing a identification code of the form `AB/s0000123`, based on those listed in [this CSV file](https://dd.weather.gc.ca/citypage_weather/docs/site_list_towns_en.csv).

## Entities

The integration will create the entities listed below. Note that many of the entities are disabled by default and can be enabled via the Configuration / Entities screen.

### Weather

- Current conditions and daily forecast
- Current conditions and hourly forecast

### Camera

- Loop of radar imagery from the last 3 hours

By default, the radar entity uses the rain layer from 1 April to 30 November and the snow layer from 1 December to 31 March. This can be set manually using the `environment_canada.set_radar_type` service.

### Sensors

#### Conditions and Forecasts

- Current condition
- Forecast summary
- [Icon code](https://dd.weather.gc.ca/citypage_weather/docs/Current_Conditions_Icons-Icones_conditions_actuelles.pdf) of current condition
- Barometric pressure
- Pressure tendency
- Humidity
- Visibility
- UV index
- Air Quality Health Index (AQHI)

#### Temperature

- Temperature
- Wind chill
- Humidex
- Forecast high temperature
- Forecast low temperature
- Normal high temperature
- Normal low temperature
- Dewpoint

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

## Template Sensors

The configuration snippet below adds two useful [template sensors](https://www.home-assistant.io/integrations/template/):

- The current "feels like" temperature among air temperature, humidex, and wind chill
- The title of the highest-priority current alert

Replace `NAME` with the name used to configure your integration.

{% configuration %}
sensor:
  - platform: template
    sensors:

      feels_like:
        friendly_name: "Feels Like"
        device_class: temperature
        unit_of_measurement: "°C"
        value_template: >
          {% if not is_state('sensor.NAME_humidex', 'unknown') %}
            {{ states('sensor.NAME_humidex') }}
          {% elif not is_state('sensor.NAME_wind_chill', 'unknown') %}
            {{ states('sensor.NAME_wind_chill') }}
          {% else %}
            {{ states('sensor.NAME_temperature') | round(0) }}
          {% endif %}

      highest_alert:
        friendly_name: "Alerts"
        value_template: >
          {% if states('sensor.NAME_warning_alerts') | int > 0 %}
            {{
              state_attr('sensor.NAME_warning_alerts', 'alert 1')
            }}
          {% elif states('sensor.NAME_watch_alerts') | int > 0 %}
            {{
              state_attr('sensor.NAME_watch_alerts', 'alert 1')
            }}
          {% elif states('sensor.NAME_advisory_alerts') | int > 0 %}
            {{
              state_attr('sensor.NAME_advisory_alerts', 'alert 1')
            }}
          {% elif states('sensor.NAME_statement_alerts') | int > 0 %}
            {{
              state_attr('sensor.NAME_statement_alerts', 'alert 1')
            }}
          {% elif states('sensor.NAME_ending_alerts') | int > 0 %}
            {{
              state_attr('sensor.NAME_ending_alerts', 'alert 1')
            }}
          {% endif %}
{% endconfiguration %}
