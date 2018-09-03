---
layout: page
title: "Uptime Robot"
description: "Instructions on how to set up Uptime Robot within Home Assistant."
date: 2018-05-29 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: uptimerobot.png
ha_category: System Monitor
ha_release: "0.72"
ha_iot_class: "Cloud Polling"
---

The `uptimerobot` binary sensor platform allows you get the status for all of your monitors from your account on [Uptime Robot.]( https://uptimerobot.com).

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: uptimerobot
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your Uptime Robot API key.
  required: true
  type: string
{% endconfiguration %}

All the data will be fetch from [Uptime Robot](https://uptimerobot.com).

To get your API key, go to [My Settings](https://uptimerobot.com/dashboard#mySettings) on the Uptime Robot website, at the bottom you will find your "Main API Key".
