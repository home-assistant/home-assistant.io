---
title: Om Luftkvalitet i Norge (Norway Air)
description: Display the current status of Norway air quality.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.88
ha_domain: norway_air
ha_platforms:
  - air_quality
ha_integration_type: integration
---

The `norway_air` integration [queries](https://luftkvalitet.miljostatus.no/) the Norway air quality [data feed](https://api.met.no/weatherapi/airqualityforecast/0.1/documentation) provided by the Norwegian Meteorological Institute.

To add air quality sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: norway_air
```

{% configuration %}
name:
  description: Additional name for the sensor.
  required: false
  type: string
  default: Air quality
forecast:
  description: If you want to get forecast data instead of the current data, set this to the number of hours that you want to look into the future.
  required: false
  type: integer
latitude:
  description: Manually specify latitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration
{% endconfiguration %}
