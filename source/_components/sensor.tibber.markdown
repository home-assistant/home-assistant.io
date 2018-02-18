---
layout: page
title: "Tibber"
description: "Instructions how to integrate Tibber within Home Assistant."
date: 2017-10-03 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tibber.png
ha_category: Sensor
ha_release: 0.55
ha_iot_class: "Cloud Polling"
---


The `tibber` sensor provides the current electricity price if you are a [Tibber](https://tibber.com/) customer.

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
