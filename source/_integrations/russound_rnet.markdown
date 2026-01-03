---
title: Russound RNET
description: Instructions on how to integrate Russound RNET devices into Home Assistant.
ha_category:
  - Media player
ha_release: 0.25
ha_iot_class: Local Polling
ha_domain: russound_rnet
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_codeowners:
  - '@noahhusby'
---

The `russound_rnet` {% term integration %} allows you to control Russound devices that make use of the RNET protocol.

This has initially been tested against a Russound CAV6.6 unit with six zones and six sources. It will also work with a Russound CAA66, but be sure to use a null-modem cable. If you have mutiple controllers connected via the RNET link ports, every increment of 6 zones maps to the corresponding controller ID.

Connecting to the Russound device is only possible by TCP, you can make use of a TCP to Serial gateway such as [tcp_serial_redirect](https://github.com/pyserial/pyserial/blob/master/examples/tcp_serial_redirect.py)

## Supported devices

This integration allows you to connect the following controllers:

- Russound ACA-E5
- Russound CAS44
- Russound CAA66
- Russound CAM6.6
- Russound CAV6.6

To add an {% term integration %} to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: russound_rnet
    host: 192.168.1.10
    port: 1337
    name: Russound
    zones:
      1:
        name: Main Bedroom
      2:
        name: Living Room
      3:
        name: Kitchen
      4:
        name: Bathroom
      5:
        name: Dining Room
      6:
        name: Guest Bedroom
      # controller 2 - zone 1 (connected via RNET link ports)
      7:
        name: Basement Recroom
    sources:
      - name: Sonos
      - name: Sky+
```

{% configuration %}
host:
  description: The IP of the TCP gateway.
  required: true
  type: string
port:
  description: The port of the TCP gateway.
  required: true
  type: integer
name:
  description: The name of the device.
  required: true
  type: string
zones:
  description: This is the list of zones available.
  required: true
  type: integer
sources:
  description: The list of sources available, these must be in order as they are connected to the device.
  required: true
  type: list
{% endconfiguration %}
