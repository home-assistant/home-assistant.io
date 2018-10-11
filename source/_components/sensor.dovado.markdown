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

The `dovado` platform let you monitor your router from [Dovado](http://www.dovado.com/)

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
  description: Your username.
  required: true
  type: string
password:
  description: Your password.
  required: true
  type: string
host:
  description: The IP address of your router, e.g., 192.168.1.1
  required: false
  type: string
  default: Home Assistant's default gateway
port:
  description:  The port number of your router, e.g., 999
  required: false
  type: integer
  default: 6435
sensors:
  description: Conditions to display in the frontend.
  required: true
  type: list
{% endconfiguration %}

Allowed values under *sensors*:
- **network**: Network state (3G, 4G, etc).
- **signal**: The signal strength (%).
- **download**: The download speed.
- **upload**: The upload speed.
- **sms**: Number of unread text messages

If the router provides SMS functionality, a service for sending SMS will also be registered in Home Assistant.
