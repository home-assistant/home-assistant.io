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
ha_integration_type: service
---

The **Environment Canada** {% term integration %} provides meteorological data for Canadian locations from [Environment and Climate Change Canada](https://weather.gc.ca/index_e.html).

{% include integrations/config_flow.md %}

## Location selection

Choose your weather location using either:

- Station selector: Select a station location from a dropdown of all Environment Canada weather stations.
- Coordinates: Provide latitude and longitude to automatically find the nearest station (defaults to your Home Assistant location).

## Entities

The integration will create the entities listed below.

### Weather

- Current conditions, daily forecast, and hourly forecast

### Radar map (Camera)

- Loop of radar imagery from the last 3 hours.
- This entity is disabled by default and can be enabled in the entry's settings dialog.
- Radar display settings can be customized through the integration options. See [Radar camera options](#radar-camera-options) below.

### Sensors

#### Conditions and forecasts

- Current condition
- Forecast summary
- [Icon code](https://dd.weather.gc.ca/today/citypage_weather/docs/Current_Conditions_Icons-Icones_conditions_actuelles.pdf) of current condition
- Barometric pressure
- Pressure tendency
- Humidity
- Visibility
- UV index
- Air quality health index (AQHI)

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

#### Alerts

- Warnings
- Watches
- Advisories
- Statements
- Endings

The alert sensors use the number of current alerts as their state, with an attribute containing the title of each alert.

## Radar camera options

You can customize the radar display settings.
The following settings are available:

- **Radar type**: The radar layer to display: **Rain**, **Snow**, or **Precipitation type** (a composite layer showing the type of precipitation). The default is **Precipitation type**.
- **Show legend**: Whether to show the color legend on the radar image (default: off).
- **Show timestamp**: Whether to show the timestamp on the radar image (default: on).
- **Radar opacity**: Opacity of the radar overlay, from 0 to 100 (default: 65).
- **Map radius**: Radius of the radar map in kilometers, from 10 to 2,000 km (default: 200 km).
- **Loop duration**: How far back the radar animation goes, in minutes, from 0 to 180 (default: 0, which uses the full history available from Environment Canada).
- **Loop frame rate**: Frame rate of the radar animation, from 1 to 30 fps (default: 5 fps).
- **Color scale**: Number of colors in the **Rain** and **Snow** radar images, either **8 colors** or **14 colors** (default: 14 colors). This setting doesn't apply to the **Precipitation type** radar type, which always uses its own color scale.

### Configuring radar camera display

To configure the radar camera display:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Environment Canada** integration.
3. Select **Configure** (the cogwheel icon).
4. Change the options you want.
5. Select **Submit**.

Changing these settings reloads the integration, so the new radar settings take effect immediately. The radar camera entity is briefly unavailable during the reload.

## Solving problems

The Environment Canada service is very stable and provides high-quality data. Here are some steps that you can take before opening a problem report or posting on the forum.

### Service interruptions

Although infrequent, there have been some outages and instabilities of the Environment Canada service. If you see error messages in your logs similar to the one below, it is very unlikely to be a problem with this integration and is likely a problem with the Environment Canada service.

```txt
2022-10-05 12:25:08.619 ERROR (MainThread) [homeassistant.components.environment_canada] Timeout fetching environment_canada weather data
```

The first course of action should be to check if there are known problems with the service. Look for recent messages on the [Environment Canada mailing list](https://comm.collab.science.gc.ca/mailman3/hyperkitty/list/dd_info@comm.collab.science.gc.ca/) ([example message](https://comm.collab.science.gc.ca/mailman3/hyperkitty/list/dd_info@comm.collab.science.gc.ca/thread/QJHBU7C5MWICGFHETGQ5752MUWR6OZ6G/)). The next course of action is to post on the forum. The answers are usually already known by someone.

### Sensor `unavailable` or `unknown`

Not all weather stations provide a complete set of weather/sensor data. The data that is retrieved by this integration can be found [here](https://dd.weather.gc.ca/today/citypage_weather/). Browsing the XML data for your station will help you to understand what data is (un)available.

## Template sensors

The configuration snippets below add [template sensors](/integrations/template/). See the [weather integration](/integrations/weather/) for additional examples.

Replace `NAME` with the weather entity used in your configuration.

### Feels Like

A sensor that takes into account the humidex or wind chill for what the temperature feels like.

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

### Additional Forecast Data

The configuration snippet below adds a template sensor containing the current forecast information as attributes and the text summary of the forecast for the current day.

```yaml
- trigger:
    - platform: time_pattern
      hours: "/4"
    - platform: homeassistant
      event: start
    - platform: event
      event_type: event_template_reloaded
  actions:
    - action: environment_canada.get_forecasts
      target:
        entity_id: weather.NAME
      response_variable: forecasts
  sensor:
    - name: Weather Forecast Daily
      unique_id: weather_forecast_daily
      state: "{{ states('weather.NAME') }}"
      attributes:
        daily: "{{ forecasts['weather.NAME']['daily_forecast'] }}"
        hourly: "{{ forecasts['weather.NAME']['hourly_forecast'] }}"
        summary: "{{ forecasts['weather.NAME']['daily_forecast'][0]['text_summary'] }}"
        temperature_unit: "{{ state_attr('weather.NAME', 'temperature_unit') }}"
```

### Alerts

To get the alerts in a sensor with all the alert data, use the following, replacing `CONFIG_ENTRY_ID` with an actual `config_entry_id`. Note, this updates the sensor every minute, adjust to your needs. The Environment Canada integration updates forecast data, which includes alerts, every 5 minutes.

```yaml
- trigger:
    - platform: time_pattern
      minutes: "/1"
    - platform: homeassistant
      event: start
    - platform: event
      event_type: event_template_reloaded
  actions:
    - action: environment_canada.get_alerts
      data:
        config_entry_id: "CONFIG_ENTRY_ID"
      response_variable: alerts
  sensor:
    - name: "Medicine Hat Alert Data"
      unique_id: "CONFIG_ENTRY_ID"
      state: "{{ alerts.values() | map('length') | sum }}"
      attributes:
        alerts: "{{ alerts }}"
```

{% include integrations/actions.md %}
