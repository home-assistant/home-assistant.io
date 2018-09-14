---
layout: page
title: "IPMA"
description: "Instructions on how to integrate Instituto Português do Mar e Atmosfera weather conditions into Home Assistant."
date: 2018-05-31 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ipma.png
ha_category: Weather
ha_release: 0.72
ha_iot_class: "Cloud Polling"
---

The `ipma` weather platform uses the [Instituto Português do Mar e Atmosfera](http://www.ipma.pt) as a source for current and forecast meteorological data.

## {% linkable_title Configuration %}

To add the IPMA weather platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: ipma 
```

{% configuration %}
name:
  description:  The name you would like to give to the weather station.
  required: false 
  default: The name of the used station
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
