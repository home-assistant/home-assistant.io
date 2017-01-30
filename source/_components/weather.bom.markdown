---
layout: page
title: "BOM Australia"
description: "Instructions on how to integrate Bureau of Meteorology Australia weather conditions into Home Assistant."
date: 2016-09-29 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bom.png
ha_category: Weather
ha_release: 0.36
---

The `bom` weather platform uses the [Australian Bureau of Meteorology (BOM)](http://www.bom.gov.au) as a source for current (half-hourly) meteorological data.

To add the BOM weather platform to your installation, add the following to your `configuration.yaml` file:

```yaml
weather:
  - platform: bom
```

Configuration variables:

- **name** (*Optional*): The name you would like to give to the weather station.
- **station** (*Optional*): The station ID string; defaults to the closest station.  See the [`sensor.bom` docs](/components/sensor.bom/) for details on how to find the ID of a station.

<p class='note'>
This platform is an alternative to the [`bom`](/components/sensor.bom/) sensor.
The weather platform is easier to configure but less customisable.
</p>
