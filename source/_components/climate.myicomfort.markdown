---
layout: page
title: "Lennox iComfort WiFi Thermostat"
description: "Instructions on how to integrate Lennox iComfort WiFi thermostats within Home Assistant."
date: 2019-01-29 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lennox.png
ha_category: Climate
ha_release: 0.87
ha_iot_class: "Cloud Polling"
---

The `myicomfort` climate platform let you control MyiComfort.com connected Lennox iComfort WiFi thermostats from Home Assistant. This component does not support the other Lennox iComfort thermostats (S30, E30, M30, 5500, 7500) as they use a different interface.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: myicomfort
    username: YOUR_MYICOMFORT_USERNAME
    password: YOUR_MYICOMFORT_PASSWORD
```
<p class='note'>
You must have previously created a myicomfort.com account and connected your thermostat to your account.
</p>

{% configuration %}
username:
  description: "The username for your myicomfort.com account."
  required: true
  type: string
password:
  description: "The password for your given username."
  required: true
  type: string
name:
  description: "Specifiy thermostat identifier."
  required: false
  default: "iComfort"
  type: string
system:
  description: "Select which system to connect to from your myicomfort.com account."
  required: false
  default: 0
  type: integer
zone:
  description: "Select the desired zone for the specified system."
  required: false
  default: 0
  type: integer
min_temp:
  description: "Set the lowest allowed set point."
  required: false
  default: 45.0
  type: float
max_temp:
  description: "Set the highest allowed set point."
  required: false
  default: 95.0
  type: float
{% endconfiguration %}