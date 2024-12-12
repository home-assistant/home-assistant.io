---
title: "Template Weather Provider"
description: "Instructions on how to integrate Template Weather provider into Home Assistant."
ha_category: 
  - Weather
  - Helper
ha_release: 2021.3
ha_iot_class: "Local Push"
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - weather
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `template` integrations creates weather provider that combines integrations and an existing weather provider into a fused weather provider.

There are several powerful ways to use this {% term integration %}, including localizing your weather provider information with local information from temperature, humidity, pressure sensors that you own.

Another use case could be using temperature and humidity from one weather platform, with forecasts from a different one.

Output will be converted according to the user's unit system or {% term entity %} override, see [documentation](https://developers.home-assistant.io/docs/core/entity/weather/#unit-conversion).

## Configuration

To enable a Template Weather provider in your installation, add the following to your {% term "`configuration.yaml`" %} file:

(Note, be sure to update my_region in the condition and forecast templates to an appropriate value for your setup).

{% raw %}

```yaml
# Example configuration.yaml entry
weather:
  - platform: template
    name: "My Weather Station"
    condition_template: "{{ states('weather.my_region') }}"
    temperature_template: "{{ states('sensor.temperature') | float }}"
    temperature_unit: "°C"
    humidity_template: "{{ states('sensor.humidity') | float }}"
    forecast_daily_template: "{{ state_attr('weather.my_region', 'forecast_data') }}"
```

{% endraw %}

{% configuration %}
name:
  description: Name to use in the frontend.
  required: true
  type: template
unique_id:
  description: An ID that uniquely identifies this weather entity. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
condition_template:
  description: The current weather condition.
  required: true
  type: template
temperature_template:
  description: The current temperature.
  required: true
  type: template
dew_point_template:
  description: The current dew point.
  required: false
  type: template
apparent_temperature_template:
  description: The current apparent (feels-like) temperature.
  required: false
  type: template
temperature_unit:
  description: Unit for temperature_template output. Valid options are °C, °F, and K.
  required: false
  type: string
humidity_template:
  description: The current humidity.
  required: true
  type: template
attribution_template:
  description: The attribution to be shown in the frontend.
  required: false
  type: string
pressure_template:
  description: The current air pressure.
  required: false
  type: template
pressure_unit:
  description: Unit for pressure_template output. Valid options are Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, psi.
  required: false
  type: string
wind_speed_template:
  description: The current wind speed.
  required: false
  type: template
wind_gust_speed_template:
  description: The current wind gust speed.
  required: false
  type: template
wind_speed_unit:
  description: Unit for wind_speed_template output. Valid options are m/s, km/h, mph, mm/d, in/d, and in/h.
  required: false
  type: string
wind_bearing_template:
  description: The current wind bearing.
  required: false
  type: template
ozone_template:
  description: The current ozone level.
  required: false
  type: template
cloud_coverage_template:
  description: The current cloud coverage.
  required: false
  type: template
visibility_template:
  description: The current visibility.
  required: false
  type: template
visibility_unit:
  description: Unit for visibility_template output. Valid options are km, mi, ft, m, cm, mm, in, yd.
  required: false
  type: string
forecast_daily_template:
  description: Daily forecast data.
  required: false
  type: template
forecast_hourly_template:
  description: Hourly forecast data.
  required: false
  type: template
forecast_twice_daily_template:
  description: Twice daily forecast data.
  required: false
  type: template
precipitation_unit:
  description: Unit for precipitation output. Valid options are km, mi, ft, m, cm, mm, in, yd.
  required: false
  type: string
{% endconfiguration %}

### Template variables

State-based template entities have the special template variable `this` available in their templates. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an {% term entity %}'s state and attribute in templates.
