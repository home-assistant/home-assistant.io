---
title: MyNeomitis
description: Connect the MyNeomitis devices (radiators, towel rails, relays, underfloor heating) to Home Assistant using the cloud API.
ha_category:
  - Climate
  - Select
  - Sensor
ha_release: 2026.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@leo.periou"
ha_domain: myneomitis
ha_platforms:
  - select
ha_integration_type: hub
---

# MyNeomitis for Home Assistant

## Use cases

- Control temperature and change operating modes.
- Let’s you view and edit weekly schedules from the Home Assistant Interface.
- Allows you to monitor the energy consumption of compatible products.

## Supported devices

- Eftair towel rails with blower
- Ebath towel rails
- Estyle radiant panel heater
- Efluid radiator
- Myneo Fluid radiator
- Myneo stat thermostat
- Myneo Link smart Wi-Fi switch

 {% include integrations/config_flow.md %}

## Supported functionality

The **MyNeomitis** integration provides the following entities:

### Selects

- **Pilot wire mode** (`pilote`)
  - **Description**: Controls the operating mode of heating devices via the pilot wire.
  - **Options**: `Comfort`, `Comfort +`, `Eco`, `Eco -1`, `Eco -2`, `Frost protection`, `Boost`, `Setpoint`, `Standby`, `Auto`
  - **Available for devices**: EWS devices without a relay mode

- **Switch mode** (`relais`)
  - **Description**: Controls the operating mode of smart switch/relay devices.
  - **Options**: `On`, `Off`, `Auto`
  - **Available for devices**: EWS devices with a relay mode

- **Underfloor heating mode** (`ufh`)
  - **Description**: Controls whether underfloor heating operates in heating or cooling mode.
  - **Options**: `Heating`, `Cooling`
  - **Available for devices**: UFH devices


## Data updates

The **MyNeomitis** integration receives real-time updates from the Axenco cloud API. Device state changes are pushed to Home Assistant immediately without {% term polling %}.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
