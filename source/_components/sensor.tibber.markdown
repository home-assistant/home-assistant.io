---
layout: page
title: "Tibber"
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

To add Tibber to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tibber
    access_token: d1007ead2dc84a2b82f0de19451c5fb22112f7ae11d19bf2bedb224a003ff74a
```

{% configuration %}
  access_token:
    description: Go to [developer.tibber.com/](https://developer.tibber.com/) to get your API token.
    required: true
    type: string
{% endconfiguration %}

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
