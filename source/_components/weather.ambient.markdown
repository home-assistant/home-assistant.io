---
layout: page
title: "Ambient Weather"
description: "Instructions on how to integrate Ambient Weather Network within Home Assistant."
date: 2018-11-24 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ambient-weather-logo.png
ha_category: Weather
ha_release: 0.32
ha_iot_class: "Cloud Polling"
---

The `ambient` weather platform uses [Ambient Weather](https://ambientweather.net/) as a source for information from a local weather station. To use this platform you must have an Ambient weather station installed at your location and the station must support sending weather data over the Internet to Ambient.

## {% linkable_title Configuration %}

You need an API key which is free but requires a [registration](https://ambientweather.net/).

To add Ambient Weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: ambient
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your API key for [Ambient Weather](https://ambientweather.net/).
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Ambient Weather
{% endconfiguration %}

<p class='note'>
This platform only reports current conditions from the local weather station. It does not provide a forecast. The condition string is based on a simple heuristic and should not be considered a reliable description of the actual current condition at the station.
</p>
