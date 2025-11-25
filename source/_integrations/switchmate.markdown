---
title: Switchmate SimplySmart Home
description: Instructions on how to set up Switchmate switches.
ha_category:
  - Switch
ha_release: 0.78
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@qiz-li'
ha_domain: switchmate
ha_platforms:
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

This `Switchmate` switch platform allows you to control Switchmate [devices]( https://www.mysimplysmarthome.com/products/switchmate-switches/).

## Configuration

To enable it, add the following lines to your {% term "`configuration.yaml`" %}:

```yaml
switch:
  - platform: switchmate
    mac: "cb:25:0b......"
```

{% configuration %}
mac:
  description: Device MAC address.
  required: true
  type: string
name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string
flip_on_off:
  description: Option to flip the on/off state.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

The integration is tested with SwitchMate Lighting Control Rocker and SwitchMate Lighting Control Toggle.
