---
layout: page
title: "Linky"
description: "Instructions on how to integrate Linky daily data within Home Assistant."
date: 2018-09-06 08:35
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_release: 0.79
ha_category: Energy
ha_iot_class: "Cloud Polling"
---


The `linky` sensor platform is showing the last day consumption of your home from the Linky electric meter.

To add the Linky sensor to your installation, add your Enedis account credentials to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: linky
    username: !secret linky_username
    password: !secret linky_password
```

{% configuration %}
username:
  description: The Enedis account username
  required: true
  type: string
password:
  description: The Enedis account password
  required: true
  type: string
{% endconfiguration %}

