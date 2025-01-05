---
title: Fronius
description: Instructions on how to connect your Fronius SolarAPI devices to Home Assistant.
ha_release: 0.96
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@farmio'
ha_config_flow: true
ha_domain: fronius
ha_iot_class: Local Polling
ha_platforms:
  - diagnostics
  - sensor
ha_dhcp: true
ha_integration_type: integration
ha_quality_scale: gold
---

The Fronius integration polls a [Fronius](https://www.fronius.com/) solar inverter or datalogger for details of a Fronius SolarNet setup and integrate it in your Home Assistant installation.

## Supported devices

The integration supports all inverters with integrated Datamanager or external "Datalogger Web" providing the Fronius SolarAPI (JSON) interface of version `v0` or `v1`. This includes among others:

- Agilo
- Eco
- Galvo
- Gen24
- IG Plus
- Primo
- Symo
- Symo Hybrid
- Tauro

Devices connected to those inverters or dataloggers are supported as well.

- Energy meter (Fronius Smart Meter or S0 meter connected to the inverter)
- Ohmpilot
- Storage

## Prerequisites

You should either set a static IP or assign a static DHCP lease for the Fronius device, or alternatively access it through the local DNS name if your network is configured accordingly.

{% note %}
For Gen24 devices (delivered with Firmware >= 1.14.1) make sure to activate "Solar API" in the inverters web interface. For older devices, Solar API should be enabled by default.
{% endnote %}

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The host name or the IP address of the device."
    required: true
    type: string
{% endconfiguration_basic %}

## Monitored data

Each device adds a set of sensors to Home Assistant.

- SolarNet device
  
  - Logger information

    General information about the Fronius Datalogger. Not available on "Gen24" devices.
    Updated every hour.

    - Serial number, software and hardware platforms
    - Current price of energy consumed and returned to grid and the CO₂ factor as set in the Dataloggers settings

  - Power flow

    Cumulative data of the SolarNet system.
    Updated every 10 seconds.

    - Energy produced on the current day, year and total produced energy
    - Power fed to the grid (if positive) or consumed from the grid (if negative)
    - Power load as a generator (if positive) or consumer (if negative)
    - Battery charging power (if positive) or discharging power (if negative) and information about backup or standby mode
    - Photovoltaic production
    - Current relative self-consumption of produced energy
    - Current relative autonomy

- Inverter

  The energy produced on the current day, year (not for Gen24 devices), and total produced energy, power, current, voltage, frequency, and status for an individual inverter.
  Updated every minute.

- Meter

  Detailed information about power, current, and voltage, if supported, split among the phases.
  Updated every minute.

- Ohmpilot

  Detailed information about energy, power, and temperature of your Ohmpilots.
  Updated every minute.

- Storage

  Detailed information about current, voltage, state, cycle count, capacity and more about installed batteries.
  Updated every minute.

When an endpoint is not responding correctly the update interval will increase to 10 minutes (3 minutes for power flow) until valid data is received again. This reduces the number of requests to Fronius devices using night mode (shutdown when no PV power is produced).

## Energy dashboard

Recommended [energy dashboard](/docs/energy/) configuration:

- For _"Solar production"_:
  - If no battery is connected to an inverter: Add each inverters `Energy total` entity.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over `SolarNet Power photovoltaics` entity.
- _"Battery systems"_ energy values aren't supported directly by the Solar API. Use [Riemann sum](/integrations/integration/) to integrate `SolarNet Power battery charge` and `SolarNet Power battery discharge` into energy values (kWh).
- For _"Devices"_ use the Ohmpilots `Energy consumed` entity.

The energy meter integrated with Fronius devices can be installed (and configured) in two different installation positions: _"feed in path"_ (grid interconnection point) or _"consumption path"_.

### Feed in path meter

Recommended energy dashboard configuration for meter location in feed in path:

- For _"Grid consumption"_ use the meters `Energy real consumed` entity.
- For _"Return to grid"_ use the meters `Energy real produced` entity.

### Consumption path meter

Recommended energy dashboard configuration for meter location in consumption path:

1. Use [Riemann sum](/integrations/integration/) to integrate `SolarNet Power grid import` and `SolarNet Power grid export` entities into energy values (Wh or kWh).
2. Use these energy entities for `Grid consumption` and `Return to grid` in the energy dashboard configuration.

## Example automation

The following {% term automation %} toggles a switch when the solar production crosses certain thresholds:

```yaml
description: "Turn on switch when PV power is above 1000 W and turn it off below 50 W."
mode: single
triggers:
  - trigger: state
    entity_id:
      - sensor.solarnet_power_photovoltaics
conditions: []
actions:
  - choose:
      - conditions:
          - condition: numeric_state
            entity_id: sensor.solarnet_power_photovoltaics
            above: 1000
        sequence:
          - action: switch.turn_on
            metadata: {}
            data: {}
            target:
              entity_id: switch.swtest
      - conditions:
          - condition: numeric_state
            entity_id: sensor.solarnet_power_photovoltaics
            below: 50
        sequence:
          - action: switch.turn_off
            metadata: {}
            data: {}
            target:
              entity_id: switch.swtest

```

## Note

Fronius often provides firmware updates for the datamanager interfaces and the devices in their system, it's recommended to check and apply them regularly. This integration relies on functionality present in rather recent firmware.

## Known limitations

The Solar API used by this integration is read-only. It does not provide any means to control the Fronius devices. Most Fronius devices however do support Modbus TCP directly, so the [Modbus integration](/integrations/modbus/) could be leveraged to control the devices from Home Assistant. Details about Modbus Registers can be found in the devices documentation or at the [Fronius website](https://www.fronius.com/).

## Troubleshooting

### Can’t setup the device

- Make sure the device is not in a power-saving mode when currently not producing energy.
- Make sure the device is connected to the network and is reachable from the Home Assistant instance.
- Check the device's settings to ensure that the **Solar API** is enabled.

### Some devices are missing after setup or restart of Home Assistant

- Make sure inverters are not in a power-saving mode when currently not producing energy - or wait until they start producing energy.

### Some entities are missing after setup

Some data, like photovoltaic production, is only provided by the Fronius device when non-zero.
When the integration is added at night, there might be no entities added providing photovoltaic related data. Entities will be added on sunrise, when the Fronius devices begin to provide more data.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
