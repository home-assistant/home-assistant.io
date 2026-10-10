---
title: EvolvIOT
description: Instructions on how to set up EvolvIOT devices in Home Assistant.
ha_category:
  - Switch
ha_config_flow: true
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@system-buru'
ha_domain: evolviot
ha_platforms:
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **EvolvIOT** {% term integration %} allows you to connect your EvolvIOT account to Home Assistant and control supported EvolvIOT devices.

{% include integrations/config_flow.md %}

## Supported functionality

The integration exposes supported EvolvIOT switch controls as Home Assistant switch entities.

Switch entities can be turned on or off from Home Assistant.

## Local control

When local control is available for a device, Home Assistant can send commands directly to the device on the local network.
If local control is unavailable, the integration uses cloud control.
