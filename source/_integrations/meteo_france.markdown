---
title: Météo-France
description: Instructions on how to integrate Météo-France within Home Assistant.
ha_release: 0.89
ha_iot_class: Cloud Polling
ha_category:
  - Sensor
  - Weather
ha_codeowners:
  - '@victorcerutti'
  - '@oncleben31'
  - '@Quentame'
ha_config_flow: true
ha_domain: meteo_france
---

The `meteo_france` integration uses the [Météo-France](http://www.meteofrance.com/) web service as a source for meteorological data for your location. The location is based on the `city` configured in your `configuration.yaml` file.

There is currently support for the following platforms within Home Assistant:

- [Sensor](#sensor)
- Weather

It displays the current weather along with a 4 days forecast and create sensors, including weather alerts from [Vigilance Météo-France](https://vigilance.meteofrance.com/)

## Setup the integration

There are two ways to integrate Météo-France in Home Assistant.

### Via the frontend

Menu: *Configuration* -> *Integrations*

Search for "Météo-France", add your city, click submit, you are done!

### Via the configuration file

To add Météo-France to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
meteo_france:
  - city: '76000'
```

{% configuration %}
  city:
    description: French postal code or name of the city ([see below](#about-city-configuration)).
    required: true
    type: string
{% endconfiguration %}

### About `city` configuration

This integration use the Météo-France search API to get the first city from the results returned.

It works well with french postal code, city name, etc. In case your expected result doesn't come first, you can set a more specified query like `<city name>, <postal_code>`.

It also works with international city, with mixed results. You may have to find the correct city query.
For example `Montreal, Canada` will return a city in Ardèche, France, whereas `Montreal, america` works

[https://www.meteofrance.com/mf3-rpc-portlet/rest/lieu/facet/previsions/search/montreal,amerique](https://www.meteofrance.com/mf3-rpc-portlet/rest/lieu/facet/previsions/search/montreal,amerique)

```yaml
# Example configuration.yaml entry for Montreal, Canada
meteo_france:
  - city: 'montreal,amerique'
```

## Sensor

All these sensors will be created :
- `temperature`: The current temperature.
- `weather`: A human-readable text summary of the current conditions.
- `wind_speed`: The wind speed.
- `uv`: The current UV index.
- `next_rain`: Time to the next rain if happening for the next hour ([see note below](#about-next_rain-condition-sensor)).
- `freeze_chance`: Probability of temperature below 0°C for the day.
- `rain_chance`: Probability of rain for the day.
- `snow_chance`: Probability of snow for the day.
- `thunder_chance`: Probability of thunderstorm for the day.
- `weather_alert`: Weather alert status ([see note below](#about-weather_alert-sensor)).

### About `next_rain` condition sensor

<div class='note warning'>

  The 1 hour rain forecast is supported for more than 75 % of metropolitan France.<br/>
  You can check if your city is covered on the [Météo-France website](https://www.meteofrance.com/previsions-meteo-france/previsions-pluie).

</div>

The `next_rain` sensor value is the time to next rain, from 0 to 55 minutes.
If no rain is forecasted for the next hour, value will be "No rain".

Attributes also give the forecast for the next hour in 5 minutes intervals.
Possible value for each intervals attributes are:

- 1 No rain
- 2 Light rain
- 3 Moderate rain
- 4 Heavy rain

### About `weather_alert` sensor

<div class='note warning'>
  The weather alert is available for the metropolitan France.
</div>

The `weather_alert` sensor value give the current weather alert status for the department linked to the city. Data is retrieve from [Météo-France vigilance website](https://vigilance.meteofrance.com/).

The sensor attributes give access to each type of alerts and date of the bulletin emitted by Météo-France.

### Complete example

This is an example for 3 cities forecast:

```yaml
# Complete example configuration.yaml entry
meteo_france:
  - city: '69004'
  - city: 'Rouen'
  - city: 'Oslo, norvege'
```
