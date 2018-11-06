---
layout: page
title: "V6M Hub"
description: "How to use the no-brand V6M 8 Channel Relay/Sensor Board."
date: 2018-10-06 12:08
sidebar: true
comments: false
sharing: true
footer: true
logo: v6m.jpg
ha_category: Hub
featured: False
ha_release: 0.01
ha_iot_class: "Local Polling"
---

The V6M is a non-branded 8 relay and 8 input ethernet device that can be found at [AliExpress](https://www.aliexpress.com/item/Industrial-Grade-8-network-Relay-controller-module-8-digital-inputs-local-remote-control-WEB-server-PC/32267454717.html) and on [eBay](https://www.ebay.com/i/182839162128?chn=ps).

This component is responsible for communication with the controller, and must be setup before adding switches and binary sensors.

## {% linkable_title Configuration %}

To use the V6M add the following to your `configuration.yaml` file:

``` yaml
# Example configuration.yaml entry
v6m:
  host: IP_ADDRESS
  port: 4001
```

{% configuration %}
host:
  description: The IP address/hostname of the v6m device.
  required: true
  type: string
port:
  description: The port of the V6M device.
  required: true
  type: port
{% endconfiguration %}
