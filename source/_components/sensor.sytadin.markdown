---
layout: page
title: "Sytadin Sensor"
description: "Instructions on how to integrate Sytadin sensors into Home Assistant."
date: 2017-10-05 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sytadin.png
ha_release: 0.57
ha_category: Sensor
ha_iot_class: "Clound Polling"
---

The `sytadin` sensor platform allows you to monitor traffic details from [Sytadin](http://www.sytadin.fr).

To add Sytadin to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sytadin
```

Configuration variables:

- **name** (*Optional*): Additional name for the sensors. Default to platform name.
- **monitored_conditions** array (*Optional*): Conditions to display in the frontend. Defaults to `traffic_jam`.
  - **traffic_jam**: Amount of kilometers in traffic jam (km).  
  - **mean_velocity**: Mean velocity (km/h).
  - **congestion**: Index of congestion (n/a).

The data is coming from the [Direction des routes Île-de-France (DiRIF)](http://www.sytadin.fr).
