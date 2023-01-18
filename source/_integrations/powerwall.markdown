---
title: Tesla Powerwall
description: Instructions on how to integrate Tesla Power Walls into Home Assistant.
ha_category:
  - Binary Sensor
  - Energy
  - Sensor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@jrester'
ha_domain: powerwall
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The `powerwall` integration allows you to integrate your [Tesla Powerwall](https://www.tesla.com/powerwall) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

{% include integrations/config_flow.md %}

### Binary Sensor

The following binary sensors are added for each Powerwall:

- Grid Services - On/ Off
- Grid Status - On/ Off
- Powerwall Charging - Charging/ Not Charging
- Powerwall Connected to Tesla - Connected / Not Connected
- Powerwall Status - On/ Off

### Sensor

The following sensors are added for each Powerwall:

- Powerwall Backup Reserve - Reserve energy for grid outages in %
- Powerwall Battery Now - Usage in kW
- Powerwall Charge - Percent charge remaining in %
- Powerwall Generator Now - Usage in kW (if applicable)
- Powerwall Load Now - Load usage in kW
- Powerwall Solar Now - Solar usage in kW (if applicable)
- Powerwall Site Now - Site usage in kW
- Powerwall Backup Reserve - Percentage of battery which will be reserved for a grid outage
- Frequency/ Average Current/ Average Voltage Now

The following sensors show the direction of energy:

- Powerwall Solar Export - Solar energy exported in kWh
- Powerwall Solar Import - Solar energy imported in kWh
- Powerwall Site Export - Site energy exported in kWh
- Powerwall Site Import - Site energy imported in kWh
- Powerwall Battery Export - Battery energy exported in kWh
- Powerwall Battery Import - Battery energy imported in kWh
- Powerwall Load Export - Load energy exported in kWh
- Powerwall Load Import - Load energy imported in kWh
- Powerwall Generator Export - Generator energy exported in kWh
- Powerwall Generator Import - Generator energy imported in kWh

### Device Info

- Model Number
- Firmware Revision
