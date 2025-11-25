---
title: Harman Kardon AVR
description: Instructions on how to integrate Harman Kardon AVR Network Receivers into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.85
ha_domain: harman_kardon_avr
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `harman_kardon_avr` platform allows you to control Harman Kardon Network Receivers from Home Assistant.

Supported devices:

- Harman Kardon AVR-151S
- Other Harman Kardon AVR receivers (untested)

To add a Harman Kardon Network Receiver to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: harman_kardon_avr
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: IP address of the device, e.g., 192.168.1.32.
  required: true
  type: string
name:
  description: Name of the device. If not set, Harman Kardon AVR is used.
  required: false
  default: Harman Kardon AVR
  type: string
port:
  description: The port to talk to the receiver. If not set, 10025 is used.
  required: false
  default: 10025
  type: integer
{% endconfiguration %}

A few notes:

- The newest firmware automatically shuts down the AVR after a certain amount of time. The AVR is then not available on the network anymore, so the 'on' command will not work.
- The AVR has no endpoints to determine the volume, muted, playing etc., so if the remote control is used, HA will not know the new states of the device.
