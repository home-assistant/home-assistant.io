---
layout: page
title: "Enphase Envoy"
description: "Instructions on how to setup Enphase Envoy with Home Assistant."
date: 2018-06-30 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: enphase.svg
ha_category: Energy
ha_release: 0.73
ha_iot_class: "Local Polling"
---

A sensor platform for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy) solar energy monitor.

### {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enphase_envoy
    ip: ENVOY_LOCAL_IP_ADDRESS
```

Configuration variables:
{% configuration %}

ip:
  description: The local IP Address of your Envoy
  required: true
  type: string
name:
  description: Name to use in the front end
  required: false
  type: string
monitored_conditions:
  description: The list of conditions to display in the front end
  required: false
  type: list
  keys:
    production:
      description: The power in W being produced by the solar panels
    daily_production:
      description: The energy in Wh produced that day
    7_days_production:
      description: The energy in Wh produced the last 7 days
    lifetime_production:
      description: The energy in Wh produced in the lifetime of the Envoy
    consumption:
      description: The power in W being consumed in the whole house
    daily_consumption:
      description: The energy in Wh consumed that day
    7_days_consumption:
      description: The energy in Wh consumed the last 7 days
    lifetime_consumption:
      description: The energy in Wh consumed in the lifetime of the Envoy

{% endconfiguration %}
