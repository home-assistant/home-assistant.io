---
layout: page
title: "Honeywell Thermostat"
description: "Instructions on how to integrate Honeywell thermostats within Home Assistant."
date: 2016-02-07 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Climate
ha_release: pre 0.7
ha_iot_class: "Cloud Polling" 
---


The `honeywell` climate platform let you control Honeywell Connected thermostats from Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: honeywell
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    scan_interval: 600
```
<p class='note'>
Scan interval is expressed in seconds. Omitting or mis-configuring `scan_interval` may result in too-frequent polling and cause you to be rate-limited by Honeywell.
</p>

{% configuration %}
username:
  description: The username of an user with access.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
region:
  description: Region identifier (either 'eu' or 'us').  Use the `somecomfort` client library for `us`, and evohome-client for `eu`.
  required: false
  default: eu
  type: string
scan_interval:
  description: Scan interval is expressed in seconds. Recommended value of 600 seconds. Omitting scan_interval may result in too-frequent polling and cause you to rate-limited by Honeywell.
  required: false
  default: 120
  type: integer
away_temperature:
  description: "(*only for eu region*) Heating setpoint when away mode is on, in deg C."
  required: false
  default: 16.0
  type: float
away_cool_temperature:
  description: "(*only for us region*) Cooling setpoint when away mode is on, in deg C."
  required: false
  default: 30.0
  type: float
away_heat_temperature:
  description: "(*only for us region*) Heating setpoint when away mode is on, in deg C."
  required: false
  default: 16.0
  type: float
{% endconfiguration %}
