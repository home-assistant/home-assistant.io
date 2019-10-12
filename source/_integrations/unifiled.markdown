---
title: "UniFi LED"
description: "Instructions on how to configure the UniFi LED integration with UniFi LED Controller by Ubiquiti."
logo: ubiquiti.png
ha_category:
  - Light
ha_release: 0.101
ha_iot_class: Local Polling
---

[UniFi LED](https://unifi-led.ui.com/) by [Ubiquiti Networks, inc.](https://www.ubnt.com/) is a system off controler managed led light panels and dimmers.

There is currently support for the following device type within Home Assistant:

- [Light](#light)

## Configuration

This integration uses settings in the configuration file. Underneath here is a example.

```yaml
# Example configuration.yaml entry
light:
  - platform: unifiled
    host: 192.168.1.20
    username: ubnt
    password: ubnt
```

{% configuration %}
host:
  description: Ip address or DNS name used to connect to the Unifi LED controller.
  type: string
  required: true
  default: None
port:
  description: Port used to connect to the Unifi LED controller.
  type: string
  required: false
  default: 20443
username:
  description: Username used to log into the Unifi LED controller.
  type: string
  required: true
  default: None
password:
  description: Password used to log into the Unifi LED controller.
  type: string
  required: true
  default: None
{% endconfiguration %}

## Light

The light panels output state and brightness are synchronised with home assistant.
