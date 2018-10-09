---
layout: page
title: "Tesla"
description: "Instructions on how to integrate Tesla car into Home Assistant."
date: 2017-08-28 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tesla.png
ha_category: Car
ha_release: 0.53
ha_iot_class: "Cloud Polling"
---


The `Tesla` component offers integration with the [Tesla](https://auth.tesla.com/login) cloud service and provides presence detection as well as sensors such as charger state and temperature.

This component provides the following platforms:
 - Binary sensors - such as parking and charger connection.
 - Sensors - such as Battery level, Inside/Outside temperature, odometer, and estimated range.
 - Device tracker - to track location of your car
 - Lock - Door lock. Enables you to control Tesla's door lock
 - Climate - HVAC control. Allow you to control (turn on/off, set target temperature) your Tesla's HVAC system.
 - Switch - Charger and max range switch. Allow you to start/stop charging and set max range charging.

To use Tesla in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tesla:
  username: YOUR_E_MAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address associated with your Tesla account.
  required: true
  type: string
password:
  description: The password associated with your Tesla account.
  required: true
  type: string
scan_interval:
  description: API polling interval. Minimal value can't be less then 300.
  required: false
  default: 300
  type: integer
{% endconfiguration %}
