---
title: Big Ass Fans
description: Instructions on how to integrate BAF devices into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Fan
  - Light
  - Number
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
  - binary_sensor
  - climate
  - fan
  - light
  - number
  - sensor
  - switch
ha_integration_type: integration
---

Integrates [Big Ass Fans](https://www.bigassfans.com/) devices into Home Assistant.

## Supported devices

- Haiku Fans with 3.0 firmware and later (Legacy SenseME firmware not supported)
- Discontinued Haiku Lights with 3.0 firmware and later (Legacy SenseME firmware not supported)
- i6 Fans

## Platforms

### Binary sensor

For devices that support Auto Comfort and are running firmware 3.1 or later, an occupancy sensor {% term entity %} is available. The sensor has a hold time of about 5 minutes and pushes state updates.

### Climate

For devices that support Auto Comfort, a climate {% term entity %} allows adjusting the target temperature.

### Number

Adjusting the minimum and maximum speed for devices that support Auto Comfort is available.

Timeouts for returning to auto mode or turning back off after motion use a unit of seconds.

### Sensor

If the device supports it, the integration creates the following sensors, which receive push updates:

- Temperature 
- Humidity
 
Additional diagnostic sensors are available, which generally do not receive push updates that need to be enabled in the UI if desired.

### Switch

The integration represents Whoosh mode as a switch for fans. When Whoosh is enabled, the fan will latch to the current speed and vary the speed from the latch point.

{% include integrations/config_flow.md %}
