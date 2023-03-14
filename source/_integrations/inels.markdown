---
title: iNELS
description: Instructions on how to integrate iNELS with Home Assistant.
ha_category:
  - Cover
ha_release: '2023.1'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@nejezchleb'
  - '@jhoralek'
  - '@zed4805'
ha_domain: inels
ha_platforms:
  - cover
ha_integration_type: integration
---

The iNELS integration allows you to control and monitor the devices connected to your control units ([BUS](https://www.elkoep.com/wired) or [eLAN](https://www.elkoep.com/wireless)).


iNELS devices are automatically discovered in Home Assistant when the central unit starts communicating with the MQTT broker.

Currently supported RF devices:
- Shutters

Devices will be automatically added when the [eLAN](https://www.elkoep.com/wireless) or [BUS](https://www.elkoep.com/wired) control unit is connected to the configured MQTT broker.

## Prerequisites
- MQTT broker
- iNELS control units are configured to communicate with the MQTT broker with the connection details.
 - eLAN devices flashed with version `mqtt_1.0`, or later.
 - BUS devices flashed with version `mqtt_1.0`, or later.

{% include integrations/config_flow.md %}
