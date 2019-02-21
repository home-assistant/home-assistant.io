---
layout: page
title: "Public Transit (Nextbus)"
description: "Instructions on how to use public transit data from Nextbus in Home Assistant."
date: 2019-02-20 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: train.png
ha_category: Transport
ha_iot_class: "Local Polling"
ha_release: 0.17
---

The `nextbus` sensor will give you the next departure time and associated data from your public transit station/stop. The data comes from [NextBus](https://www.nextbus.com), which provides real time transit data for a number of transit authorities.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nextbus
    agency: sf-muni
    route: F
    stop: 35184
    name: 'My stop'
```

{% configuration %}
agency:
  description: The agency tag from NextBus.
  required: true
  type: string
route:
  description: The route tag from NextBus.
  required: true
  type: string
stop:
  description: The stop tag from NextBus.
  required: true
  type: integer
name:
  description: Name to use in the frontend.
  required: false
  default: <Agency> - <Route>
  type: string
{% endconfiguration %}
