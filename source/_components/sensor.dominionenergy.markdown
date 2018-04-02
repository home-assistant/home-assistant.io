---
layout: page
title: Dominion Energy Sensor
description: "Instructions on how to set up Dominion Energy within Home Assistant."
date: 2018-03-21 08:00
sidebar: false
comments: false
sharing: true
footer: true
logo: dominionenergy.jpg
ha_category: Sensor
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---

The `dominionenergy` sensor component allows you to monitor the cost of Washington Dominion Energy.

## Example for `configuration.yaml` :

```yaml
sensor:
  - platform: dominionenergy
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    name: OPTIONAL_NAME
```

{% configuration %}
name:
  description: Name of the device in Home Assistant.
  required: false
  default: Dominion Energy
  type: string
username:
  description: Username used to sign into the Dominion Energy web client.
  required: true
  type: string
password:
  description: Password used to sign into the Dominion Energy web client.
  required: true
  type: string
{% endconfiguration %}

If you don't have a username, you can register at [Dominion Energy](http://dominionenergy.com) using your account number.
