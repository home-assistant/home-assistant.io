---
title: Wallbox
description: Instructions on how to integrate sensors Wallbox EV chargers to Home Assistant
ha_category:
  - Car
ha_release: 2021.6
ha_iot_class: Cloud Polling
ha_domain: wallbox
ha_platforms:
  - lock
  - number
  - select
  - sensor
  - switch
ha_config_flow: true
ha_codeowners:
  - '@hesselonline'
ha_integration_type: integration
---

The **Wallbox** {% term integration %} pulls data from the [MyWallbox Portal](https://my.wallbox.com) for your Wallbox charging station. 
Use this integration to monitor the charging of your car by the **Wallbox** charger and modify settings such as **Charging Power**, **Energy Price**, **Solar Charging** and **Pause/Resume**. The energy usage collected by this integration can be used in the [Energy dashboard](/home-energy-management).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Station Serial Number:
  description: "The Serial number of your charger. You can find it in the Wallbox App or on the Wallbox Portal."
Username:
  description: "This integration only supports a regular / email login, Apple or Google accounts are not supported."
{% endconfiguration_basic %}

## Sensors

The {% term integration %} adds the following sensors:

- Added energy (kWh)
- Added green energy (kWh)
- Added grid energy (kWh)
- Added range (km)
- Charging power (kW)
- Charging speed
- Charging time
- Cost ([default currency])
- Current mode
- Depot price ([default currency]/kWh)
- Energy price ([default currency]/kWh)
- Max available power (A)
- State of charge (%)
- Status description
- Max charging current (A)
- Max ICP current (A)

## Number

The {% term integration %} adds the following number entities:

- Max charging current (A)
- Max ICP current; this is the maximum current available for load balancing (A)
- Energy price ([default currency]/kWh)

The number {% term entity %} is only loaded if the supplied username has sufficient rights to change the Max. Charging Current.

## Lock

The {% term integration %} adds a lock {% term entity %}, allowing you to lock the charger. Please note, this only works with a user with admin rights.

## Select

The {% term integration %} adds a select {% term entity %} to control solar charging options, allowing you to choose between **Eco mode**, **Full solar**, or **Disable solar charging**.

## Switch

The {% term integration %} adds a switch {% term entity %}, allowing you to pause/resume the charging process.

## Data updates

Data is refreshed once every minute. Note that this update interval has been chosen in conjunction with Wallbox to prevent overloading their infrastructure. Altering this refresh rate is not recommended.

## Troubleshooting


### Setup errors

- You can only use a regular login with this integration. 
- Google or Apple logins are not supported. 
- You can find the serial number of your charger in the Wallbox app or on the Wallbox Portal under the Chargers section.

### Connection failures

Users often report issues with the Wi-Fi reception of their charger; use a wired connection if possible. Also verify that the charger is communicating with the Wallbox Portal.


### Insufficient Rights

This integrations needs admin credentials to function properly. Please assign the user appropriate permissions in the Wallbox portal.


### Other issues

Always first check whether the data is being received by the Wallbox Portal as this integration uses the same API. Many problems are related to the connectivity of the charger.

## Removing the integration

{% include integrations/remove_device_service.md %}
