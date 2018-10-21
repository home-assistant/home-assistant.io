---
layout: page
title: "Tibber Sensor"
description: "Instructions on how to integrate Tibber within Home Assistant."
date: 2017-10-03 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tibber.png
ha_category: Energy
ha_release: 0.55
ha_qa_scale: silver
ha_iot_class: "Cloud Polling"
---

The `tibber` sensor provides the current electricity price if you are a [Tibber](https://tibber.com/) customer.
If you have a Tibber Pulse it will also show the electricity consumption in real time.

The requirement is that you have setup the [`tibber` component](/components/tibber/).

## {% linkable_title Examples %}

In this section, you will find some real-life examples of how to use this sensor.

### {% linkable_title Electricity price %}

The electricity price can be used to make automations. The sensor has a `max_price` and `min_price` attribute, with max and min price for the current day. Here is an example to get a notification when the price is above 90% of the maximum price for the day:

{% raw %}
```yaml
- alias: "Electricity price"
  trigger:
    platform: time
  # Matches every hour at 1 minutes past whole
    minutes: 1
    seconds: 00
  condition:
    condition: template
    value_template: '{{ float(states.sensor.electricity_price_hamretunet_10.state) > 0.9 * float(states.sensor.electricity_price_hamretunet_10.attributes.max_price) }}'
  action:
   - service: notify.pushbullet
     data:
       title: "Electricity price"
       target: "device/daniel_telefon_cat"
       message: "The electricity price is now {{ states.sensor.electricity_price_hamretunet_10.state }}"
```
{% endraw %}
