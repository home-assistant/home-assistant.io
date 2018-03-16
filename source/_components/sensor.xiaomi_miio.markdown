---
layout: page
title: "Xiaomi Air Quality Monitor"
description: "Instructions how to integrate your Xiaomi Mi Air Quality Monitor within Home Assistant."
date: 2018-02-28 08:35
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Sensor
ha_version: 0.66
ha_iot_class: "Local Polling"
---

The `xiaomi_miio` sensor platform is observing your Xiaomi Mi Air Quality Monitor (PM2.5) and reporting the air quality index.

Currently, the supported features are:

* Air Quality Index (AQI)
* Attributes
  - power
  - charging
  - battery
  - time_stat

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

To add a Xiaomi Mi Air Quality Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
sensor:
# Example configuration.yaml entry
sensor:
  - platform: xiaomi_miio
    name: Xiaomi Air Quality Monitor
    host: 192.168.130.73
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
name:
  description: The name of your miio device.
  required: false
  type: string
  default: Xiaomi Miio Sensor
{% endconfiguration %}
