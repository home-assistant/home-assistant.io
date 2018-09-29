---
layout: page
title: "Netgear LTE Sensor"
description: "Instructions on how to integrate Netgear LTE sensors into Home Assistant."
date: 2018-06-06 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netgear.png
ha_release: 0.72
ha_category: Network
ha_iot_class: "Local Polling"
---

The `netgear_lte` sensor platform allows you to monitor your Netgear LTE modem.

This requires you to have set up the [Netgear LTE component](/components/netgear_lte/).

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netgear_lte
    sensors:
      - sms
      - usage
```

{% configuration %}
sensors:
  description: Sensor types to create.
  required: true
  type: list
  keys:
    sms:
      description: Number of unread SMS messages in the modem inbox.
    usage:
      description: Amount of data transferred.
host:
  description: The modem to use. Not needed if you only have one.
  required: false
  type: string
{% endconfiguration %}
