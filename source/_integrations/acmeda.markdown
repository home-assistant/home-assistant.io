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

The Rollease Acmeda Automate integration allows you to control and monitor covers via your Rolelase Acmeda Automate hub. The integrations communicates directly with hubs on the local network, rather than connecting via the cloud or via RS-485. Devices are represented as a cover for monitoring and control as well as a sensor for monitoring battery condition.

### Hub Versions

Notice there are two versions of the hub referred to as v1 and v2. The v2 hub is the next generation from Rollease Acmeda. It uses the "Automate" branding, and a completely different network protocol. The v1 hub is no longer sold.

The integration for the v1 hub was written by atmurray and uses uses the [aiopulse API](https://pypi.org/project/aiopulse/), also written by atmurray.

The v2 hub integration was written by sillyfrog and uses the [aiopulse2 API](github.com/sillyfrog/aiopulse2) which is the aiopulse API with modifications by sillfrog. Currently the v2 Integration is awaiting review for inclusion in HA, and is designed to be added as a custom HACS repository. Instructions for installing the v2 integration can be found [here](github.com/sillyfrog/Automate-Pulse-v2).

The remainder of this description applies to both hub integrations.

{% include integrations/config_flow.md %}

### Multiple hubs

Multiple hubs work transparently with discovery, so you don't have to do anything special to set them up.

### Caveats

If the IP address for the hub changes, you will need to re-register it with Home Assistant again. To avoid this, you may set up a DHCP reservation on your router for your hub so that it always has the same IP address.

The integration has the following limitations:

- covers with position as well as tilt are not supported.
- the integration doesn't make use of rooms and scenes configured in the hub, use the equivalent functionality in Home Assistant instead.
