---
layout: page
title: "Linky Sensor"
description: "Instructions on how to integrate Linky daily data within Home Assistant."
date: 2018-09-06 08:35
sidebar: true
comments: false
sharing: true
footer: true
logo: enedis.png
ha_release: 0.79
ha_category: Energy
ha_iot_class: "Cloud Polling"
---


The `linky` sensor platform is showing the last day consumption of your home from the [Linky electric meter](https://www.enedis.fr/english).

## {% linkable_title Configuration %}

To add the Linky sensor to your installation, add your Enedis account credentials to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: linky
    username: YOUR_LINKY_USERNAME
    password: YOUR_LINKY_PASSWORD
```

{% configuration %}
username:
  description: The Enedis account username.
  required: true
  type: string
password:
  description: The Enedis account password.
  required: true
  type: string
{% endconfiguration %}

