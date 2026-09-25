---
title: Meross
description: Instructions on how to integrate Meross Bluetooth devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_iot_class: Local Push
ha_codeowners:
  - '@zhoulinyue'
ha_domain: meross
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
ha_release: '2026.10'
ha_quality_scale: bronze
---

Integrates [Meross](https://www.meross.com/) Bluetooth devices into Home Assistant.

{% include integrations/config_flow.md %}

The Meross integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

You can also add a device manually: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Add integration**, choose **Meross**, then select the product model.

## Supported devices

- MS120 temperature and humidity sensor
- MS220 door and window sensor (battery sensor in the initial release)
- MS420 water leak sensor (battery sensor in the initial release)
- MS700 temperature and humidity sensor

## Supported functionality

### Sensors

Available sensors depend on the device model:

- **MS120 / MS700:** Temperature, Humidity, Dew point, Absolute humidity, Vapor pressure deficit (VPD), Battery
- **MS220 / MS420:** Battery

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
