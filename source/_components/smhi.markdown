---
layout: page
title: "SMHI"
description: "Instructions on how to integrate SMHI forecasts within Home Assistant."
date: 2018-09-23 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smhi.png
ha_category: Hub
ha_release: 0.81
ha_iot_class: "Cloud Polling"
---

The `smhi` component adds support for the [SMHI.se](https://www.smhi.se/) web service as a source for meteorological data for your location.

## {% linkable_title Configuration %}

The SMHI weather service is free under the Creative Commons Attribution 4.0, international license. Weather data will be pulled once every 30 minutes.

To add SMHI weather forecast to your installation, go to the Integrations page inside the config panel and add a location by providing the longitude and latitude of your location.

If the location is configured in Home Assistant, it will be selected as the default location. After that, you can add additional locations.

<p class='note warning'>
You can only add locations through the integrations page, not in configuration files.
</p>

<p class='note warning'>
Only location close to Sweden can be added. See [SMHI.se area](http://opendata.smhi.se/apidocs/metfcst/geographic_area.html) for more details what locations are supported.
</p>


{% configuration %}
latitude:
  description: Manually specify latitude. 
  required: false
  type: number
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude. 
  required: false
  type: number
  default: Provided by Home Assistant configuration
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Home
{% endconfiguration %}

Details about the API are available in the [SMHI API documentation](http://opendata.smhi.se/apidocs/metfcst/index.html).
