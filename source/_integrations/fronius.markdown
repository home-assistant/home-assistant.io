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

Home Assistant's Energy Dashboard expects some sources of data to be configured for it to work properly. They mainly are the energy you get from the grid, the energy you send to the grid, the energy produced by your solar panels and others relative to batteries and devices you can see below.

The meter integrated with de Fronius can be installed (and configured) in two different positions: _"feed in path"_ (`meter_location` = 0) or _"in consumption path"_ (`meter_location` = 1). In the first case, the meter provides all data you need but, in the second case, it doesn't so you need to calculate some of them by using helpers.

How to know which is your case? Just go to your entities list and search `meter_location` to see the value it has.

Below you can find instructions for configuring both cases.

### Feed in path

Recommended energy dashboard configuration for meter location in feed in path (`Meter location: 0`):

- For `Grid consumption` use the meters `Energy real consumed` entity.
- For `Return to grid` use the meters `Energy real produced` entity.
- For `Solar production`: 
  - If no battery is connected to an inverter: Add each inverters `Energy total` entity.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over `Power photovoltaics` entity (from power_flow endpoint found in your `SolarNet` device)
- `Battery systems` aren't supported directly. Use [Template](/integrations/template) to split and invert negative values of `Power battery` entity (from power_flow) for charging power (W) and positive values for discharging power (W). Then use [Riemann sum](/integrations/integration/) to integrate each into energy values (kWh).
- For `Devices` use the Ohmpilots `Energy consumed` entity.

### Consumption path

Recommended energy dashboard configuration for meter location in consumption path (`Meter location: 1`):

This configuration has been possible thanks to [@GianlucaCollot work](https://github.com/GianlucaCollot), honors and credit go to him as I have just reproduced his work and documented it here :)

First you need to create the power entities in your `configuration.yaml`. Make sure to replace the name of the sensor, you may only need to update the IP on the end if it was auto-detected:

```yaml
template:
  - sensor:
    # Positive values are from grid
    - name: "power_bought"
      unit_of_measurement: W
      state: >-
        {{ max(states('sensor.power_grid_fronius_power_flow_0_XXX_XXX_XXX_XXX') | float, 0) }}
      device_class: power

    # Negative values are to grid
    - name: "power_sold"
      unit_of_measurement: W
      state: >-
        {{ max((0 - states('sensor.power_grid_fronius_power_flow_0_XXX_XXX_XXX_XXX') | float), 0) }}
      device_class: power
```

then, you need to create the energy entities that get data from the power ones (also in your `configuration.yaml` file):

```yaml
sensor:
  - platform: integration
    source: sensor.power_sold
    name: energy_sold
    round: 2
    
  - platform: integration
    source: sensor.power_bought
    name: energy_bought
    round: 2
```

Now, you only need to configure Energy dashboard's params using the UI (first to values use the newly created entities, other ones are just the same as in the _"feed in path"_ config):

- For **Grid consumption** use the meters `energy_bough` entity.
- For **Return to grid** use the meters `energy_sold` entity.using `energy_bough`.
- For **Solar production**: 
  - If no battery is connected to an inverter: Add each inverters **Energy total** entity.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over **Power photovoltaics** entity (from power_flow endpoint found in your **SolarNet** device)
- **Battery systems** aren't supported directly. Use [Template](/integrations/template) to split and invert negative values of **Power battery** entity (from power_flow) for charging power (W) and positive values for discharging power (W). Then use [Riemann sum](/integrations/integration/) to integrate each into energy values (kWh).
- For **Devices** use the Ohmpilots **Energy consumed** entity.


## Note

Fronius often provides firmware updates for the datamanager interfaces and the devices in their system, it's recommended to check and apply them regularly. This integration relies on functionality present in rather recent firmware.
