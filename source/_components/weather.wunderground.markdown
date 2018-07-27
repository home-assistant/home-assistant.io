---
layout: page
title: "Weather Underground (WUnderground)"
description: "Instructions on how to integrate Weather Underground (WUnderground) within Home Assistant."
date: 2018-07-27 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: wunderground.png
ha_category: Weather
ha_release: 0.75
ha_iot_class: "Cloud Polling"
---

The `wunderground` weather platform uses [Weather Underground](http://www.wunderground.com/) as a source for current meteorological data for your location.

## {% linkable_title Configuration %}

<p class='note warning'>
Obtain a Weather Underground API key [here](https://www.wunderground.com/weather/api). They no longer offer free API keys, and all keys must be paid for, at this time existing free keys will continue to work, but may be disabled in the future.
</p>

To add WUnderground to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: wunderground
    api_key: YOUR_API_KEY
```

{% configuration %}
name:
  description:  Name to use in the frontend.
  required: false 
  default: Weather Underground
  type: string
api_key:
  description: Your API key for Weather Underground. See above for details.
  required: true 
  type: string
pws_id:
  description: You can enter a Personal Weather Station ID. The current list of WUnderground PWS stations is available [here](https://www.wunderground.com/weatherstation/ListStations.asp). If a pws_id is set, the latitude and longitude will be ignored.
  required: false 
  type: string
latitude:
  description: Latitude of the location for which you want weather information.
  required: false 
  default: Home Assistant global latitude configuration 
  type: string
longitude:
  description: Longitude of the location for which you want weather information.
  required: false 
  default: Home Assistant global longitude configuration 
  type: string
{% endconfiguration %}

<p class='note'>
This platform is an alternative to the [`wunderground`](/components/sensor.wunderground/) sensor. 
</p>
