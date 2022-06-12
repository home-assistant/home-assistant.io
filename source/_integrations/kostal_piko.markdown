---
title: Kostal Piko Solar Inverter
description: Instructions on how to integrate Kostal Piko solar inverter within Home Assistant.
ha_category:
  - Energy
ha_release: 2022.6.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@florian7843'
ha_domain: kostal_piko
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Kostal Piko integration allows you to get data from [Kostal Piko](https://www.kostal-solar-electric.com/) solar inverters and integrate them into your Home Assistant installation.

The integration uses the REST-API interface which is also used by the integrated Web-UI and therefore uses the same password.

{% include integrations/config_flow.md %}

## Sensors

By default all sensors are enabled, but they can be disabled using the built-in deactivation feature of Home Assistant .

<div class='note'>
Currently, most of the values under the "Current Values" section in the Web Interface are available.
</div>

### Process Data Sensors

The following sensors are available in the library:

| Name                    | Unit | Description   |
|-------------------------|------|:-------------------------------------------|
| Operation Status | None | Current status of the Inverter |
| Analog input 1 | V | Voltage that is currently present at analog input 1. |
| Analog input 2 | V | Voltage that is currently present at analog input 2. |
| Analog input 3 | V | Voltage that is currently present at analog input 3. |
| Analog input 4 | V | Voltage that is currently present at analog input 4. |
| Battery Voltage | V | Voltage of the battery. |
| Battery Charge | % | Charge of the battery. |
| Battery Current | A | Current of the battery. |
| Battery Cycles | None | Number of charge cycles the battery has had. |
| Battery Temperature | °C | Temperature of the battery. |
| Grid Output Power | W | How much power is fed into or drawn from the power grid. |
| Grid Frequency | Hz | Frequency of the power grid. |
| Grid Power Factor | None | Returns the current power factor (cos phi). |
| Grid Limitation | % | Current power regulation setting. |
| Grid Phase 1 Voltage | V |  |
| Grid Phase 1 Current | A |  |
| Grid Phase 1 Power | W |  |
| Grid Phase 2 Voltage | V |  |
| Grid Phase 2 Current | A |  |
| Grid Phase 2 Power | W |  |
| Grid Phase 3 Voltage | V |  |
| Grid Phase 3 Current | A |  |
| Grid Phase 3 Power | W |  |
| House Coverage Solar Generator | W | Power consumption that is currently covered by the PV modules. |
| House Coverage Battery | W | Power consumption that currently covered by the battery. |
| House Coverage Grid | W | Power consumption that is currently covered by the power grid. |
| House Phase 1 | W | Power consumption on phase 1. |
| House Phase 2 | W | Power consumption on phase 2. |
| House Phase 3 | W | Power consumption on phase 3. |
| PV DC Input 1 Voltage | V | Input voltage on generator 1. |
| PV DC Input 1 Current | A | Input current on generator 1. |
| PV DC Input 1 Power | W | Input power on generator 1. |
| PV DC Input 2 Voltage | V | Input voltage on generator 2. |
| PV DC Input 2 Current | A | Input current on generator 2. |
| PV DC Input 2 Power | W | Input power on generator 2. |
| PV DC Input 3 Voltage | V | Input voltage on generator 3. |
| PV DC Input 3 Current | A | Input current on generator 3. |
| PV DC Input 3 Power | W | Input power on generator 3. |
| PV Combined Input | W | Total DC Input of all PV Generators. |
| Home Self Consumption | W | Home consumption that is covered by the self generated energy. |
| S0 Input Pulse Count | None | Count of energy pulses received on the S0 input. |
| S0 Input Pulse Count Timeframe | s | Timeframe in which the pulses are measured. |
| Today's Yield | Wh | Energy produced today by the PV generator |
| Today's Home Consumption | Wh | Energy consumed today by the home. |
| Today's Self Consumption | Wh | Energy consumed today by the home, that was provided by the PV generator & battery.Wh |
| Today's Self Consumption Rate | % | Rate of self consumption today. |
| Today's Degree of Self Sufficiency | % | Degree of self sufficiency today. |
| Total Yield | kWh | Total energy produced by the PV generator |
| Operation Time | h | Running time of the inverter. |
| Total Home Consumption | kWh | Total energy consumed by the home. |
| Total Self Consumption | kWh | Total energy consumed by the home, that was provided by the PV generator & battery. |
| Total Self Consumption Rate | % | All-time rate of self consumption. |
| Total Degree of Self Sufficiency | % | All-time degree of self sufficiency. |
