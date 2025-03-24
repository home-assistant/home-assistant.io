---
title: AirGradient
description: Instructions on how to setup AirGradient devices in Home Assistant.
ha_category:
  - Health
  - Sensor
  - Update
ha_config_flow: true
ha_release: 2024.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@airgradienthq'
  - '@joostlek'
ha_domain: airgradient
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_zeroconf: true
---

The AirGradient integration will fetch data from your [AirGradient devices](https://www.airgradient.com/).
AirGradient creates indoor and outdoor air quality monitors that enable you know if the air quality is healthy or not. They measure metrics such as PM2.5, CO2, TVOCs, and NOx. Both the software and hardware are open-source, allowing you to customize or extend the device functionality. 

{% important %}
In order for the device to be set up or discovered by Home Assistant, the [firmware](https://www.airgradient.com/documentation/firmwares) version should be at least 3.1.1.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname for your AirGradient device."
{% endconfiguration_basic %}

## Available sensors

The integration will fetch data from each device. The following sensors are supported:

- Carbon dioxide
- Humidity
- Nitrogen index
- PM0.3 count
- PM1 density
- PM2.5 density
- PM10 density
- Raw nitrogen
- Raw total volatile organic compounds
- Signal strength
- Temperature
- Total volatile organic compounds index

## Available configuration entities

The integration provides a few configuration entities to customize the device experience.
The settings are only available when the configuration source is set to local.
The following entities are supported:

- Display temperature unit
- Display brightness
- LED bar brightness
- Requesting CO2 calibration
- Requesting LED bar test
- Toggling sharing metrics with AirGradient

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}