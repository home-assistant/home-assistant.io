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

NOTE: Configuration of the Met.no platform via configuration.yaml is deprecated from version 0.95

## {% linkable_title Configuration %}

To add Met.no to your installation, go to Configuration >> Integrations in the UI and enable the Met.no integration.

Confuration items:
Name: 
  Description: Manually specify Name. 
  Required: true
  Default: Provided by Home Assistant configuration
Latitude:
  Description: Manually specify latitude. 
  Required: true
  Type: number
  Default: Provided by Home Assistant configuration
Longitude:
  Description: Manually specify longitude. 
  Required: true
  Type: number
  Default: Provided by Home Assistant configuration
Altitude:
  Description: Manually specify altitude. By default the value will be taken from the Home Assistant configuration.
  Required: false
  Type: number
  Default: Provided by Home Assistant configuration


