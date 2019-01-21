---
layout: page
title: "Owlet Sensor"
description: "Instructions on how to integrate Owlet baby monitor into Home Assistant."
date: 2019-01-19
sidebar: true
comments: false
sharing: true
footer: true
logo: owlet.svg
ha_category: Health
featured: true
ha_release: "0.87"
ha_iot_class: "Cloud Polling"
---

Enables heart rate, oxygen level, sock battery level, and sock connection status
of Owlet baby monitor sock.

<p class='warning'>
The intended purpose of this component is to enable data logging and automations
such as battery status updates and charging reminders.  This component should not
replace the Owlet app nor should it be used for life-critical notifications.
</p>

<p class='note'>
  You must have the [Owlet component](/components/owlet/) configured to use this sensor.
</p>

## {% linkable_title Configuration %}

To enable the sensor, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: owlet
```
