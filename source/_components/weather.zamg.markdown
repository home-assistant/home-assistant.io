---
layout: page
title: "ZAMG Weather"
description: "Instructions on how to integrate ZAMG sensors within Home Assistant."
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

## {% linkable_title Configuration %}

To add ZAMG to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: zamg
```

{% configuration %}
station_id:
  description: The ID number for a supported ZAMG station.
  required: false
  type: string
name:
  description: A name for the weather platform.
  required: false
  type: string
latitude:
  description: "Latitude coordinate to monitor weather of (required if **longitude** is specified)."
  required: false
  type: float
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
longitude:
  description: "Longitude coordinate to monitor weather of (required if **latitude** is specified)."
  required: false
  type: float
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
{% endconfiguration %}

<p class='note'>
This platform is an alternative to the [`zamg`](/components/sensor.zamg/) sensor. The `weather` platform is easier to configure but less customizable and doesn't have support for conditions which is a key feature of the `weather` platforms.
</p>
