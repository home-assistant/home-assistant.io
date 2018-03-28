---
layout: page
title: "WirelessTag Switch"
description: "Instructions on how to integrate your Wireless Tags sensors within Home Assistant."
date: 2018-03-26 21:52
comments: false
sidebar: true
sharing: true
footer: true
logo: wirelesstag.png
ha_category: Switch
ha_iot_class: "Local Push"
---

To get your [wirelesstag.net](http://wirelesstag.net) switches working within Home Assistant, please follow the instructions for the general [WirelessTag component](/components/wirelesstag).

To enable tags set up with your [wirelesstag.net](http://wirelesstag.net) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: wirelesstag
    monitored_conditions:
      - motion
      - humidity
```

{% configuration %}
  monitored_conditions:
    description: The metrics types to control; valid values are specified below
    required: true
    type: list
{% endconfiguration %}

The following metrics can be controlled:

* (`temperature`): Control arm/disarm temperature monitoring.
* (`humidity`): Control arm/disarm humidity monitoring.
* (`motion`): Control arm/disarm motion and door open/close events monitoring.
* (`light`): Control monitoring of light changes.
* (`moisture`): Control monitoring of water level/soil moisture for water sensor.

Arm/Disam of motion switch is required to receive motion and door binary sensors events.
Others are needed only if you want to receive push notifications from tags on specific range of changes for temperature, humidity, light or moisture.
