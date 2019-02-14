---
layout: page
title: "Enphase Envoy"
description: "Instructions on how to setup Enphase Envoy with Home Assistant."
date: 2018-06-30 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: enphase-logo.svg
ha_category: Energy
ha_release: 0.76
ha_iot_class: "Local Polling"
---

A sensor platform for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy) solar energy gateway. Works with older models that only have production metrics (ie. Envoy-C) and newer models that offer both production and consumption metrics (ie. Envoy-S). 

### {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enphase_envoy
```

```yaml
# Example configuration.yaml entry, limiting the metrics to production only
sensor:
  - platform: enphase_envoy
    ip_address: LOCAL_IP_FOR_ENVOY
    monitored_conditions:
      - production
      - daily_production
      - seven_days_production
      - lifetime_production
```

{% configuration %}
ip_address:
  description: The local IP address of your Envoy. Leave blank to use the default host name 'envoy', but this may not always be reliable. You should be able to just browse to this IP address.
  required: false
  type: string
monitored_conditions:
  description: The list of conditions to monitor. If you have an Envoy that doesn't support consumption metrics (ie. Envoy-C), it's best only configure the production metrics.
  required: false
  type: list
  keys:
    production:
      description: The power in W being produced by the solar panels.
    daily_production:
      description: The energy in Wh produced that day.
    seven_days_production:
      description: The energy in Wh produced the last 7 days.
    lifetime_production:
      description: The energy in Wh produced in the lifetime of the Envoy.
    consumption:
      description: The power in W being consumed in the whole house.
    daily_consumption:
      description: The energy in Wh consumed that day.
    seven_days_consumption:
      description: The energy in Wh consumed the last 7 days.
    lifetime_consumption:
      description: The energy in Wh consumed in the lifetime of the Envoy.
{% endconfiguration %}
