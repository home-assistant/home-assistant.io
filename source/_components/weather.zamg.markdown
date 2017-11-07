---
layout: page
title: "ZAMG Weather"
description: "Instructions how to integrate ZAMG sensors within Home Assistant."
date: 2016-12-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: zamg.png
ha_category: Weather
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---

The `zamg` platform uses meteorological details published by the Austrian weather service [Zentralanstalt für Meteorologie und Geodynamik (ZAMG)](https://www.zamg.ac.at).

Only observations for capital cities are publicly available. You can check the list of stations in [CSV format](http://www.zamg.ac.at/ogd).

To add ZAMG to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: zamg
```

Configuration variables:

- **station_id** (*Optional*): The ID number for a supported ZAMG station.
- **name** (*Optional*): A name for the weather platform.
- **latitude** (*Optional*): Latitude coordinate to monitor weather of (required if **longitude** is specified). Defaults to coordinates defined in your `configuration.yaml` file.
- **longitude** (*Optional*): Longitude coordinate to monitor weather of (required if **latitude** is specified). Defaults to coordinates defined in your `configuration.yaml` file.

<p class='note'>
This platform is an alternative to the [`zamg`](/components/sensor.zamg/) sensor. The weather platform is easier to configure but less customizable.
</p>
