---
title: MyNeomitis
description: Connect the MyNeomitis devices (radiators, towel rails, relays, underfloor heating) to Home Assistant using the cloud API.
ha_category:
  - Select
ha_release: 2026.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@l-pr"
ha_domain: myneomitis
ha_platforms:
  - select
ha_integration_type: hub
---

The **MyNeomitis** {% term integration %} connects your [Axenco](https://www.axenco.com/) MyNeomitis heating and energy management devices to Home Assistant. With this integration, you can control your devices, such as electric radiators, towel rails, and underfloor heating, directly from Home Assistant.

## Prerequisites

- Create a MyNeomitis account via the MYNEOMITIS app.
- Add your devices to the account using the app.

## Supported devices

- Eftair towel rails with blower
- Ebath towel rails
- Estyle radiant panel heater
- Efluid radiator
- Myneo Fluid radiator
- Myneo stat thermostat
- Myneo Link smart Wi-Fi switch

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address associated with your MyNeomitis account.
Password:
  description: The password for your MyNeomitis account.
{% endconfiguration_basic %}

## Use cases

- Control temperature and change operating modes.
- Allows you to view and edit weekly schedules from the Home Assistant Interface.
- Allows you to monitor the energy consumption of compatible products.

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
