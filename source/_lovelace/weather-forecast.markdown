---
title: "Weather Forecast Card"
sidebar_label: Weather Forecast
description: "The Weather Forecast card displays the weather. Very useful to include on interfaces that people display on the wall."
---

The Weather Forecast card displays the weather. Very useful to include on interfaces that people display on the wall.

<p class='img'>
<img src='/images/lovelace/lovelace_weather.png' alt='Screenshot of the weather card'>
Screenshot of the weather card.
</p>

{% configuration %}
type:
  required: true
  description: weather-forecast
  type: string
entity:
  required: true
  description: "The `entity_id` of the `weather` platform to use."
  type: string
name:
  required: false
  description: Overwrites the friendly name.
  type: string
  default: Entity Name
show_forecast:
  required: false
  description: Show next hours/days forecast.
  type: boolean
  default: true
secondary_info_attribute:
  required: false
  description: Which attribute to display under the temperature.
  type: boolean
  default: Defaults to Extrema if Available, if not available then Precipitation and if precipitation isn't available then Humidity.
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

Example

```yaml
type: weather-forecast
entity: weather.openweathermap
```

<div class="note">

  This card works only with platforms that define a `weather` entity.
  
  E.g., it works with [OpenWeatherMap](https://www.home-assistant.io/integrations/openweathermap/#weather) but not [OpenWeatherMap Sensor](https://www.home-assistant.io/integrations/openweathermap/#sensor)

</div>

### Advanced

The default weather icons are themable via a [Theme](https://www.home-assistant.io/integrations/frontend/#themes). Theme variables include: 

```yaml
--weather-icon-cloud-front-color
--weather-icon-cloud-back-color
--weather-icon-sun-color
--weather-icon-rain-color
--weather-icon-moon-color
```

Example theme configuration:

```yaml
--weather-icon-cloud-front-color: white
--weather-icon-cloud-back-color: blue
--weather-icon-sun-color: orange
--weather-icon-rain-color: purple
```

Weather icons can be overwritten with your own personal images via a theme. Theme variables include:

```yaml
--weather-icon-clear-night
--weather-icon-cloudy
--weather-icon-fog
--weather-icon-lightning
--weather-icon-lightning-rainy
--weather-icon-partlycloudy
--weather-icon-pouring
--weather-icon-rainy
--weather-icon-hail
--weather-icon-snowy
--weather-icon-snowy-rainy
--weather-icon-sunny
--weather-icon-windy
--weather-icon-windy-variant
--weather-icon-exceptional

// If your state is not above, use this format
--weather-icon-<state>
```

Example theme configuration:

```yaml
--weather-icon-sunny: url("local/sunny.png")
```
