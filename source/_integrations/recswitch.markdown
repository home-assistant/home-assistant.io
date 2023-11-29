---
title: Ankuoo REC Switch
description: Instructions on how to integrate Ankuoo REC Switch into Home Assistant.
ha_release: 0.81
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_domain: recswitch
ha_platforms:
  - switch
ha_integration_type: integration
---

The `recswitch` switch platform allows you to control the Ankuoo REC Switch devices.

Supported devices (tested):

- Ankuoo RecSwitch MS6126
- Lumitek CSW201 NEO WiFi
- MALMBERGS CSW201

## Configuration

To enable this switch, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: recswitch
    host: "IP_ADDRESS"
    mac: "MAC_ADDRESS"
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
