---
title: Fronius
description: Instructions on how to connect your Fronius SolarAPI devices to Home Assistant.
ha_release: 0.96
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@nielstron'
  - '@farmio'
ha_config_flow: true
ha_domain: fronius
ha_iot_class: Local Polling
ha_platforms:
  - sensor
ha_quality_scale: platinum
ha_dhcp: true
ha_integration_type: integration
---

The Fronius integration polls a [Fronius](https://www.fronius.com/) solar inverter or datalogger for details of a Fronius SolarNet setup and integrate it in your Home Assistant installation.

## Prerequisites

You should either set a static IP or assign a static DHCP lease for the Fronius device, or alternatively access it through the local DNS name if your network is configured accordingly.
For Gen24 devices (delivered with Firmware >= 1.14.1) make sure to activate "Solar API" in the inverters web interface.

{% include integrations/config_flow.md %}

## Monitored data

Each device adds a set of sensors to Home Assistant.

- SolarNet device
  
  - Logger information

    General information about the Fronius Datalogger. Not available on "Gen24" devices. Updated every hour.

    - Serial number, software and hardware platforms
    - Current price of energy consumed and returned to grid and the CO₂ factor as set in the Dataloggers settings

  - Power flow

    Cumulative data of the SolarNet system. Updated every 10 seconds.

    - Energy produced on the current day, year and total produced energy
    - Power fed to the grid (if positive) or consumed from the grid (if negative)
    - Power load as a generator (if positive) or consumer (if negative)
    - Battery charging power (if positive) or discharging power (if negative) and information about backup or standby mode
    - Photovoltaic production
    - Current relative self-consumption of produced energy
    - Current relative autonomy

- Inverter

  Energy produced on the current day, year and total produced energy, power, current, voltage, frequency and status for an individual inverter. Updated every minute.

- Meter

  Detailed information about power, current and voltage, if supported split among the phases. Updated every minute.

- Ohmpilot

  Detailed information about energy, power, and temperature of your Ohmpilots. Updated every minute.

- Storage

  Detailed information about current, voltage, state, cycle count, capacity and more about installed batteries. Updated every minute.

Note that some data (like photovoltaic production) is only provided by the Fronius device when non-zero.
When the integration is added at night, there might be no sensors added providing photovoltaic related data. Entities will be added on sunrise, when the Fronius devices begin to provide more data.

When an endpoint is not responding correctly the update interval will increase to 10 minutes (3 minutes for power flow) until valid data is received again. This reduces the amount of requests to Fronius devices using night mode (shutdown when no PV power is produced).

## Energy dashboard

- For _"Solar production"_:
  - If no battery is connected to an inverter: Add each inverters `Energy total` entity.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over `Power photovoltaics` entity (from your `SolarNet` device).
- _"Battery systems"_ aren't supported directly. Use [Template](/integrations/template) to split and invert negative values of `Power battery` entity (from `SolarNet` device) for charging power (W) and positive values for discharging power (W). Then use [Riemann sum](/integrations/integration/) to integrate each into energy values (kWh).
- For _"Devices"_ use the Ohmpilots `Energy consumed` entity.

The energy meter integrated with Fronius devices can be installed (and configured) in two different installation positions: _"feed in path"_ (`Meter location` = 0) or _"consumption path"_ (`Meter location` = 1).

### Feed in path meter

Recommended energy dashboard configuration for meter location in feed in path:

- For _"Grid consumption"_ use the meters `Energy real consumed` entity.
- For _"Return to grid"_ use the meters `Energy real produced` entity.

### Consumption path meter

Recommended energy dashboard configuration for meter location in consumption path:

- The `Power grid` entity provided by the Fronius API is positive on import and negative on export. Split it up into import- and export-power entities by using helpers with templates `max(states(sensor.solarnet_power_grid) | float, 0)` and `max(0 - states(sensor.solarnet_power_grid) | float, 0)`.
- Then use [Riemann sum](/integrations/integration/) to integrate these import-/export-power entities into energy values (kWh).
- Use these energy entities for `Grid consumption` and `Return to grid` in the energy dashboard configuration.

## Note

Fronius often provides firmware updates for the datamanager interfaces and the devices in their system, it's recommended to check and apply them regularly. This integration relies on functionality present in rather recent firmware.
