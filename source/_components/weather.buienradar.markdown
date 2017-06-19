---
layout: page
title: "Buienradar Weather"
description: "Instructions how to integrate buienradar.nl weather within Home Assistant."
date: 2017-05-15 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: buienradar.png
ha_category: Weather
ha_release: 0.44
ha_iot_class: "Cloud Polling"
---

The `buienradar` platform uses [buienradar.nl](http://buienradar.nl/) as an source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a webservice that provides detailed weather information for users in The Netherlands.
The relevant weatherstation used will be automatically selected based on the location specified in the Home Assistant configuration (or in the buienradar weather/sensor component).

To add the buienradar weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: buienradar
```

Configuration variables:

- **latitude** (*Optional*): Latitude to use for selection of data source location. Longitude & latitude will be taken from Home Assistant configuration, but can be overridden/changed in this component to select a different location for buienradar.
- **longitude**(*Optional*): Longitude to use for selection of data source location. Longitude & latitude will be taken from Home Assistant configuration, but can be overridden/changed in this component to select a different location for buienradar.
- **forecast** (*Optional*): 'True' to add a temperature forecast, 'False' to suppress it.


A full configuration example:

```yaml
# Example configuration.yaml entry
weather:
  - platform: buienradar
    name: buienradar
    latitude: 51.65
    longitude: 5.70
    forecast: True
```

<p class='note'>
This platform is an alternative to the [`buienradar`](/components/sensor.buienradar/) sensor.
The weather platform is easier to configure but less customisable.
</p>
