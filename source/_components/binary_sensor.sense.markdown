---
layout: page
title: Sense Binary Sensor
description: "Instructions on how to integrate Sense within Home Assistant."
date: 2018-10-22 22:50
sidebar: true
comments: false
sharing: true
footer: true
logo: sense.png
ha_category: Energy
ha_iot_class: "Cloud Polling"
ha_release: 0.80
---

Use devices detected by your [Sense](https://sense.com)  energy monitor as binary sensors

You first have to setup the [Sense component](/components/sense/)

## {% linkable_title Configuration %}

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: sense
  name: Samsung TV
```

{% configuration %}
name:
  description: The name of the device as shown in the Sense app
  required: true
  type: string  
{% endconfiguration %}
