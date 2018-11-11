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
ha_category: Transport
ha_iot_class: "Clound Polling"
---

The `sytadin` sensor platform allows you to monitor traffic details from [Sytadin](http://www.sytadin.fr).

## {% linkable_title Configuration %}

To add Sytadin to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sytadin
```

{% configuration %}
name:
  description: Additional name for the sensors.
  required: false
  default: Sytadin
  type: string
monitored_conditions:
  description: Conditions to display in the frontend.
  required: false
  default: traffic_jam
  type: list
  keys:
    traffic_jam:
      description: Amount of kilometers in traffic jam (km).
    mean_velocity:
      description: Mean velocity (km/h).
    congestion:
      description: Index of congestion (n/a).
{% endconfiguration %}

The data is coming from the [Direction des routes Île-de-France (DiRIF)](http://www.sytadin.fr).
