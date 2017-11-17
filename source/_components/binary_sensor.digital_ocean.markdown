---
layout: page
title: "Digital Ocean Binary Sensor"
description: "Instructions on how to set up Digital Ocean binary sensors within Home Assistant."
date: 2016-09-24 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: digital_ocean.png
ha_release: "0.30"
ha_iot_class: "Local Polling"
---

The `digital_ocean` binary sensor platform allows you to monitor your Digital Ocean droplets.

To use your Digital Ocean droplets, you first have to set up your [Digital Ocean hub](/components/digital_ocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: digital_ocean
    droplets:
      - 'fedora-512mb-nyc3-01'
      - 'coreos-512mb-nyc3-01'
```

{% configuration %}
droplets:
  description: List of droplets you want to monitor.
  required: true
  type: list
{% endconfiguration %}

