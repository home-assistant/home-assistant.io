---
layout: page
title: "Uptime Sensor"
description: "Instructions on how to integrate an uptime sensor into Home Assistant."
date: 2017-10-13 10:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Utility
ha_iot_class: "Local Pushing"
logo: home-assistant.png
ha_release: 0.56
---


The `uptime` sensor platform displays the time since the last Home Assistant restart.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: uptime
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Uptime
unit_of_measurement:
  description: "Units for uptime measurement in either `days`, `hours`, or `minutes`."
  required: false
  type: string
  default: days
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
# Example with configuration variables
sensor:
  - platform: uptime
    name: Time Online
    unit_of_measurement: hours
````
