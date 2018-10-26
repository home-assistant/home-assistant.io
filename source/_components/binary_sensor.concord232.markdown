---
layout: page
title: "Concord232 Binary Sensor"
description: "Instructions on how to integrate Interlogix/GE Concord4 binary sensors into Home Assistant."
date: 2016-10-11 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: interlogix.png
ha_category: Binary Sensor
ha_release: 0.31
---

The `concord232` platform provides integration with GE, Interlogix (and other brands) alarm panels that support the RS-232 Automation Control Panel interface module (or have it built in). Supported panels include Concord 4.

## {% linkable_title Configuration %}

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: concord232
```

{% configuration %}
host:
  description: The host where the concord232 server process is running.
  required: false
  type: string
  default: localhost
port:
  description: The port where the Alarm panel is listening.
  required: false
  type: integer
  default: 5007
{% endconfiguration %}
