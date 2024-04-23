---
title: BlueMaestro
description: Instructions on how to integrate BlueMaestro devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: bluemaestro
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [BlueMaestro](https://www.sigmawit.com/) devices into Home Assistant.

## Supported devices

- Tempo Disc THD
- Tempo Disc THPD

The **BlueMaestro** {% term integration %}  will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
