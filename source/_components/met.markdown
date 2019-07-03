---
layout: page
title: "Met.no"
description: "Instructions on how to integrate Met.no within Home Assistant."
date: 2018-09-17 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: metno.png
ha_category:
  - Weather
ha_release: 0.79
ha_iot_class: Cloud Polling
redirect_from:
 - /components/weather.met/
---

The `met` platform uses the [Met.no](https://met.no/) web service as a source for meteorological data for your location. The weather forecast is delivered by the Norwegian Meteorological Institute and the NRK.

<p class='note warning'>
  Configuration of the Met.no platform via configuration.yaml is deprecated from version 0.95 
</p>
 
## {% linkable_title Configuration %}

To add Met.no to your installation, go to Configuration >> Integrations in the UI and enable the Met.no integration.

{% configuration %}
name: 
  description: Manually specify Name. 
  required: true
  default: Provided by Home Assistant configuration
latitude:
  description: Manually specify latitude. 
  required: true
  type: number
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude. 
  required: true
  type: number
  default: Provided by Home Assistant configuration
altitude:
  description: Manually specify altitude. By default the value will be taken from the Home Assistant configuration.
  required: false
  type: number
  default: Provided by Home Assistant configuration
{% endconfiguration %}
