---
layout: page
title: UpCloud Binary Sensor
description: Instructions on how to set up UpCloud binary sensors within Home Assistant.
date: 2018-01-28 20:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: upcloud.png
ha_release: 0.63
ha_iot_class: Cloud Polling
---

The `upcloud` binary sensor platform allows you to monitor your UpCloud servers.

To use your UpCloud servers, you first have to set up your [UpCloud hub](/components/upcloud/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: upcloud
    servers:
      - 002167b7-4cb1-44b7-869f-e0900ddeeae1
      - 00886296-6137-4074-afe3-068e16d89d00
```

{% configuration %}
servers:
  description: List of servers you want to monitor.
  required: true
  type: list
{% endconfiguration %}
