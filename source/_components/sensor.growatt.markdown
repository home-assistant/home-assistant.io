---
layout: page
title: "Growatt sensor"
description: "Instructions on how to integrate a Growatt solar panel plant into Home Assistant."
date: 2019-01-30 15:04
sidebar: true
comments: false
sharing: true
footer: true
logo: growatt.png
ha_category:
  - Energy
  - Sensor
ha_iot_class: "Cloud Polling"
ha_release: "0.92"
---

The Growatt sensor enables you to monitor Growatt solar panel plants that have a WiFi module that send the data to [the Growatt server](https://server.growatt.com). The sensor will pull the total `kWh` and daily `kWh` from the server.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: growatt
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
username:
  description: Username for the Growatt server
  required: false
  type: string
password:
  description: Password for the Growatt server
  required: true
  type: string
{% endconfiguration %}

