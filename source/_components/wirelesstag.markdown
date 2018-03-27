---
layout: page
title: "WirelessTag"
description: "Instructions on how to integrate your Wireless Tags sensors within Home Assistant."
date: 2018-03-26 21:32
comments: false
sidebar: true
sharing: true
footer: true
ha_category: Hub
ha_release: pre 0.67
ha_iot_class: "Local Push"
---

The `wirelesstag` implementation allows you to integrate your [wirelesstag.net](http://wirelesstag.net) sensors tags in Home Assistant.

To enable tags set up with your [wirelesstag.net](http://wirelesstag.net) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
wirelesstag:
  username: you@example.com
  password: secret
```

Configuration variables:

- **username** (*Required*): Username for your my.wirelesstag.net account.
- **password** (*Required*): Password for your my.wirelesstag.net account.

Finish your configuration by visiting the [WirelessTag binary sensor](/components/binary_sensor.wirelesstag/), [WirelessTag sensor](/components/sensor.wirelesstag/), or [WirelessTag switch](/components/switch.wirelesstag/) documentation.

**Note:**

Current implementation does setup of local push notifications for "update" event for any sensors (temperature, humidity, light, moisture) requested and corresponding binary events for any binary sensors. 

So you would see custom url calls installed for all your tags as:
 - http://"ha local ip address":8123/api/events/update_tags
 and
 - http://"ha local ip address":8123/api/events/binary_event
 
 to provide immidate data update to ha. 
 "update" event works out of the box. Other binary events are enabled by "switch" component which arms correspoding sensor data monitoring.
Water sensor leaks events are enabled by default as well.

Additionally, periodic cloud polling is enabled always and gets tags data in interval you define in tag manager settings.
Temperature is reported in Celcius or in Fahrenheit accourding to your settings in tag manager.
