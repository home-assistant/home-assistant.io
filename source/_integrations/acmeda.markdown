---
title: Rollease Acmeda Automate
description: Instructions on setting up Rollease Acmeda Automate within Home Assistant.
ha_category:
  - Hub
  - Cover
ha_iot_class: Local Push
ha_release: 0.111
ha_config_flow: true
ha_codeowners:
  - '@atmurray'
ha_domain: acmeda
ha_platforms:
  - cover
  - sensor
---

The Rollease Acmeda Automate integration allows you to control and monitor covers via your Rolelase Acmeda Automate hub. The integration uses an [API](https://pypi.org/project/aiopulse/) to directly communicate with hubs on the local network, rather than connecting via the cloud or via RS-485.

Devices are represented as a cover for monitoring and control as well as a sensor for monitoring battery condition.

{% include integrations/config_flow.md %}

### Multiple hubs

Multiple hubs work transparently with discovery, so you don't have to do anything special to set them up.

### Caveats

If the IP address for the hub changes, you will need to re-register it with Home Assistant again. To avoid this, you may set up a DHCP reservation on your router for your hub so that it always has the same IP address.

The integration has the following limitations:

- covers with position as well as tilt are not supported.
- the integration doesn't make use of rooms and scenes configured in the hub, use the equivalent functionality in Home Assistant instead.
