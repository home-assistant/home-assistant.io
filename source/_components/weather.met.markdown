---
layout: page
title: "Met.no"
description: "Instructions on how to integrate Met.no within Home Assistant."
date: 2018-09-17 09:00
sidebar: true
comments: false
sharing: true
footer: true
featured: true
logo: metno.png
ha_category: Weather
ha_release: 0.79
ha_iot_class: "Cloud Polling"
---

The `met` platform uses the [Met.no](https://met.no/) web service as a source for meteorological data for your location. The weather forecast is delivered by the Norwegian Meteorological Institute and the NRK.

To add Met to your installation, add the following to your `configuration.yaml` file:

```yaml
weather:
  - platform: met
```
