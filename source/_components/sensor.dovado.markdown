---
layout: page
title: "Dovado"
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

The `dovado` platform let you monitor your router from [Dovado](http://www.dovado.com/). If the router provides SMS functionality, a service for sending SMS will also be registered in Home Assistant.

To add a Dovado sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dovado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    sensors:
      - network
```

{% configuration %}
username:
  description: Your Dovado username.
  required: true
  type: string
password:
  description: Your Dovado password.
  required: true
  type: string
host:
  description: The IP address of your router.
  required: false
  type: string
  default: Home Assistant's default gateway
port:
  description:  The port number of your router.
  required: false
  type: integer
  default: 6435
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
