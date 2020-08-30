---
title: Automate Pulse 2 Hub by Rollease Acmeda
description: Instructions on setting up  the Automate Pulse Hub v2 by Rollease Acmeda within Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Push
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@sillyfrog'
ha_domain: automate
---

The Automate Pulse 2 Hub by Rollease Acmeda integration allows you to control and monitor covers via your Automate Pulse v2 Hub (see the [acmeda](/integrations/acmeda) integration for the v1 hub). The integration uses an [API](https://pypi.org/project/aiopulse2/) to directly communicate with hubs on the local network, rather than connecting via the cloud.

Devices are represented as a cover for monitoring and control as well as a sensor for monitoring battery level and signal strength.

To set up this integration, click the + icon in the lower right and find the Automate Pulse Hub v2. This will prompt for the IP address of the hub and register the covers with Home Assistant. All devices are automatically discovered on the hub and you will have the opportunity to select the area each device is located.

Once registration is complete, you should see a `cover` and two `sensor` entities for each device. The integration automatically manages the addition/update/removal of any devices connected on the hub at startup, including device names unless manually specified in Home Assistant.

## Caveats

If the IP address for the hub changes, you will need to re-register it with Home Assistant again. To avoid this, you may set up a DHCP reservation on your router for your hub so that it always has the same IP address.

The integration has the following limitations:

- covers with position as well as tilt are not yet supported.
- the integration doesn't make use of rooms and scenes configured in the hub, use the equivalent functionality in Home Assistant instead.
