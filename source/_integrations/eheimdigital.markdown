---
title: EHEIM Digital
description: Instructions on how to set up EHEIM Digital with Home Assistant.
ha_category:
  - Climate
  - Light
  - Number
  - Sensor
  - Switch
  - Time
ha_release: 2025.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: eheimdigital
ha_integration_type: hub
ha_platforms:
  - climate
  - light
  - number
  - sensor
  - switch
  - time
ha_quality_scale: bronze
ha_zeroconf: true
---

The **EHEIM Digital** {% term integration %} allows you to control your [EHEIM Digital](https://eheim.com/en_GB/aquatics/eheim-digital/) smart aquarium devices from Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your EHEIM Digital main device. Defaults to `eheimdigital.local`, an IP address should only be necessary if the hostname doesn't work."
    required: true
    type: string
{% endconfiguration_basic %}

## Supported devices and entities

Currently, the following devices and entities are supported:

### [EHEIM classicLEDcontrol+e](https://eheim.com/en_GB/aquatics/technology/lighting-control/classicledcontrol-e/classicledcontrol-e)

#### Lights

- **Brightness**: Controlling the brightness of both light channels
- **Daycycle mode effect**: Automatically controls the brightness based on the daytime as configured on the device

### [EHEIM thermocontrol+e](https://eheim.com/en_GB/aquatics/eheim-digital/aquarium-heaters/)

#### Climate

- **Target temperature**: Controlling the target temperature of the heater (which corresponds to the day temperature in Bio and Smart mode)
- **Presets / Operation mode**: Switching between Manual, Bio and Smart mode

#### Number

- **Temperature offset**: Setting an offset between the measured temperature and the real temperature
- **Night temperature offset**: Setting the offset for the night temperature in Bio mode

#### Time

- **Day start time**: Setting the start time for the day temperature in Bio mode
- **Night start time**: Setting the start time for the night temperature in Bio mode

### [EHEIM classicVARIO+e](https://eheim.com/en_GB/aquatics/technology/external-filters/classicvario-e-250/classicvario-e-250)

#### Number

- **Manual speed**: Setting the pump speed in Manual mode
- **Day speed**: Setting the pump speed for the day in Bio mode
- **Night speed**: Setting the pump speed for the night in Bio mode

#### Sensor

- **Current pump speed**: Displays the current pump speed
- **Remaining hours until service**: Displays the remaining time until the filter needs to be serviced
- **Error code**: Displays the current error code of the device (No error, Rotor stuck, air in filter)

#### Switch

- **Pump**: Turning on and off the filter pump

#### Time

- **Day start time**: Setting the start time for the day pump speed in Bio mode
- **Night start time**: Setting the start time for the night pump speed in Bio mode

Support for additional EHEIM Digital devices and entities will be added in future updates.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
