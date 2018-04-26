---
layout: page
title: "RainMachine"
description: "Instructions on how to integrate RainMachine units within Home Assistant."
date: 2018-04-25 20:32
sidebar: true
comments: false
sharing: true
footer: true
logo: rainmachine.png
ha_category: Hub
ha_release: 0.68
ha_iot_class: "Cloud Polling"
---

The `rainmachine` component is the main component to integrate all platforms
related to [RainMachine smart Wi-Fi sprinkler controllers](http://www.rainmachine.com/).

## {% linkable_title Configuration %}

To connect to your RainMachine device, add the following to your
`configuration.yaml` file:

```yaml
rainmachine:
  ip_address: 192.168.1.100
  password: YOUR_PASSWORD
```

{% configuration %}
ip_address:
  description: the IP address or hostname of your RainMachine unit
  required: optional
  type: string
password:
  description: your RainMachine password.
  required: true
  type: string
port:
  description: the TCP port used by your unit for the REST API
  required: false
  type: int
  default: 8080
ssl:
  description: whether communication with the local device should occur over HTTPS
  required: false
  type: boolean
  default: true
{% endconfiguration %}
