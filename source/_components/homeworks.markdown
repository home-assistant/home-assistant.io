---
layout: page
title: "Homeworks Hub"
description: "How to use Lutron Homeworks Series 4 & 8 with Home Assistant."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Hub
featured: False
ha_release: 0.01
ha_iot_class: "Local Polling"
---

[Lutron](http://www.lutron.com/) is an American lighting control company. The Lutron Homeworks Series 4 & 8 systems are relatively old (~2003), and use RS-232 connections to communicate with home automation systems.  The `homeworks` component in Home Assistant is responsible for communicating with the main controller for these systems.  Communication is through an ethernet to serial convertor (NPort, for example).

Only a subset of the Homeworks system is supported - lights and keypads.

There is another component [lutron](/components/lutron/) which controls the Lutron RadioRA 2 system.

## {% linkable_title Configuration %}

When configured, the `homeworks` component cannot automatically discover any information from the controller.  Unfortunately, the protocol for extracting this information is not documented.  Each device has to be declared in order for it to be controlled.

To use Lutron Homeworks devices in your installation, add the following to your `configuration.yaml` file:

``` yaml
# Example configuration.yaml entry
homeworks:
  host: IP_ADDRESS
  port: 4001
```

{% configuration %}
host:
  description: The IP address of the ethernet to serial adapter.  It is assumed that the adaptor has been preconfigured.
  required: true
  type: string
port:
  description: The port of the ethernet to serial adapter.
  required: true
  type: port
{% endconfiguration %}
