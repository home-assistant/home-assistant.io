---
layout: page
title: "World Wide Lightning Location Network (WWLLN)"
description: "Instructions on how to integrate WWLLN within Home Assistant."
date: 2019-07-06 23:17
sidebar: true
comments: false
sharing: true
footer: true
logo: wwlln.jpg
ha_category:
  - Weather
  - Sensor
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_config_flow: true
redirect_from:
  - /components/binary_sensor.wwlln/
  - /components/sensor.wwlln/
---

The `wwlln` integration displays lightning strike information from the
[World Wide Lightning Location Network (WWLLN)](http://wwlln.net).

New data is returned every 5 minutes.

## Configuration

To retrieve data from the WWLLN, add the following to your `configuration.yaml`
file:

```yaml
wwlln:
```

{% configuration %}
latitude:
  description: The latitude you want to monitor; defaults to the value defined in `configuration.yaml`.
  required: false
  type: float
longitude:
  description: The longitude you want to monitor; defaults to the value defined in `configuration.yaml`.
  required: false
  type: float
radius:
  description: The radius around your lcoation to monitor; defaults to 25 km or mi (depending you the unit system defined in `configuration.yaml`).
  required: false
  type: int
{% endconfiguration %}
