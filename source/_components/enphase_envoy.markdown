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

- **ip** (*Required*): The IP address of your Envoy.
- **name** (*Optional*): Name to use in the frontend.
- **monitored_conditions** (*Optional*): List of conditions to monitor. By default all are monitored.

The following are the available conditions:
- production
- daily_production
- 7_days_production
- lifetime_production
- consumption
- daily_consumption
- 7_days_consumption
- lifetime_consumption

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enphase_envoy
    ip: [Local IP of Envoy]
    name: Power Monitor
    monitored_conditions:
    - production
    - daily_production
    - 7_days_production
    - lifetime_production
    - consumption
    - daily_consumption
    - 7_days_consumption
    - lifetime_consumption
```
