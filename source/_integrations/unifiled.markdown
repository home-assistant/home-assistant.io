---
title: UniFi LED
description: Instructions on how to configure the UniFi LED integration with UniFi LED Controller by Ubiquiti.
ha_category:
  - Light
ha_release: 0.102
ha_iot_class: Local Polling
ha_codeowners:
  - '@florisvdk'
ha_domain: unifiled
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[UniFi LED](https://unifi-led.ui.com/) by [Ubiquiti Networks, inc.](https://www.ui.com/) is a system of controller managed LED light panels and dimmers.

There is currently support for the following device type within Home Assistant:

- [Light](#light)

## Configuration

To use the {% term integration %} in your installation, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: unifiled
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
host:
  description: IP address or hostname used to connect to the UniFi LED controller.
  type: string
  required: true
  default: None
port:
  description: Port used to connect to the UniFi LED controller.
  type: string
  required: false
  default: 20443
username:
  description: Username used to log into the UniFi LED controller.
  type: string
  required: true
  default: None
password:
  description: Password used to log into the UniFi LED controller.
  type: string
  required: true
  default: None
{% endconfiguration %}

## Light

The light panels output state and brightness are synchronized with Home Assistant.
