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
ha_release: pre 0.67
ha_iot_class: "Local Push"
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

Configuration variables:

- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **temperature**: Value is in Celcius or in Fahrenheit (accourding to your settings at Tag Manager).
  - **humidity**: Humidity level in %.
  - **moisture**: Water level/soil moisture in % (applicable for Water Tag only).
  - **light**: Brightness in lux (if supported by tag).
