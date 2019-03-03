---
layout: page
title: "Genius Hub"
description: "Instructions on how to integrate Genius Hub with Home Assistant."
date: 2019-03-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: geniushub.png
ha_category:
  - Climate
  - Sensor
  - Switch
ha_release: 0.89
ha_iot_class: "Local Polling"
redirect_from:
  - /components/sensor.geniushub/
  - /components/switch.geniushub/
---

The `geniushub` component links Home Assistant with your Genius for controlling climate, sensors and switches on your local network. It does not call out to the public API..

This component uses the an unofficial API reversed engineered from the Genius web app.

To add your Genius Hub into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lightwave:
  host: 192.168.1.2
  username: genius_hub_username
  password: genius_hub_password
  scan_interval: 20
```
{% configuration %}
host:
  description: The local IP address of your Genius Hub
  required: true
  type: string
username:
  description: Genius Hub username
  required: true
  type: string
password:
  description: Genius Hub password
  required: true
  type: integer
scan_interval:
  description: The interval in second to refresh data from your Genius Hub
  required: false
  type: integer
  default: 20

{% endconfiguration %}

The Genius Hub component provide the control to the follow devices:

**Zone**
Each zone controlled by your Genius hub will report back the mode, set temperature and actual temperature

**Switch**
Each switch controlled by your Genius hub will report back the state of on or off

**TRV**
Each TRV will report back set point and battery level

**Sensor**
Each sensor will report back actual temperate, luminance, motion and battery level
