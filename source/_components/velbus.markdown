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

The `velbus` component supports the Velbus USB and Serial gateways.

The gateway needs to be configured by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

velbus:
  port: '/dev/ttyUSB00'
```
