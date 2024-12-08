---
title: APsystems
description: Control and monitor your APsystems EZ1 microinverters locally without the cloud
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2024.6
ha_category:
  - Energy
ha_domain: apsystems
ha_platforms:
  - binary_sensor
  - number
  - sensor
  - switch
ha_integration_type: device
ha_codeowners:
  - '@mawoka-myblock'
  - '@SonnenladenGmbH'
---

The **APsystems** {% term integration %} allows you to read the data from your [APsystems EZ1](https://emea.apsystems.com/diy/ez1/) microinverter. It also allows you to set the output limit to anything above 30 watts.

## Sensors

### Numerical sensors

| Sensor ID | Unit | Description
|---|---| ---|
| total_power | W | Total current output of the inverter
| lifetime_production_p1 | kWh | Lifetime production of first input
| lifetime_production_p2 | kWh | Lifetime production of second input
| lifetime_production | kWh | Lifetime production of both inputs combined
| total_power_p1 | W | Current input on first input
| total_power_p2 | W | Current input on second input
| today_production | kWh | Today's production of both inputs combined
| today_production_p1 | kWh | Today's production of first input
| today_production_p2 | kWh | Today's production of second input

### Binary sensors

| Sensor ID  | Description
|---|---|
| off_grid_status | On when the inverter is not connected to the power grid
| dc_1_short_circuit_error_status | Short circuit detected on first input
| dc_2_short_circuit_error_status | Short circuit detected on second input
| output_fault_status | Output because of any error deactivated

## Settings

| Setting ID | Type | Description
|---|---|---|
| inverter_status | switch | Enables or disables the inverter's output
| output_limit | number | Sets the max output of the inverter




## Prerequisites

Make sure the local API is activated and set to **Continuously**. For that, connect to the inverter via Bluetooth using the app and go to **Settings** > **Local Mode**, set the switch **Enable Local Mode** to on and make sure to set this to **Continuously**.

{% include integrations/config_flow.md %}
