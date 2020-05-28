---
title: Met Office
description: Instructions on how to integrate Met Office weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_domain: metoffice
---

The `metoffice` weather platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data and provides the current weather along with the forecast for the next five days.

## Configuration

To add the Met Office weather platform to your installation, you'll need to register for a free API key at the link above and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: metoffice
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: "Your personal API key from the [Datapoint website](https://www.metoffice.gov.uk/datapoint)."
  required: true
  type: string
name:
  description: Additional name for the weather integration in Home Assistant.
  required: false
  type: string
  default: Met Office
latitude:
  description: "Latitude coordinate to monitor weather of (required if **longitude** is specified), defaults to coordinates defined in your `configuration.yaml`."
  required: inclusive
  type: float
longitude:
  description: "Longitude coordinate to monitor weather of (required if **latitude** is specified), defaults to coordinates defined in your `configuration.yaml`."
  required: inclusive
  type: float
{% endconfiguration %}

<div class='note'>

This platform is an alternative to the [`metoffice`](/integrations/sensor.metoffice/) sensor.
The weather platform is easier to configure but less customizable. The sensor however does not provide forecast data.

</div>
