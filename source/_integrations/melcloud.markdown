---
title: MELCloud
description: MELCloud integration
ha_category:
  - Climate
ha_release: 0.106
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: melcloud
ha_platforms:
  - climate
  - diagnostics
  - sensor
  - water_heater
ha_integration_type: integration
ha_codeowners:
  - '@erwindouna'
---

The `melcloud` integration integrates Mitsubishi Electric's [MELCloud](https://www.melcloud.com/) enabled devices into Home Assistant.

## Device support

- Air-to-Air heat pumps, e.g., AC units - **Supported**
- Air-to-Water heat pumps - **Supported**
- Energy recovery ventilators - **Not supported**
- Other - **Not supported**

{% include integrations/config_flow.md %}

## Air-to-Air device

An Air-to-Air heat pump provides `climate` and `sensor` platforms. Device capabilities can limit the available parameters and sensors.

### Climate

The following parameters can be controlled for the `climate` platform entities:

- Power (using HVAC mode)
- Target temperature
- Operation mode (HVAC mode)
- Fan speed
- Horizontal and vertical vane positions

#### State attributes

|Attribute|Description|Example|
|---------|-----------|-------|
|`vane_horizontal` |Current horizontal vane position or mode|`auto`|
|`vane_horizontal_positions` |Available horizontal vane positions and modes|`auto, split, swing`|
|`vane_vertical` |Current vertical vane position or mode|`auto`|
|`vane_vertical_positions` |Available vertical vane positions and modes|`auto, split, swing`|

#### Controlling vanes

The horizontal and vertical vane positions can be controlled using the corresponding `melcloud.set_vane_horizontal` and `melcloud.set_vane_vertical` actions.

Swing mode can also be used to control vertical vane position.

### Sensor

The following attributes are available for `sensor` platform entities:

- Room temperature
- Energy - The total consumed energy in kWh. **Not supported by all models.**
- Daily energy - Energy consumption within a 24h window in kWh. This reading resets at midnight on the timezone of the MELCloud service. The exact time needs to be determined by following the sensor value until a reset is detected.

## Air-to-Water device

An Air-to-Water device provides `water_heater`, `climate` and `sensor` platforms.

### Climate

A `climate` platform entity is provided for each radiator zone in the air-to-water system. The following parameters can be controlled:

- Target room temperature

The radiators need to be configured to run in room temperature control mode either through the local HMI or MELCloud. Flow temperature and curve modes are not supported.

Some air-to-water devices allow cooling using the radiator zones. This feature has not been implemented due to the lack of sample devices.

The system cannot be turned on/off through the `climate` entities.

#### State attributes

|Attribute|Description|Example|
|---------|-----------|-------|
|`status` |Current operation status|`idle`|

### Sensor

The following attributes are available for `sensor` platform entities:

- Room temperature for each zone
- Tank water temperature
- Outside temperature - 1°C precision, polled every 1-2 hours.
- Zone flow temperature, polled every 1-2 hours
- Zone flow return temperature, polled every 1-2 hours

Unlike air-to-air devices, air-to-water devices do not report energy consumption in an easily accessible manner.

### Water heater

The following parameters can be controlled for the `water_heater` platform entities:

- Power - Controls the entire system.
- Target tank temperature
- Operation mode

#### State attributes

|Attribute|Description|Example|
|---------|-----------|-------|
|`status` |Current operation status|`heat`|
