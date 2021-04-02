---
title: "Template Weather Provider"
description: "Instructions on how to integrate Template Weather provider into Home Assistant."
ha_category: 
  - Weather
ha_release: 2021.3
ha_iot_class: "Local Push"
ha_qa_scale: internal
ha_domain: template
---

The `template` integrations creates weather provider that combines integrations and an existing weather provider into a fused weather provider.

There are several powerful ways to use this integration, including localizing your weather provider information with local information from temperature, humidity, pressure sensors that you own.

Another use case could be using temperature and humidity from one weather plaform, with forecasts from a different one.


## Configuration

To enable a Template Weather provider in your installation, add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
weather:
  - platform: template
    name: "my very own weather station"
    condition_template: "sunny"
    temperature_template: "{{ states('sensor.temperature') | float}}"
    humidity_template: "{{ states('sensor.humidity')| float }}"
    forecast_template: "{{ states.weather.my_region.attributes.forecast }}"
```

{% endraw %}

**Note:** The templates' values need to be in the units given below - the weather template will make sure that the values reported to Home Assistant are in appropriate units according to the system settings (metric or imperial).

{% configuration %}
name:
  description: Name to use in the frontend.
  required: true
  type: string
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
humidity_template:
  description: The current humidity in %.
  required: true
  type: template
attribution_template:
  description: The attribution to be shown in the frontend.
  required: false
  type: string
pressure_template:
  description: The current air pressure in hPa.
  required: false
  type: template
wind_speed_template:
  description: The current wind speed in m/s.
  required: false
  type: template
wind_bearing_template:
  description: The current wind bearing in °.
  required: false
  type: template
ozone_template:
  description: The current ozone level in ppm.
  required: false
  type: template
visibility_template:
  description: The current visibility in km.
  required: false
  type: template
forecast_template:
  description: Daily forecast data.
  required: false
  type: template
{% endconfiguration %}
