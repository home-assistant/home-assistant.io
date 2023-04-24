---
title: Denon Network Receivers
description: Instructions on how to integrate Denon Network Receivers into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.7.2
ha_domain: denon
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `denon` platform allows you to control a Denon Network Receiver from Home Assistant. It might be that your device is supported by the [Denon AVR] platform.

Supported devices:

- Denon DRA-N5
- Denon RCD-N8 (untested)
- Denon RCD-N9 (partial support)
- Denon AVR receivers with integrated Network support (partial support)

To add a Denon Network Receiver to your installation, add the following to your `configuration.yaml` file:

## Telnet platform

```yaml
# Example configuration.yaml entry
media_player:
  - platform: denon
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: "IP address of the device. Example: 192.168.1.32"
  required: true
  type: string
name:
  description: The name of the device
  required: false
  type: string
{% endconfiguration %}

A few notes for platform: denon

- The receiver handles only one telnet connection and refuses others.
- Be careful with the volume. 100% or even 50% is very loud.
- To be able to wake up the receiver, activate the "remote" setting in the receiver's settings.
- Play and pause are supported, toggling is not possible.
- Seeking cannot be implemented as the UI sends absolute positions. Only seeking via simulated button presses is possible.

[Denon AVR]: /integrations/denonavr/
