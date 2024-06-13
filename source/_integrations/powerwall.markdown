---
title: Tesla Powerwall
description: Instructions on how to integrate Tesla Power Walls into Home Assistant.
ha_category:
  - Binary sensor
  - Energy
  - Sensor
  - Switch
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@jrester'
  - '@daniel-simpson'
ha_domain: powerwall
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
---

The `powerwall` integration allows you to integrate your [Tesla Powerwall](https://www.tesla.com/powerwall) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

{% include integrations/config_flow.md %}

### Binary sensor

The following binary sensors are added for each Backup Gateway:

- Grid Services - On/ Off
- Grid Status - On/ Off
- Powerwall Charging - Charging/ Not Charging
- Powerwall Connected to Tesla - Connected / Not Connected
- Powerwall Status - On/ Off

### Sensor

The following sensors are added for each Backup Gateway aggregated across all Powerwalls:

- Powerwall Backup Reserve - Reserve energy for grid outages in %
- Powerwall Battery Now - Power in kW (negative for charging)
- Powerwall Charge - Percent charge remaining in %
- Powerwall Generator Now - Power in kW (if applicable)
- Powerwall Load Now - Power in kW
- Powerwall Solar Now - Power in kW (if applicable)
- Powerwall Site Now - Power in kW (negative for grid export)
- Powerwall Backup Reserve - Percentage of battery which will be reserved for a grid outage
- Frequency/ Average Current/ Average Voltage Now - in Hertz, Amps and Volts

The following sensors measure lifetime energy flow:

- Powerwall Solar Export - Solar energy exported in kWh
- Powerwall Solar Import - Solar energy imported in kWh (generally near zero)
- Powerwall Site Export - Site energy exported in kWh
- Powerwall Site Import - Site energy imported in kWh
- Powerwall Battery Export - Battery energy exported in kWh
- Powerwall Battery Import - Battery energy imported in kWh
- Powerwall Load Export - Load energy exported in kWh (generally zero)
- Powerwall Load Import - Load energy imported in kWh
- Powerwall Generator Export - Generator energy exported in kWh 
- Powerwall Generator Import - Generator energy imported in kWh

A Powerwall battery device for each battery, connected to the Powerwall Gateway, with the following sensors:
- Powerwall Battery Capacity - Energy in kWh
- Powerwall Battery Remaining - Remaining energy in kWh
- Frequency/ Average Current/ Average Voltage Now in Hertz, Amps and Volts
- Powerwall Battery Power - Battery power in kW (negative for charging)
- Powerwall Battery Export - Battery energy exported in kWh
- Powerwall Battery Import - Battery energy imported in kWh
- Powerwall Grid State - Battery grid compliance


### Switch

The following switch is added for the Powerwall Backup Gateway:

- Off-Grid operation - Take your Powerwall off-grid (simulate a grid outage)

### Device info

- Model Number
- Firmware Revision
