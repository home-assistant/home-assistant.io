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
---

The `powerwall` integration allows you to integrate your [Tesla Powerwall](https://www.tesla.com/powerwall) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

{% include integrations/config_flow.md %}

### Binary Sensor

The following binary sensors are added for each Powerwall:

- Grid Service Active
- Grid Status
- Powerwall Charging
- Powerwall Connected to Tesla
- Powerwall Status


### Sensor

The following sensors are added for each Powerwall:

| Name                    | Unit | Description                         |
|-------------------------|------|:------------------------------------|
| Powerwall Battery Now   | kW   | Battery usage                       |
| Powerwall Charge        | %    | Powerwall percent charge remaining  |
| Powerwall Generator Now | kW   | Generator usage (if applicable)     |
| Powerwall Load Now      | kW   | Load usage                          |
| Powerwall Solar Now     | kW   | Solar usage (if applicable)         |
| Powerwall Site Now      | kW   | Site usage                          |


The following sensors show the direction of energy:

| Name                       | Unit | Description                         |
|----------------------------|------|:------------------------------------|
| Powerwall Solar Export     | kWh  | Amount of solar energy exported     |
| Powerwall Solar Import     | kWh  | Amount of solar energy imported     |
| Powerwall Site Export      | kWh  | Amount of site energy exported      |
| Powerwall Site Import      | kWh  | Amount of site energy imported      |
| Powerwall Battery Export   | kWh  | Amount of battery energy exported   |
| Powerwall Battery Import   | kWh  | Amount of battery energy imported   |
| Powerwall Load Export      | kWh  | Amount of load energy exported      |
| Powerwall Load Import      | kWh  | Amount of load energy imported      |
| Powerwall Generator Export | kWh  | Amount of generator energy exported |
| Powerwall Generator Import | kWh  | Amount of generator energy imported |
