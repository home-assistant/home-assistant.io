---
layout: page
title: "Ring Binary Sensor"
description: "Instructions on how to integrate your Ring.com devices within Home Assistant."
date: 2017-04-01 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ring.png
ha_category: Binary Sensor
ha_release: 0.42
ha_iot_class: "Cloud Polling"
---

To get your [Ring.com](https://ring.com/) binary sensors working within Home Assistant, please follow the instructions for the general [Ring component](/components/ring).

Once you have enabled the [Ring component](/components/ring), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ring
```

Configuration variables:

- **monitored_conditions** array (*Optional*): Conditions to display in the frontend. The following conditions can be monitored. If not specified, all conditions below will be enabled.
  - **ding**: Return a boolean value when the doorbell button was pressed.
  - **motion**: Return a boolean value when a movement was detected by the Ring doorbell.

Currently it supports doorbell, external chimes and stickup cameras.
