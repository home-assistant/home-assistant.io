---
layout: page
title: "Velbus"
description: "Access and control your Velbus devices."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category: Hub
ha_iot_class: "Local Push"
ha_release: "0.50"
---

The `velbus` component supports the Velbus USB, Velbus serial and a TCP/IP gateway.

## {% linkable_title Configuration %}

The gateway needs to be configured by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for a USB or serial interface
velbus:
  port: '/dev/ttyUSB00'
```

```yaml
# Example configuration.yaml entry for a TCP/IP interface
velbus:
  port: '127.0.0.1:3678'
```

{% configuration %}
port:
  description: The port where your board is connected to your Home Assistant host.
  required: true
  type: string
{% endconfiguration %}
