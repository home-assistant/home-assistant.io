---
layout: page
title: "EtherRain Sensor"
description: "Monitor the state of your EtherRain"
date: 2017-08-09 06:16
sidebar: true
comments: false
sharing: true
footer: true
logo: etherrain.jpg
ha_category: Sensor
ha_release: 0.31
ha_iot_class: "Local Polling"
---


The `etherrain` sensor platform lets you monitor the current state of your [EtherRain](http://www.quicksmart.com/qs_etherrain.html) controller.  In the event that some other software is sending irrigation commands to your controller, this sensor will allow you to monitor when things are being watered.

<p class='note'>
You must have the [EtherRain component](/components/etherrain/) configured to use this sensor.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: etherrain
    valve_id: 1
    name: "Side Beds"
```

Configuration variables:

- **valve_id** (*Required*): The valve number [1-8]
- **name** (*Required*): The name of this valve.
