---
layout: page
title: "Netgear LTE"
description: "Instructions on how to integrate your Netgear LTE modem within Home Assistant."
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

The Netgear LTE integration for Home Assistant allows you to observe and control [Netgear LTE modems](https://www.netgear.com/home/products/mobile-broadband/lte-modems/default.aspx), currently only tested with LB2120.

The integration provides:

* a notify service that will send an SMS
* a sensor with the number of unread SMS messages in the inbox
* a sensor with data usage

## {% linkable_title Configuration %}

To enable the component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
netgear_lte:
  - host: IP_ADDRESS
    password: SECRET
```

{% configuration %}
host:
    description: The IP address of the modem web interface.
    required: true
    type: string
password:
    description: The password used for the modem web interface.
    required: true
    type: string
{% endconfiguration %}
