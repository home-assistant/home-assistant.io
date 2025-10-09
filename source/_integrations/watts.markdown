---
title: Watts Vision +
description: Instructions on how to set up Watts Vision + smart heating system in Home Assistant.
ha_category:
  - Climate
ha_release: '2025.3'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@theobld-ww'
  - '@ssi-spyro'
  - '@devender-verma-ww'
ha_domain: watts
ha_config_flow: true
ha_platforms:
  - climate
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

[Watts Vision +](https://www.watts.eu/en/products/eu/smart-home-and-controls/vision-wireless) is a smart heating management system for remote control of home heating zones. The system provides individual room temperature control, programmable schedules, and energy consumption monitoring through connected thermostats and actuators.

This integration uses the official Watts Vision + API to provide control over your heating zones. You can adjust temperatures, switch between heating modes, and monitor the current status of each thermostat and switch device in your home.

## Prerequisites

Before setting up the integration, make sure you have:

1. A Watts Vision + account created via the Vision + mobile app.
2. At least one Watts Vision + gateway connected to the internet and linked to your account.
3. At least one sub-device paired with your gateway.

{% note %}
The integration uses OAuth2 authentication. You will be redirected to the Watts Vision + login page to authenticate with your account credentials. Make sure you have set up a Watts Vision + account through their mobile app before configuring this integration.
{% endnote %}

{% include integrations/config_flow.md %}

## Supported devices

The integration supports the following Watts Vision + devices:

### Gateway

- BT-CT03-RF
- BT-ST03-RF

### Sub-devices

- BT-DP02-RF
- BT-D03-RF
- BT-A02-RF
- BT-A03-RF
- BT-TH02-RF
- PR03-RF
- BT-WR03

## Platforms

The integration provides the following Home Assistant platforms:

### Climate entities

The integration creates a climate entity for each thermostat device in your Watts Vision + system. Each climate entity provides:

- **Current temperature**: Current ambient room temperature
- **Target temperature**: Set the desired temperature for the room
- **HVAC modes**:
  - **Heat**: Manual comfort or eco mode
  - **Off**: Turn off heating for the zone
  - **Auto**: Follow programmed schedule
- **Temperature range**: The min/max temperature limits configured for the device

#### Climate entity attributes

Each climate entity exposes additional attributes:

- **thermostat_mode**: Current operating mode of the thermostat
- **device_type**: Type of thermostat device
- **room_name**: Name of the room as configured in the Watts Vision + app
- **temperature_unit**: Temperature unit (°C or °F)
- **available_thermostat_modes**: List of supported modes for the device

### Switch entities

The integration creates a switch entity for each switch device in your Watts Vision + system. Each switch entity provides:

- **On/Off control**: Turn switch devices on or off
- **Current state**: Shows whether the switch is currently on or off

#### Switch entity attributes

Each switch entity exposes additional attributes:

- **device_type**: Type of switch device
- **room_name**: Name of the room as configured in the Watts Vision + app

### Shared functionality

All Watts Vision + devices share common functionality:

- **Device information**: Manufacturer (Watts), model information, and device identification
- **Availability**: Entities show as unavailable when devices are offline or communication fails

## Data updates

The Watts Vision + integration polls data from the cloud API every 30 seconds. After sending commands (temperature changes, mode changes, or switch operations), the integration waits 7 seconds before refreshing to allow the device to process the change.

## Use cases

This integration can be used to:

- Create heating schedules through Home Assistant automations
- Integrate heating control with presence detection
- Optimize energy consumption based on electricity rates
- Create temperature-based scenes for different times of day
- Monitor and log heating patterns for analysis
- Coordinate heating zones with other smart home devices

## Example automations

{% details "Lower temperature when nobody is home" %}

{% raw %}

```yaml
alias: "Eco mode when away"
description: "Set all thermostats to eco mode when house is empty"
triggers:
  - platform: state
    entity_id: group.family
    from: "home"
    to: "not_home"
    for:
      minutes: 10
actions:
  - action: climate.set_hvac_mode
    target:
      entity_id: 
        - climate.living_room
        - climate.bedroom
        - climate.office
    data:
      hvac_mode: "heat"
  - action: climate.set_temperature
    target:
      entity_id: 
        - climate.living_room
        - climate.bedroom
        - climate.office
    data:
      temperature: 18
```

{% endraw %}

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.
{% include integrations/remove_device_service.md %}
