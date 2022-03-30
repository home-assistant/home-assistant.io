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

The `fronius` integration polls a [Fronius](https://www.fronius.com/) solar inverter or datalogger to allow you to get details from your Fronius SolarNet setup and integrate it in your Home Assistant installation.

## Prerequisites

You will need to either set a static IP on the Fronius device or assign a static DHCP lease for it, or alternatively access it through the local DNS name if your network is properly configured for this.
For Gen24 devices (delivered with Firmware >= 1.14.1) make sure to activate the "Solar API" in the inverters web interface.

{% include integrations/config_flow.md %}

## Monitored data

Each device adds a set of sensors to Home Assistant.

- SolarNet device
  
  - `logger_info`

    General information about the Fronius Datalogger. Not available on "Gen24" devices. Updated every hour.

    - The serial number and software and hardware platforms
    - The current price of energy consumed from the grid ("cash factor")
    - The current price of energy returned to the grid ("delivery factor")

  - `power_flow`

    Cumulative data such as the energy produced in the current day or year and overall produced energy. Updated every 10 seconds.
    Also, live values such as:

    - Power fed to the grid (if positive) or taken from the grid (if negative).
    - Power load as a generator (if positive) or consumer (if negative).
    - Battery charging power (if positive) or discharging power (if negative) and information about backup or standby mode.
    - Photovoltaic production.
    - Current relative self-consumption of produced energy.
    - Current relative autonomy.

- `inverter`

  Cumulative data such as the energy produced in the current day or year and overall produced energy. Updated every minute.
  Also, live values about AC/DC power, current, voltage and frequency.

- `meter`

  Detailed information about power, current and voltage, if supported split among the phases. Updated every minute.

- `ohmpilot`

  Detailed information about energy, power, and temperature of your Ohmpilots. Updated every minute.

- `storage`

  Detailed information about current, voltage, state, cycle count, capacity and more about installed batteries. Updated every minute.

Note that some data (like photovoltaic production) is only provided by the Fronius device when non-zero.
The corresponding sensors are added to Home Assistant as entities as soon as they are available.
This means for example that when Home Assistant is started at night, there might be no sensor providing photovoltaic related data.
This does not need to be problematic as the values will be added on sunrise, when the Fronius devices begins providing the needed data.
When a device is not responding correctly the update interval will increase to 10 minutes (3 minutes for power flow) until valid data is received again.

## Energy dashboard

Recommended energy dashboard configuration for meter location in feed in path (`Meter location: 0`):

- For `Grid consumption` use the meters `Energy real consumed` entity.
- For `Return to grid` use the meters `Energy real produced` entity.
- For `Solar production`: 
  - If no battery is connected to an inverter: Add each inverters `Energy total` entity.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over `Power photovoltaics` entity (from power_flow endpoint found in your `SolarNet` device)
- `Battery systems` aren't supported directly. Use [Template](/integrations/template) to split and invert negative values of `Power battery` entity (from power_flow) for charging power (W) and positive values for discharging power (W). Then use [Riemann sum](/integrations/integration/) to integrate each into energy values (kWh).
- For `Devices` use the Ohmpilots `Energy consumed` entity.

## Note

Fronius often provides firmware updates for the datamanager interfaces and the devices in their system, it's recommended to check and apply them regularly. This integration relies on functionality present in rather recent firmware.
