---
title: Big Ass Fans
description: Instructions on how to integrate BAF devices into Home Assistant.
ha_category:
  - Climate
  - Fan
  - Sensor
  - Switch
ha_zeroconf: true
ha_release: 2022.6
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@jfroy'
ha_domain: baf
ha_config_flow: true
ha_platforms:
  - climate
  - fan
  - sensor
  - switch
ha_integration_type: integration
---

Integrates [Big Ass Fans](https://www.bigassfans.com/) devices into Home Assistant.

## Supported devices

- Haiku Fans with 3.0 firmware and later (Legacy SenseME firmware not supported)
- i6 Fans

## Platforms

### Climate

For devices that support Auto Comfort, a climate entity allows adjusting the target temperature.

### Sensor

If the device supports it, the integration creates the following sensors, which receive push updates:

- Temperature 
- Humidity
 
Additional diagnostic sensors are available, which generally do not receive push updates that need to be enabled in the UI if desired.

### Switch

The integration represents Whoosh mode as a switch for fans. When Whoosh is enabled, the fan will latch to the current speed and vary the speed from the latch point.

{% include integrations/config_flow.md %}
