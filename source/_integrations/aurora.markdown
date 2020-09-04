---
title: Aurora
description: Know when auroras might be visible at your location
ha_category:
  - Environment
ha_release: 0.39
ha_domain: aurora
---

The `aurora` platform uses the [NOAA Aurora Forecast](https://www.swpc.noaa.gov/products/aurora-30-minute-forecast) service to let you know if an aurora might be visible at your home location in the next 30 minutes, based off of current solar flare activity.

This service gives a number 0-100 representing the current likelihood of visible auroras at your latitude/longitude. By default this sensor is set up to trigger when the reported likelihood for your location is > 75. It updates every 5 minutes.

You can check the attributes of the sensor to see your exact forecast.

## Configuration

To add the aurora binary sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: aurora
```

{% configuration %}
forecast_threshold:
  description: Provide your own threshold number above which the sensor will trigger.
  required: false
  type: integer
  default: 75
name:
  description: The name of the sensor.
  required: false
  type: string
  default: Aurora Visibility
{% endconfiguration %}

## Full example

```yaml
binary_sensor:
  - platform: aurora
    forecast_threshold: 50
```
