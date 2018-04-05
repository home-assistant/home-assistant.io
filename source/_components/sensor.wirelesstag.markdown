---
layout: page
title: "WirelessTag Sensor"
description: "Instructions on how to integrate your Wireless Tags sensors within Home Assistant."
date: 2018-03-26 21:50
comments: false
sidebar: true
sharing: true
footer: true
logo: wirelesstag.png
ha_category: Sensor
ha_iot_class: "Local Push and Cloud Polling"
ha_release: 0.67
---

To get your [wirelesstag.net](http://wirelesstag.net) sensors working within Home Assistant, please follow the instructions for the general [WirelessTag component](/components/wirelesstag).

To enable tags set up with your [wirelesstag.net](http://wirelesstag.net) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wirelesstag
    monitored_conditions:
      - temperature
      - humidity
```

{% configuration %}
  monitored_conditions:
    description: The metrics types to monitor; valid values are specified below
    required: true
    type: list
{% endconfiguration %}

The following metrics can be monitored:

* (`temperature`): Value is in Celsius or Fahrenheit (according to your settings at Tag Manager).
* (`humidity`): Humidity level in %.
* (`moisture`): Water level/soil moisture in % (applicable for Water Tag only).
* (`light`): Brightness in lux (if supported by tag).
