---
title: iNELS
description: Instructions on how to integrate iNELS with Home Assistant.
ha_category:
  - Switch
ha_release: '2024.9.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@epdevlab'
ha_domain: inels
ha_platforms:
  - switch
ha_integration_type: integration
---

The **iNELS** {% term integration %} allows you to control and monitor the devices connected to your control units ([BUS](https://www.elkoep.com/wired) or [eLAN](https://www.elkoep.com/wireless)).

There is currently support for the following device types within Home Assistant:
- Switch

## Prerequisites
- MQTT broker.
- eLAN devices flashed with version `mqtt_1.0`, or later.
- BUS devices flashed with version `mqtt_1.0`, or later.
- See the [WiKi page](https://wiki.inels.com/) for instructions on how to configure the control units.

{% include integrations/config_flow.md %}