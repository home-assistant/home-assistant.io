---
title: Hive
description: Instructions on how to integrate Hive devices with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Hub
  - Light
  - Sensor
  - Switch
  - Water heater
ha_release: 0.59
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Rendili'
  - '@KJonline'
ha_domain: hive
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
  - water_heater
ha_config_flow: true
ha_integration_type: hub
ha_homekit: true
---

The **Hive** {% term integration %} for Home Assistant allows you to interact with supported devices and services offered by
[hivehome.com](https://www.hivehome.com)

This Hive integration uses the same username and password you use on the [Hive website](https://sso.hivehome.com) to configure it within Home Assistant. 2FA authentication must be enabled to use this integration. Once configured, Home Assistant will detect and add all Hive devices, including support for multi-zone heating.

{% note %}
The credentials used must be for the Hive account owner. Shared accounts or secondary users will not work with this integration.
{% endnote %}

{% include integrations/config_flow.md %}

## Options

Menu: *Configuration* > *Integrations* > *Select your new integration* > *Press the options button*

- **Scan Interval**: Update the scan interval allowing the integration to poll for data more frequently (Cannot be set lower than 30 seconds).
  
{% include integrations/actions.md %}

## Platforms

### Binary sensor

The `hive` binary sensor integration integrates your Hive sensors into Home Assistant.

The platform supports the following Hive devices and sensors:

- Devices
  - Hive Window or Door Sensor
  - Hive Motion Sensor
- Sensors
  - Hive Hub Online Status
  - Hive Hub 360 Glass Break
  - Hive Hub 360 Dog Bark
  - Hive Hub 360 Smoke CO2

### Climate

The `hive` climate platform integrates your Hive thermostat and Hive radiator valves into Home Assistant, enabling control of setting the **mode** and setting the **target temperature**.

A short boost for Hive Heating can be set by using the **Boost** preset, this will turn on the boost feature for 30 minutes at 0.5 degrees higher than the current temperature.

The platform supports the following Hive products:

- Hive Active Heating
- Hive Multi-zone
- Hive Radiator Valve

### Light

The `hive` light platform integrates your Hive lights into Home Assistant, enabling control of various settings, depending on the model light.

The platform supports the following Hive products:

- Hive Active Light Dimmable
- Hive Active Light Cool to Warm White
- Hive Active Light Color Changing

### Sensor

The `hive` sensor integration exposes Hive data as a sensor.

The platform exposes the following sensors:

- Battery level for supported products
- Boost for supported products
- Mode for supported products
- State for supported products
- Current temperature for supported products
- Target temperature for supported products
  
### Switch

The `hive` switch platform integrates your Hive plugs into Home Assistant, enabling control of your devices.

The platform supports the following Hive products:

- Hive Active Plug
- Hive Heat on Demand

### Water heater

The `hive` water heater platform integrates your Hive hot water into Home Assistant, enabling control of setting the **mode**.

The platform supports the following Hive products:

- Hot Water Control

## Removing the integration

{% include integrations/remove_device_service.md %}

{% note %}
Removing the integration will also deregister this Home Assistant instance from your Hive account. If you set up the integration again, you will need to register a new device during the configuration process.
{% endnote %}
