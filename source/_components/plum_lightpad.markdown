---
layout: page
title: "Plum Lightpad"
description: "Instructions on setting up Plum Lightpads within Home Assistant."
date: 2018-10-15 17:58
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_iot_class: "Local Push"
featured: true
logo: plum.png
ha_release: 0.85
redirect_from:
 - /components/binary_sensor.plum_lightpad/
 - /components/light.plum_lightpad/
 - /components/sensor.plum_lightpad/
---

Configurable/Dimmable WiFi Lightswitch
- Cloud registered, Local API communication (both RESTful and TCP pushed events)
- Motion Sensor
- Energy Meter
- RGB Glow Ring
- Wifi & Bluetooth connectivity
- Phone Apps for iOS & Android

"The most advanced smart dimmer. Ever."  - [https://plumlife.com/](https://plumlife.com/)

> The Lightpad’s elegant design compliments any decor and provides amazing control of your lights. The Lightpad allows you to control a single light, group of lights, or all of your lights in a natural and intuitive way.

> Control your lights, not just with your smartphone and your voice (with Alexa and Google Assistant), but with your fingertips too. While most home automation devices today force you to use your smartphone, Plum Lightpads feature Multi-Touch allowing you to use simple gestures to control any light in the house from any Lightpad.

## {% linkable_title Configuration %}

To enable Plum Lightpad support, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
plum_lightpad:
  username: YOUR_CLOUD_USERNAME
  password: YOUR_CLOUD_PASSWORD
```

{% configuration %}
username:
  required: true
  description: Your Plum Cloud username.
  type: string
password:
  required: true
  description: Your Plum Cloud password.
  type: string
{% endconfiguration %}
