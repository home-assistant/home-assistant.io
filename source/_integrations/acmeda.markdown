---
title: Rollease Acmeda Automate
description: Instructions on setting up Rollease Acmeda Automate within Home Assistant.
ha_category:
  - Cover
  - Hub
ha_iot_class: Local Push
ha_release: 0.111
ha_config_flow: true
ha_codeowners:
  - '@atmurray'
ha_domain: acmeda
ha_platforms:
  - cover
  - sensor
ha_integration_type: integration
---

The **Rollease Acmeda Automate** {% term integration %} allows you to control and monitor covers via your Rollease Acmeda Automate hub. The integrations communicates directly with hubs on the local network, rather than connecting via the cloud or via RS-485. Devices are represented as a cover for monitoring and control as well as a sensor for monitoring battery condition.

## Supported devices

- Automate Pulse Hub v1

{% include integrations/config_flow.md %}

## Multiple hubs

Multiple hubs work transparently with discovery, so you don't have to do anything special to set them up.

## Caveats

If the IP address for the hub changes, you will need to re-register it with Home Assistant again. To avoid this, you may set up a DHCP reservation on your router for your hub so that it always has the same IP address.

The integration has the following limitations:

- Covers with position as well as tilt are not supported.
- The integration doesn't make use of rooms and scenes configured in the hub, use the equivalent functionality in Home Assistant instead.
