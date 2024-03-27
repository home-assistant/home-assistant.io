---
title: SMA Manager
description: Instructions on how to connect your SMA Manager to Home Assistant.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: ''
ha_codeowners:
  - 'DEADSEC-SECURITY'
ha_domain: sma_manager
ha_platforms:
  - sensor
ha_integration_type: integration
---

The SMA Manager integration will poll a [SMA](http://www.sma-solar.com/) [(US)](https://www.sma-america.com/) home manager, energy meter and present the values as sensors in Home Assistant.

The integration uses the multicast protocol of the device. Before you start, make sure the device and you HA are in the same VLAN and that multicast is not disabled in your router.

{% include integrations/config_flow.md %}

## Sensors

The SMA Manager uses the muticast protocol of the SMA Home Manager device to get advertised status data of the meter. Currently available sensors can be found below.

### SMA Manager

| name | Unit | Description |
| --- | --- | --- |
| grid_consumption | W | Current power being imported |
| grid_feed | W | Current power being exported |
| phase_1_grid_consumption | W | Current power being imported on phase 1 |
| phase_1_grid_feed | W | Current power being exported on phase 1 |
| phase_2_grid_consumption | W | Current power being imported on phase 2 |
| phase_2_grid_feed | W | Current power being exported on phase 2 |
| phase_3_grid_consumption | W | Current power being imported on phase 3 |
| phase_3_grid_feed | W | Current power being exported on phase 3 |

#### Riemann Sum Integral Energy

| name | Unit | Description |
| --- | --- | --- |
| grid_consumption_energy | kWh | Energy imported |
| grid_feed_energy | kWh | Energy imported |
| phase_1_grid_consumption_energy | kWh | Energy imported on phase 1 |
| phase_1_grid_feed_energy | kWh | Energy exported on phase 1 |
| phase_2_grid_consumption_energy | kWh | Energy imported on phase 2 |
| phase_2_grid_feed_energy | kWh | Energy exported on phase 2 |
| phase_3_grid_consumption_energy | kWh | Energy imported on phase 3 |
| phase_3_grid_feed_energy | kWh | Energy exported on phase 3 |
