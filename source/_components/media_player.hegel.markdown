---
layout: page
title: "Hegel Integrated Amplifiers"
description: "Instructions on how to integrate Hegel Integrated Amplifiers into Home Assistant."
date: 2019-02-02 17:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: "0.87"
ha_category: Media Player
ha_iot_class: "Local Polling"
---





The `hegel` platform allows you to control a [Hegel Integrated Amplifier](https://www.hegel.com/products) that support IP-Control from Home Assistant.

Supported devices:

- Hegel H190
- Hegel Röst

To add a Hegel Integrated Amplifier to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: hegel
    host: IP_ADDRESS
    port: PORT_NUMBER
    name: NAME
    timeout: POSITIVE INTEGER
```

{% configuration %}
host:
  description: IP address of the device, e.g., 192.168.1.32.
  required: true
  type: string
port:
  description: Port number that the devices allows IP control on.
  required: false
  default: 50001
  type: integer
name:
  description: Name of the device. If not set, "Hegel Integrated Amplifier" is used.
  required: false
  type: string
{% endconfiguration %}

[Hegel]: /components/media_player.hegel/
