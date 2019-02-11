---
layout: page
title: "Dovado Sensor"
description: "How to integrate Dovado sensors within Home Assistant."
date: 2016-11-05 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: dovado.png
ha_release: 0.32
ha_iot_class: "Local Polling"
---

The `dovado` sensor platform let you monitor your [Dovado](http://www.dovado.com/) router.

To add a Dovado sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dovado
    sensors:
      - network
```

{% configuration %}
sensors:
  description: Conditions to display in the frontend. Only accepts the values listed here.
  required: true
  type: list
  keys:
    network:
      description: Creates a sensor for Network State (3G, 4G, etc.).
    signal:
      description: Creates a sensor for the signal strength.
    download:
      description: Creates a sensor for download speed.
    upload:
      description: Creates a sensor for download speed.
    sms:
      description: Creates a sensor for number of unread text messages.
{% endconfiguration %}
