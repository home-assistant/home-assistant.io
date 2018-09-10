---
layout: page
title: "Blinkstick Light"
description: "Instructions on how to setup Blinkstick lights within Home Assistant."
date: 2015-10-08 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: blinkstick.png
ha_category: DIY
ha_release: 0.7.5
ha_iot_class: "Local Polling"
---


The `blinkstick` platform lets you control your [Blinkstick](https://www.blinkstick.com/) lights from within Home Assistant.

## {% linkable_title Configuration %}

To add blinkstick to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: blinksticklight
    serial: BS000795-1.1
```

{% configuration %}
serial:
  description: The serial number of your stick.
  required: true
  default: 640
  type: string
name:
  description: Name of the stick.
  required: false
  type: string
  default: Blinkstick
{% endconfiguration %}

