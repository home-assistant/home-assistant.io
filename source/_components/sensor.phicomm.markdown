---
layout: page
title: "Phicomm M1 air sensor"
description: "Instructions on how to integrate Phicomm M1 air sensor within Home Assistant."
date: 2018-04-19 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: phicomm.png
ha_category: Sensor
ha_release: 0.68
ha_iot_class: "Cloud Polling"
---


The `phicomm` sensor platform let you monitor data from an Phicomm M1 air sensor.

To configure the `phicomm` component add to you `configuration.yaml` file:

```yaml
{% raw %}
sensors:
  - platform: phicomm
    username: ********
    password: ********
{% endraw %}
```

{% configuration %}
name:
  description: Sensor name
  required: false
  default: "Phicomm"
  type: string
username:
  description: Phicomm account username
  required: true
  type: string
password:
  description: Phicomm account password
  required: true
  type: string
name:
  description: Sensor name
  required: false
  default: ["pm25", "hcho", "temperature", "humidity"]
  type: string
{% endconfiguration %}
