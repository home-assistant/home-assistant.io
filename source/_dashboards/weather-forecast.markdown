---
type: card
title: "Weather forecast card"
sidebar_label: Weather forecast
description: "The weather forecast card displays the weather. Very useful to include on interfaces that people display on the wall."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The weather forecast card displays the weather. This card is particularly useful on wall-mounted displays.

<p class='img'>
  <img src='/images/dashboards/weather.png' alt='Screenshot of the weather card'>
  Screenshot of the weather card.
</p>

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration_basic %}
Entity:
  description: "The entity of the `weather` platform to use."
Name:
  description: The name of the location where the weather platform is located. If not set, the name will be the name set on the weather entity
Show Forecast:
  description: Check this if you would like to show the upcoming forecast under the current weather.
Forecast type:
  description: Select the forecast to display between "Daily", "Hourly" and "Twice daily".
Secondary Info Attribute:
  description: Here you can specify a secondary attribute to show under the current temperature. Ex. Extrema, Precipitation, Humidity. If not set, it will default to Extrema (High/Low) if available, if not available then Precipitation and if precipitation isn't available then Humidity.
Theme:
  description: Name of any loaded theme to be used for this card. For more information about themes, see the [frontend documentation](/integrations/frontend/).
{% endconfiguration_basic %}

{% important %}
This card works only with platforms that define a `weather` entity.
E.g., it works with [OpenWeatherMap](/integrations/openweathermap/#weather) but not [OpenWeatherMap Sensor](/integrations/openweathermap/#sensor)
{% endimportant %}

</div>

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`weather-forecast`"
  type: string
entity:
  required: true
  description: Entity ID of `weather` domain.
  type: string
name:
  required: false
  description: Overwrites the friendly name.
  type: string
  default: Entity name
show_forecast:
  required: false
  description: Show next hours/days forecast.
  type: boolean
  default: true
forecast_type:
  required: true
  description: Type of forecast to display, one of `daily`, `hourly` or `twice_daily`.
  type: string
  default: Automatically selects in order of `daily`, `hourly` and `twice_daily`.
secondary_info_attribute:
  required: false
  description: Which attribute to display under the temperature.
  type: string
  default: Defaults to `extrema` if available, if not available then `precipitation` and if precipitation isn't available then `humidity`.
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
tap_action:
  required: false
  description: The action taken on card tap. For more information, see the [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: The action taken on card tap and hold. For more information, see the [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: The action taken on card double-tap. For more information, see the [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

### Example

```yaml
show_current: true
show_forecast: true
type: weather-forecast
entity: weather.openweathermap
forecast_type: daily
```

### Advanced

#### Themeable icons

The default weather icons are themable via a [theme](/integrations/frontend/#themes). Theme variables include:

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

#### Personal icons

Weather icons can be overwritten with your own personal images via a [theme](/integrations/frontend/#themes). Theme variables include:

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
--weather-icon-sunny: url("/local/sunny.png")
```
