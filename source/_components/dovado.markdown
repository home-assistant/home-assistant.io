---
layout: page
title: "Dovado"
description: "How to integrate Dovado within Home Assistant."
date: 2019-01-26 15:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: dovado.png
ha_release: 0.87
ha_iot_class: "Local Polling"
---

The `dovado` component manages communication with the [Dovado](http://www.dovado.com/) router. Once you've setup this component, you should enable the [sensor](/components/sensor.dovado) and [notify](/components/notity.dovado) platforms to use Dovado.

To add a Dovado component to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
dovado:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
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
{% endconfiguration %}
