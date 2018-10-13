---
layout: page
title: "Ring Sensor"
description: "Instructions on how to integrate your Ring.com devices within Home Assistant."
date: 2017-04-01 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ring.png
ha_category: Doorbell
ha_release: "0.40"
ha_iot_class: "Cloud Polling"
---

To get your [Ring.com](https://ring.com/) binary sensors working within Home Assistant, please follow the instructions for the general [Ring component](/components/ring).

## {% linkable_title Configuration %}

Once you have enabled the [Ring component](/components/ring), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ring
```

{% configuration %}
monitored_conditions:
  type: list
  required: false
  description: Conditions to display in the frontend. The following conditions can be monitored. If not specified, all conditions below will be enabled.
  battery:
     description: Return the battery level from device.
  last_activity:
     description: Return the timestamp from the last event captured (ding/motion/on demand) by the Ring doorbell camera.
  last_ding:
     description: Return the timestamp from the last time the Ring doorbell button was pressed.
  last_motion:
     description: Return the timestamp from the last motion event captured by the Ring doorbell camera.
  volume:
     description: Return the volume level from the device.
  wifi_signal_category:
     description: Return the WiFi signal level from the device.
  wifi_signal_strength:
     description: Return the WiFi signal strength (dBm) from the device.
{% endconfiguration %}

Currently it supports doorbell, external chimes and stickup cameras.
