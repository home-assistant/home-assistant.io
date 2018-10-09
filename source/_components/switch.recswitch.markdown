---
layout: page
title: "Ankuoo Rec Switch"
logo: ankuoo_recswitch.png
description: "Instructions on how to integrate Ankuoo Rec Switch into Home Assistant."
date: 2018-10-05 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: "ankuoo_recswitch.png"
ha_release: "0.81"
ha_category: Switch
ha_iot_class: "Local Polling"
---

The `recswitch` switch platform allows you to control the Ankuoo Rec Switch devices.

Supported devices (tested):
- Ankuoo RecSwitch MS6126
- Lumitek CSW201 NEO WiFi

### {% linkable_title Configuration %}

To enable this switch, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: recswitch
    host: 'IP_ADDRESS'
    mac: 'MAC_ADDRESS'
```

{% configuration %}
host:
  description: IP address or hostname of the device.
  required: true
  type: string
mac:
  description: MAC address of the device.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
{% endconfiguration %}
