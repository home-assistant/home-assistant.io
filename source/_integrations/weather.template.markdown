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
  description: The current humidity.
  required: true
  type: template
pressure_template:
  description: The current air pressure.
  required: false
  type: template
wind_speed_template:
  description: The current wind speed.
  required: false
  type: template
forecast_template:
  description: Daily forecast data.
  required: false
  type: template
{% endconfiguration %}

## Considerations

If you are using the state of a integration that takes extra time to load, the Template Weather may get an `unknown` state during startup. This results in error messages in your log file until that integration has completed loading. If you use `is_state()` function in your template, you can avoid this situation.
