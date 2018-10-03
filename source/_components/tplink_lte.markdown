---
layout: page
title: "TP-Link LTE"
description: "Instructions on how to integrate your TP-Link LTE routers within Home Assistant."
date: 2018-08-03 21:30
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_release: "0.80"
ha_category: Network
ha_iot_class: "Local Polling"
---

The TP-Link LTE integration for Home Assistant allows you to observe and control TP-Link LTE routers, currently only tested with TL-MR6400 (firmware 1.4.0).

The integration provides a notification service that will send an SMS.

## {% linkable_title Configuration %}

To enable the component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tplink_lte:
  - host: IP_ADDRESS
    password: SECRET
```

{% configuration %}
host:
    description: The IP address of the router web interface.
    required: true
    type: string
password:
    description: The password used for the router web interface.
    required: true
    type: string
{% endconfiguration %}
