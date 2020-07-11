---
title: Météo-France
description: Instructions on how to integrate Météo-France within Home Assistant.
ha_release: 0.89
ha_iot_class: Cloud Polling
ha_category:
  - Sensor
  - Weather
ha_codeowners:
  - '@oncleben31'
  - '@Quentame'
ha_config_flow: true
ha_domain: meteo_france
---

The `meteo_france` integration uses the meteorological data from [Météo-France](http://www.meteofrance.com/) to provide weather forecast for any location in the world. One or more locations can be set via the front end or via the configuration file.

The integration support the following platforms within Home Assistant:

- [Weather](#weather-platform)
- [Sensor](#sensor-platforms)

It displays the current weather along with a 5 days forecast and create sensors, including weather alerts and 1 hour rain forecast when available.

## Setup the integration

There are two ways to integrate Météo-France in Home Assistant.

### Via the frontend (recommended)

Menu: **Configuration** -> **Integrations** click the button with `+` sign and from the list of integrations select **Météo-France**

Enter your city or French postal code in the form. If more than one city correspond to your search in the Météo-France's database you will have the possibility to select one in a dropdown list. Click submit, you are done!

### Via the configuration file

With this way of configuration you can't select a specific cities if more than one location is found in the  Météo-France database corresponding to your inputs. The integration will take the first one returned by the API.

To add Météo-France to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for 2 cities
meteo_france:
  - city: '76000'
  - city: 'Auch'
```

{% configuration %}
  city:
    description: French postal code or name of the city.
    required: true
    type: string
{% endconfiguration %}

## Weather platform

To be used with the weather lovelace card to access current condition, today and next four days forecast.

## Sensor platforms

All the following sensors will be created :

|Entity|Description|Enabled by default|
|------|-----------|------------------|
|`cloud`|The current cloud cover in %|Yes|
|`freeze_chance` |Probability of temperature below 0°C in the following hours|Yes|
|`next_rain`|Datetime of the next rain if expected within the next hour ([see note below](#about-next_rain-condition-sensor))|Yes|
|`precipitation`|Precipitation cumulation for next 24 hours in mm|Yes|
|`pressure`|The current pressure in hPa|No|
|`rain_chance` |Probability of rain in the following hours|Yes|
|`snow_chance` |Probability of snow for the following hours|Yes|
|`temperature`|The current temperature in °C|No|
|`uv`|The current UV index|Yes|
|`weather_alert` |Weather alert status ([see note below](#about-weather_alert-sensor))|Yes|
|`wind_speed` |The current wind speed in km/h|No|

Warning: The probability entities data are not always provided by the API. They are added only if available.

### About `next_rain` condition sensor

<div class='note warning'>

  The 1 hour rain forecast is supported for more than 75 % of metropolitan France.<br/>
  You can check if your city is covered on the [Météo-France website](https://www.meteofrance.com/previsions-meteo-france/previsions-pluie).

</div>

The attributes allow to have a forecast of the rain type by 5 to 10 minutes intervals.

### About `weather_alert` sensor

<div class='note warning'>
  The weather alert is available for the metropolitan France and Andorre.
</div>

The `weather_alert` sensor state give the current weather alert status for the department linked to the city. Only one entity by department is created.

The sensor attributes give access to each type of alerts raised by Météo-France.
