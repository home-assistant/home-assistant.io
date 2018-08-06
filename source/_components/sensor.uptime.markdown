---
layout: page
title: "Uptime Sensor"
description: "Instructions on how to integrate an uptime sensor into Home Assistant."
date: 2017-10-13 10:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_iot_class: "Local Pushing"
logo: home-assistant.png
ha_release: 0.56
---


The `uptime` sensor platform displays the time since the last Home Assistant restart.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: uptime
```

Configuration variables:

- **name** (*Optional*): Name of the sensor. Defaults to `Uptime`.
- **unit_of_measurement** (*Optional*): Units for uptime measurement in either `days`, `hours`, or `minutes`.  Defaults to `days`.

```yaml
# Example with configuration variables
sensor:
  - platform: uptime
    name: Time Online
    unit_of_measurement: hours
````
