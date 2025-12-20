---
title: Actron Air
description: Instructions on how to integrate the Actron Air A/C controller into Home Assistant.
ha_category:
  - Climate
ha_release: 2025.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@kclif9'
  - '@JagadishDhanamjayam'
ha_domain: actron_air
ha_platforms:
  - climate
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: bronze
ha_dhcp: true
---

The **Actron Air** {% term integration %} allows you to control [Actron Air](https://www.actronair.com.au/) Air Conditioning controllers into Home Assistant.

## Prerequisites

You must have an **Actron Air** air conditioner with the Neo or Que controller, an active internet connection, and be registered to an email address.

## Supported devices

This integration supports the Actron Air Neo and Que controllers.

{% include integrations/config_flow.md %}

## Supported functionality

### Climate

The integration will create a climate entity for the main air conditioning system found and for each zone. The main air conditioner unit will be reflected based on the name in the Actron Air app. You can set the temperature, operation mode, and fan speed through this entity.

Each zone will be reflected as a separate climate entity. You can set the temperature and operation mode per zone (if supported by your air conditioner).

### Sensors

The integration adds the following sensors for the main air conditioner unit:

- **Clean filter**: The status of the filter, indicating if it needs cleaning.
- **Defrost mode**: Indicates if the unit is in defrost mode. This entity is disabled by default.
- **Compressor chasing temperature**: The chasing temperature of the compressor. This entity is disabled by default.
- **Compressor live temperature**: The live temperature of the compressor. This entity is disabled by default.
- **Compressor mode**: The current mode of the compressor. This entity is disabled by default.
- **Compressor speed**: The speed of the compressor. This entity is disabled by default.
- **Compressor power**: The power usage of the compressor. This entity is disabled by default.
- **Outdoor temperature**: The outdoor temperature measured by the unit. This entity is disabled by default.

Additionally, if you have installed the optional zone sensors, the following sensors will be available for each zone sensor:

- **Battery**: The battery level of the zone sensor.
- **Humidity**: The humidity measured by the zone sensor.
- **Temperature**: The temperature measured by the zone sensor.

### Switch

The integration will add the **Away mode**, **Continuous fan**, **Quiet mode**, and **Turbo mode** (if supported) switches to your Actron Air air conditioner.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
